# 🧬 MET Calorie Validator

**Scientific fitness tracker validation tool** - Validate your smartwatch and fitness device calorie estimates with scientifically accurate MET-based calculations.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)

## 🎯 Purpose

Are your smartwatch, Garmin, or fitness tracker calorie counts accurate? This tool provides scientifically-backed calorie calculations using **MET (Metabolic Equivalent of Task) values** from the 2011 Compendium of Physical Activities - the gold standard for exercise science.

**Perfect for validating:**
- Apple Watch calorie estimates
- Garmin device accuracy
- Fitbit calorie counts
- Any fitness tracker or app

## ✨ Features

- 🧬 **Scientific Accuracy**: MET-based calculations from peer-reviewed research
- 📊 **40+ Activities**: Comprehensive database including running, cycling, swimming, strength training, and more
- ⚖️ **Personalized Results**: Weight input with LB/KG toggle for accurate calculations
- 🎨 **Clean Interface**: Professional, scientific presentation
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🤖 **AI Fallback**: OpenAI integration for activities not in MET database
- ⚡ **Fast Performance**: Built with Next.js 15 and TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional, for activities not in MET database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mark-charles/MET-Calorie-Validator.git
   cd MET-Calorie-Validator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup** (Optional)
   ```bash
   cp .env.local.example .env.local
   # Add your OpenAI API key to .env.local
   OPENAI_API_KEY=your-api-key-here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

1. **Enter your activity** (e.g., "Running", "Cycling", "Swimming")
2. **Set duration** in minutes
3. **Input your weight** with LB/KG toggle
4. **Click "Validate Calorie Burn"**
5. **Compare the result** with your fitness device

### Example

- **Activity**: Running
- **Duration**: 30 minutes  
- **Weight**: 150 lbs
- **Result**: 272 calories (MET 8.0 × 68kg × 0.5h)

## 🧮 How It Works

### MET Calculation Formula

```
Calories = MET Value × Weight (kg) × Duration (hours)
```

### MET Values (Examples)

| Activity | MET Value | Intensity |
|----------|-----------|-----------|
| Walking (3 mph) | 3.5 | Light |
| Running (6 mph) | 8.0 | Moderate |
| Cycling (12-14 mph) | 6.8 | Moderate |
| Swimming (moderate) | 8.0 | Vigorous |
| Basketball | 6.5 | Moderate |
| Weightlifting | 6.0 | Moderate |

### Data Source

All MET values are sourced from:
**Ainsworth, B. E., et al. (2011). 2011 Compendium of Physical Activities: a second update of codes and MET values. Medicine & Science in Sports & Exercise, 43(8), 1575-1581.**

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT-3.5-turbo (fallback only)
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── calculate-calories/
│   │       └── route.ts          # API endpoint
│   ├── utils/
│   │   └── metDatabase.ts        # MET values database
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application
├── public/                       # Static assets
└── ...config files
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel
2. **Add environment variable**: `OPENAI_API_KEY` (optional)
3. **Deploy** - Vercel auto-detects Next.js

### Other Platforms

Works with any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🧪 Supported Activities

### Cardio Activities
- Running, Jogging, Sprinting
- Walking, Brisk Walking, Hiking
- Cycling, Mountain Biking
- Swimming, Freestyle Swimming
- Rowing, Elliptical, Treadmill

### Strength Training
- Weightlifting, Strength Training
- Bodyweight Exercises
- Push-ups, Pull-ups, Squats
- CrossFit

### Sports
- Basketball, Soccer, Tennis
- Volleyball, Golf
- Martial Arts

### Fitness Classes
- Yoga, Pilates
- Zumba, Aerobics
- Dancing

*And many more! If your activity isn't found, the app provides an AI-powered estimate.*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Support

If you find this tool helpful, please give it a star on GitHub! It helps others discover scientifically accurate calorie validation.

## 🔬 Scientific Accuracy

This tool prioritizes scientific accuracy over convenience. When MET data is available, it's always used over AI estimates. The 2011 Compendium of Physical Activities remains the most comprehensive and widely-accepted source for metabolic equivalent values in exercise science.

---

**Made for fitness enthusiasts who value accuracy** 🏃‍♂️🔬