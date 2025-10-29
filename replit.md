# WanderWise – AI Travel Companion

## Overview
WanderWise is a beautiful, AI-powered travel recommendation app that helps users discover their perfect getaway destinations. Built with React, Express, and OpenAI's GPT-4o-mini, it generates personalized travel suggestions based on budget, duration, travel month, and mood.

**Status**: Fully functional MVP ✅

## Features

### Core Functionality
- ✅ **AI-Powered Recommendations**: Uses OpenAI GPT-4o-mini to generate 3 personalized travel destinations
- ✅ **Smart Fallback System**: Provides curated recommendations when OpenAI API is unavailable
- ✅ **Dynamic Form**: Collects user preferences (budget, duration, month, mood)
- ✅ **Beautiful Design**: Vibrant travel-inspired color palette with smooth animations

### Interactive Elements
- ✅ **Mood Theme Switcher**: 4 themes (Adventure, Relax, Romantic, Luxury) with dynamic backgrounds
- ✅ **Quick Filter Chips**: One-click access to popular travel categories
- ✅ **Surprise Me Button**: Random destination generator
- ✅ **Travel Inspiration Carousel**: Showcases exotic destinations
- ✅ **Share Functionality**: Native share or copy-to-clipboard for each destination
- ✅ **Generate Again**: Refresh recommendations with same preferences

### Visual Features
- ✅ **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ✅ **Smooth Animations**: Fade-in effects, hover transitions, loading states
- ✅ **Glassmorphism Effects**: Modern backdrop blur on form elements
- ✅ **Gradient Backgrounds**: Theme-aware backgrounds that change with mood
- ✅ **High-Quality Images**: Unsplash integration for destination photography

## Tech Stack

### Frontend
- React with TypeScript
- Wouter (routing)
- TanStack Query (data fetching)
- Tailwind CSS + shadcn/ui components
- Poppins & Quicksand fonts

### Backend
- Express.js
- OpenAI API (GPT-4o-mini)
- TypeScript
- Zod validation

### Design System
**Color Palette**:
- Sky Blue: `#5AC8FA` (Primary)
- Ocean Green: `#2EC4B6` (Secondary)
- Coral Orange: `#FF6B6B` (Accent)
- Soft Sand Beige: `#FFE8D6` (Muted)

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.tsx                    # Hero section with CTA
│   │   │   ├── TravelForm.tsx              # Main preference form
│   │   │   ├── DestinationCard.tsx         # Individual destination display
│   │   │   ├── LoadingSpinner.tsx          # Animated loading state
│   │   │   ├── MoodSwitcher.tsx            # Theme switcher dropdown
│   │   │   ├── QuickFilters.tsx            # Filter chip buttons
│   │   │   ├── InspirationCarousel.tsx     # Inspiration slider
│   │   │   └── Navbar.tsx                  # App navigation
│   │   ├── pages/
│   │   │   └── Home.tsx                    # Main app page
│   │   └── lib/
│   │       └── queryClient.ts              # TanStack Query setup
├── server/
│   ├── routes.ts                           # API routes (recommendations)
│   └── index.ts                            # Express server
├── shared/
│   └── schema.ts                           # Shared types & validation
└── design_guidelines.md                    # Design system documentation
```

## API Routes

### POST /api/recommendations
Generates 3 personalized travel destinations based on user preferences.

**Request**:
```json
{
  "budget": 2500,
  "duration": 10,
  "month": "June",
  "mood": "Adventurous"
}
```

**Response**:
```json
{
  "destinations": [
    {
      "name": "Banff",
      "country": "Canada",
      "subtitle": "Perfect for adventure seekers",
      "summary": "Discover pristine mountain landscapes...",
      "activities": ["Hike to Lake Louise", "..."],
      "estimatedCost": 2200,
      "bestTime": "Jun - Sep",
      "imageUrl": "https://..."
    }
  ]
}
```

**Fallback Behavior**: If OpenAI API is unavailable (quota exceeded, network error), the server automatically returns high-quality curated destinations tailored to the user's mood.

## Environment Variables

Required secrets (already configured):
- `OPENAI_API_KEY`: OpenAI API key for GPT-4o-mini
- `SESSION_SECRET`: Express session secret

## Development

**Start the app**:
```bash
npm run dev
```

The app runs on port 5000 with:
- Frontend: Vite dev server with HMR
- Backend: Express API server
- Both served on the same port

## User Flow

1. **Landing** → User sees vibrant hero section with travel imagery
2. **Quick Filters** → Optional: Click filter chips to explore categories
3. **Form Input** → Enter budget, duration, month, and mood
4. **AI Generation** → Click "Get Recommendations" (10-30 second processing)
5. **Results** → View 3 personalized destination cards with details
6. **Interact** → Share destinations, generate again, or try "Surprise Me"
7. **Theme** → Switch mood themes to change app atmosphere

## Key Implementation Details

### Fallback System
When OpenAI API fails, the app uses intelligent fallback logic:
- **Relaxing** mood → Bali, Santorini, Kyoto
- **Adventurous** mood → Banff, Kyoto, Bali
- **Cultural** mood → Kyoto, Paris, Santorini
- **Romantic** mood → Paris, Santorini, Bali

Estimated costs are dynamically adjusted based on user's budget.

### Animation System
- Destination cards: Staggered fade-in (0.2s delay between cards)
- Hero background: Subtle 20s zoom animation
- Loading spinner: Bouncing plane with pulsing rings
- Hover effects: Scale transform (1.05x) with shadow increase

### Mood Themes
Each theme changes the entire page background:
- **Adventure**: Orange → Red → Yellow gradient
- **Relax**: Cyan → Blue → Teal gradient
- **Romantic**: Pink → Purple → Rose gradient
- **Luxury**: Yellow → Amber → Orange gradient

## Future Enhancements

Potential additions (not in MVP):
- User accounts with saved trips
- Itinerary planning and day-by-day breakdown
- Flight and hotel price integration
- Social sharing with custom cards
- Trip comparison feature
- PDF export of recommendations
- Multi-language support
- Accessibility improvements (ARIA labels, keyboard navigation)

## Testing

The app has been tested end-to-end with Playwright covering:
- Form submission and validation
- AI recommendation generation (with and without OpenAI)
- Loading states and error handling
- Mood theme switching
- Quick filter functionality
- Surprise Me random generation
- Generate Again feature
- Card hover effects and animations
- Share functionality
- Responsive behavior

All tests pass successfully ✅

## Built For
Media.net PM Challenge - October 2025

## Notes
- No database required (stateless design)
- All recommendations generated in real-time
- Images sourced from Unsplash API
- Fully responsive design (mobile-first approach)
- No user authentication needed for MVP
