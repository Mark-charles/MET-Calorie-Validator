import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { calculateMETCalories } from '../../utils/metDatabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { workout, duration, weight, weightUnit } = await request.json();

    if (!workout || !duration || !weight || !weightUnit) {
      return NextResponse.json(
        { error: 'Workout, duration, weight, and weight unit are required' },
        { status: 400 }
      );
    }

    // Calculate MET-based calories (scientific baseline)
    const metResult = calculateMETCalories(workout, weight, weightUnit, duration);

    // If no scientific data available, use AI as fallback
    let aiCalories: number | null = null;
    
    if (!metResult.calories) {
      try {
        const prompt = `Calculate the approximate calories burned for a ${duration}-minute ${workout} session for a person weighing ${weight} ${weightUnit}. 
        
        Please provide a realistic estimate based on:
        - Person weighs ${weight} ${weightUnit}
        - Moderate intensity level
        - Common fitness guidelines and MET values
        - Account for body weight in calorie calculations
        
        Respond with ONLY a number representing the estimated calories burned. No explanation, just the number.`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a fitness expert that provides accurate calorie burn estimates. Always respond with only a number."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 50,
          temperature: 0.3,
        });

        const caloriesText = completion.choices[0]?.message?.content?.trim();
        aiCalories = parseInt(caloriesText || '0');

        if (isNaN(aiCalories)) {
          aiCalories = null;
        }
      } catch (error) {
        console.error('OpenAI API error:', error);
        aiCalories = null;
      }
    }

    return NextResponse.json({
      scientificEstimate: metResult.calories,
      metValue: metResult.met,
      formula: metResult.formula,
      aiEstimate: aiCalories, // Only used as fallback when no MET data available
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate calories' },
      { status: 500 }
    );
  }
}