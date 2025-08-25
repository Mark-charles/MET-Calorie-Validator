'use client';

import { useState } from 'react';

export default function Home() {
  const [workout, setWorkout] = useState('');
  const [duration, setDuration] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'lb' | 'kg'>('lb');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/calculate-calories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          workout, 
          duration: parseInt(duration), 
          weight: parseInt(weight), 
          weightUnit 
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error calculating calories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-20">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          🧬 MET Calorie Validator
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Scientific validation for your smartwatch & fitness device calorie estimates
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="workout" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What workout did you do?
            </label>
            <input
              type="text"
              id="workout"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
              placeholder="e.g., Running, Cycling, Swimming, Basketball"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How long did you exercise? (minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={weightUnit === 'lb' ? '150' : '68'}
                min="1"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setWeightUnit('lb')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    weightUnit === 'lb'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  LB
                </button>
                <button
                  type="button"
                  onClick={() => setWeightUnit('kg')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    weightUnit === 'kg'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  KG
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? '🔄 Analyzing...' : '🧮 Validate Calorie Burn'}
          </button>
        </form>

        {results && (
          <div className="mt-8">
            {results.scientificEstimate ? (
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200">
                    📊 Scientific Result
                  </h2>
                  <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">
                    MET {results.metValue}
                  </span>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                    {results.scientificEstimate}
                  </div>
                  <div className="text-blue-600 dark:text-blue-300 text-lg">
                    calories burned
                  </div>
                  <div className="text-sm text-blue-500 dark:text-blue-400 mt-1">
                    {duration}-minute {workout.toLowerCase()} session at {weight} {weightUnit}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🧮 Scientific Calculation (2011 Compendium of Physical Activities)
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                    {results.formula}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="text-sm text-green-700 dark:text-green-300">
                    💡 <strong>Compare with your device:</strong> Check if your smartwatch, Garmin, or fitness tracker shows a similar calorie count for this activity.
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center mb-2">
                  <span className="text-amber-600 dark:text-amber-400 mr-2">⚠️</span>
                  <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                    Activity Not Found
                  </h2>
                </div>
                <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
                  "{workout}" is not in our MET database. Try a more specific activity name like:
                </p>
                <div className="text-xs text-amber-600 dark:text-amber-400">
                  • Running, Jogging, Walking, Swimming<br/>
                  • Cycling, Basketball, Tennis, Yoga<br/>
                  • Weightlifting, Push-ups, Jumping rope
                </div>
                {results.aiEstimate && (
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Estimated:</strong> {results.aiEstimate} calories (AI-powered fallback)
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
