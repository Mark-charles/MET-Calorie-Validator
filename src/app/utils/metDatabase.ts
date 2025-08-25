// MET (Metabolic Equivalent of Task) values based on the Compendium of Physical Activities
// Source: Ainsworth et al. (2011) - 2011 Compendium of Physical Activities

export interface ActivityMET {
  activity: string;
  met: number;
  category: string;
}

export const metDatabase: ActivityMET[] = [
  // Running
  { activity: "running", met: 8.0, category: "running" },
  { activity: "jogging", met: 7.0, category: "running" },
  { activity: "sprinting", met: 12.0, category: "running" },
  
  // Walking
  { activity: "walking", met: 3.5, category: "walking" },
  { activity: "brisk walking", met: 4.0, category: "walking" },
  { activity: "hiking", met: 6.0, category: "walking" },
  
  // Cycling
  { activity: "cycling", met: 6.8, category: "cycling" },
  { activity: "biking", met: 6.8, category: "cycling" },
  { activity: "mountain biking", met: 8.5, category: "cycling" },
  
  // Swimming
  { activity: "swimming", met: 8.0, category: "swimming" },
  { activity: "freestyle swimming", met: 8.3, category: "swimming" },
  { activity: "water aerobics", met: 4.0, category: "swimming" },
  
  // Strength Training
  { activity: "weightlifting", met: 6.0, category: "strength" },
  { activity: "strength training", met: 6.0, category: "strength" },
  { activity: "bodyweight exercises", met: 5.0, category: "strength" },
  { activity: "push-ups", met: 3.8, category: "strength" },
  { activity: "pull-ups", met: 8.0, category: "strength" },
  { activity: "squats", met: 5.0, category: "strength" },
  
  // Cardio Equipment
  { activity: "treadmill", met: 7.0, category: "cardio" },
  { activity: "elliptical", met: 5.0, category: "cardio" },
  { activity: "stationary bike", met: 6.8, category: "cardio" },
  { activity: "rowing machine", met: 7.0, category: "cardio" },
  { activity: "stair climber", met: 9.0, category: "cardio" },
  
  // Sports
  { activity: "basketball", met: 6.5, category: "sports" },
  { activity: "soccer", met: 7.0, category: "sports" },
  { activity: "tennis", met: 7.3, category: "sports" },
  { activity: "golf", met: 4.8, category: "sports" },
  { activity: "volleyball", met: 4.0, category: "sports" },
  
  // Fitness Classes
  { activity: "yoga", met: 2.5, category: "fitness" },
  { activity: "pilates", met: 3.0, category: "fitness" },
  { activity: "zumba", met: 7.3, category: "fitness" },
  { activity: "aerobics", met: 7.3, category: "fitness" },
  { activity: "crossfit", met: 5.6, category: "fitness" },
  
  // Dance
  { activity: "dancing", met: 4.8, category: "dance" },
  { activity: "ballroom dancing", met: 3.0, category: "dance" },
  
  // Other
  { activity: "jumping rope", met: 12.3, category: "cardio" },
  { activity: "rock climbing", met: 8.0, category: "climbing" },
  { activity: "martial arts", met: 10.3, category: "martial arts" },
];

// Function to find MET value for a given activity
export function getMETValue(activityName: string): number | null {
  const normalizedActivity = activityName.toLowerCase().trim();
  
  // Direct match first
  const directMatch = metDatabase.find(activity => 
    activity.activity.toLowerCase() === normalizedActivity
  );
  
  if (directMatch) {
    return directMatch.met;
  }
  
  // Partial match (contains)
  const partialMatch = metDatabase.find(activity => 
    normalizedActivity.includes(activity.activity.toLowerCase()) ||
    activity.activity.toLowerCase().includes(normalizedActivity)
  );
  
  return partialMatch ? partialMatch.met : null;
}

// Calculate calories using MET formula
// Formula: Calories = MET × weight (kg) × duration (hours)
export function calculateMETCalories(
  activityName: string, 
  weightValue: number, 
  weightUnit: 'lb' | 'kg', 
  durationMinutes: number
): { calories: number | null; met: number | null; formula: string } {
  const met = getMETValue(activityName);
  
  if (!met) {
    return { 
      calories: null, 
      met: null, 
      formula: "Activity not found in MET database" 
    };
  }
  
  // Convert weight to kg if needed
  const weightKg = weightUnit === 'lb' ? weightValue * 0.453592 : weightValue;
  
  // Convert duration to hours
  const durationHours = durationMinutes / 60;
  
  // Calculate calories: MET × weight(kg) × duration(hours)
  const calories = Math.round(met * weightKg * durationHours);
  
  const formula = `${met} MET × ${weightKg.toFixed(1)}kg × ${durationHours.toFixed(2)}h = ${calories} calories`;
  
  return { calories, met, formula };
}