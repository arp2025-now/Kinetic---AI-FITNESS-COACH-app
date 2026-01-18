# Kinetic - AI Fitness Coach

A gamified AI fitness coach web application built with Next.js 14.

## Features

- 💬 **Chat Interface** - Talk to your AI fitness coach
- 🎮 **Gamification** - Level up, earn XP, unlock badges
- 🏆 **Achievements** - Track your progress with badges
- 📱 **Responsive** - Works on desktop and mobile
- 🌙 **Dark Theme** - Sleek dark UI with gold accents

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS 4
- Radix UI
- Framer Motion
- Vaul (bottom sheet)
- canvas-confetti

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` with your n8n webhook URL:
   ```
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/fitness-coach
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Gamification System

- **XP System**: Earn XP with each message (10 XP = 1 level)
- **Coach Titles**: Progress from "Stranger" to "Fitness Sage"
- **Badges**: Unlock achievements for milestones and special actions
- **Streaks**: Track daily conversation streaks

## License

MIT
