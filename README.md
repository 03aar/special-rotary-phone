# LOOP - Context Intelligence Training Platform

> Where human learning meets machine understanding

LOOP is an interactive web application designed to train and improve context intelligence through engaging missions and progressive learning paths.

## Features

### Core Experience
- **Radial Skill Tree** - Dark-themed progression map with neural grid animations
- **Mission System** - Split-screen interactive training missions
- **Context IQ Tracking** - Real-time score tracking and level progression
- **Analytics Dashboard** - Heatmaps, performance tracking, and insights
- **Comprehensive Settings** - Tabbed interface for profile, preferences, privacy, and data management

### User Journey
1. **Entry Flow** - Launch screen → Awakening → Identity Selection
2. **Onboarding** - Account setup → Baseline challenge → Performance analysis
3. **Core Training** - Dashboard → Mission Active → Results feedback
4. **Progress Tracking** - Progress map, analytics, and settings

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Router 6** - Client-side routing
- **Vite** - Fast build tool and development server
- **CSS3** - Custom design system with animations
- **LocalStorage API** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd special-rotary-phone

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Application will be available at http://localhost:3000
```

The development server includes:
- Hot module replacement (HMR)
- Fast refresh for instant updates
- Error overlay for debugging

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

Build output:
- JavaScript bundle: ~215 KB (65 KB gzipped)
- CSS bundle: ~58 KB (9 KB gzipped)
- Total initial load: < 75 KB gzipped

## Project Structure

```
src/
├── screens/           # All screen components
│   ├── Launch.jsx/css
│   ├── Awakening.jsx/css
│   ├── IdentitySelection.jsx/css
│   ├── AccountSetup.jsx/css
│   ├── BaselineChallenge.jsx/css
│   ├── BaselineAnalysis.jsx/css
│   ├── Dashboard.jsx/css
│   ├── MissionActive.jsx/css
│   ├── MissionResults.jsx/css
│   ├── ProgressMap.jsx/css
│   ├── Analytics.jsx/css
│   └── Settings.jsx/css
├── styles/
│   ├── design-system.css  # Global design tokens
│   └── animations.css     # Reusable animations
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point

public/
├── loop-icon.svg      # Application icon
└── index.html         # HTML template
```

## Key Features Detail

### Progress Map
- **Radial Skill Tree** - 3-ring system (completed/current/locked)
- **Neural Grid Background** - Animated grid with floating particles
- **SVG Connection Lines** - Dynamic skill node relationships
- **Milestone Timeline** - Bottom progress tracker
- **Skill Detail Panel** - Slide-out detailed view

### Settings
- **Profile Tab** - Avatar, user info, stats grid (Context IQ, Level, Joined, Total Loops)
- **Preferences Tab** - Sound effects, animations, daily reminders, starting screen
- **Privacy Tab** - Data collection controls, privacy mode with warning
- **Data & Export Tab** - Export data, reset progress, delete account

### Mission System
- **Split-screen interface** - Human context vs AI interpretation
- **Real-time feedback** - Score calculation and feedback
- **Progressive difficulty** - Adaptive challenge levels
- **Multiple mission types** - Clarity, Emotion, Logic, Creativity, Bias

### Analytics
- **Performance Heatmap** - Weekly activity visualization
- **Context Breakdown** - Clarity, Emotion, Logic, Creativity, Bias scores
- **7-Day Streak** - Engagement tracking
- **Insight Cards** - AI-powered performance insights

## Design System

### Colors
- **Primary Red**: `#C8102E` - Brand color, CTAs, highlights
- **Black**: `#000000` - Text, backgrounds
- **White**: `#FFFFFF` - Backgrounds, text on dark
- **Light Gray**: `#FAFAFA` - Subtle backgrounds
- **Mist Gray**: `#9CA3AF` - Secondary text

### Typography
- **Sizes**: 12px to 48px scale
- **Weights**: Normal (400), Medium (500), Semibold (600), Bold (700)

### Spacing
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px

### Animations
- **Base**: 0.3s ease-in-out
- **Slow**: 0.6s ease-in-out
- Pulsing, fading, sliding, rotating effects

## Data Persistence

LOOP uses browser LocalStorage to persist:
- User profile (name, email)
- Context IQ score
- Completed missions count
- Streak tracking
- Settings preferences
- Mission progress

**Note**: Data is stored locally in the browser and cleared when cache is cleared.

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to:
- GitHub Pages
- Netlify
- Vercel
- Custom static hosting

Quick deploy to GitHub Pages:

```bash
npm run build
# Upload dist/ folder or use GitHub Actions
```

## Development Tips

### Hot Reload
Changes to JSX and CSS files trigger instant updates without page reload.

### State Management
All state is managed using React hooks (useState, useEffect) with LocalStorage persistence.

### Routing
Client-side routing with React Router. All routes are defined in `App.jsx`.

### Styling
Component-specific CSS files with global design tokens from `design-system.css`.

## Performance

### Optimizations
- Code splitting and lazy loading
- CSS/JS minification
- Asset optimization
- Gzip compression
- Tree shaking

### Metrics
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: 90+

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Testing

Manual testing checklist:
- [ ] All routes navigate correctly
- [ ] LocalStorage persists data
- [ ] Forms submit and validate
- [ ] Animations work smoothly
- [ ] Responsive design works on mobile
- [ ] No console errors

## Known Issues

None at this time.

## Roadmap

Future enhancements:
- Backend integration for data sync
- User authentication system
- Multiplayer arena mode
- Advanced analytics
- Mobile app version
- Additional mission types

## License

Proprietary - All Rights Reserved

## Version

**v1.0.0** - Initial MVP release

## Support

For issues or questions, please open an issue in the repository.

---

**Built with React + Vite**

Where human learning meets machine understanding.
