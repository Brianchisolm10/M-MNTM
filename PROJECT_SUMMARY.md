# Momentum Project Summary

## Overview

Momentum is a dual-purpose movement tracking application designed to help people build lasting physical independence while contributing to research on habit formation across diverse populations.

---

## Project Structure

```
.
├── momentum-app-backup/          # Complete backup of the React app
│   ├── src/
│   │   ├── App.jsx              # Main app component (~2500 lines)
│   │   ├── index.js             # Entry point
│   │   └── lib/
│   │       ├── storage.js       # Persistent storage layer
│   │       ├── date.js          # Date utilities
│   │       └── stats.js         # Analytics engine
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── package.json             # Dependencies
│   └── package-lock.json
│
├── momentum-website/             # Marketing website
│   ├── index.html               # Main website
│   ├── styles.css               # Complete styling
│   ├── script.js                # Interactions
│   └── README.md                # Website documentation
│
└── PROJECT_SUMMARY.md           # This file
```

---

## The Momentum App

### Technology Stack
- **Framework**: React 18.2.0
- **Styling**: CSS-in-JS with design tokens
- **Storage**: localStorage with async abstraction layer
- **State Management**: React hooks (useState, useCallback, useEffect)

### Key Features

#### 1. Onboarding Flow (8 screens)
- Philosophy screen with theme toggle
- Founding intention capture
- Sign-in options
- Schedule configuration (wake/sleep times)
- Training aim (1-7 days per week)
- Movement type selection
- Communication tone preference
- Notification preferences

#### 2. Daily Check-ins
- **Morning**: Did you train? (yes/already/no)
- **Evening**: How did your body show up? (good/worked/pushed/rest)
- **Night**: Recovery state (recovered/tired/fatigued/wired)
- **Optional follow-ups**: Sleep quality, workout type/duration/feeling, energy, pain, mood, stress

#### 3. Core Screens
- **Today's Log**: Daily check-in interface with progress ring
- **Reflect**: Weekly reflection with week navigation
- **Insights**: Behavioral analytics with time window selector
- **Independence**: 10-year goal tracking with account visualization
- **Your Pattern**: Behavioral phenotype detection

#### 4. Settings
- Appearance (light/dark theme)
- Daily schedule
- Training aim
- Training types
- Language and tone
- Reminders
- Research contribution
- Data export
- Account deletion

#### 5. Advanced Features
- **Hero expand animations**: Tiles expand smoothly to full screen
- **Intention milestones**: Modals at 7, 30, 100, 365 days
- **Privacy modals**: Detailed data transparency explanations
- **Loading screen**: While state hydrates from storage
- **Toast notifications**: Feedback for user actions

### Analytics Engine (Stats.js)

Computes real-time metrics from check-in data:

**Core Metrics**
- `adherence()` - % of days with check-ins
- `trainedDays()` - Sessions in last N days
- `totalSessions()` - All-time training count
- `weekDots()` - Mon-Sun training pattern
- `recoveryPredictiveness()` - Night state → next-day training correlation
- `motivationType()` - Intrinsic/external/habit classification
- `weekNumber()` - Weeks since first check-in
- `independencePct()` - Progress toward 10-year goal

**Research Metrics**
- `avgSleep()` - Average sleep quality (1-5)
- `painRate()` - % of days with pain
- `sleepTrainingCorr()` - Sleep quality → training correlation
- `topWorkoutType()` - Most common movement type
- `avgMood()` - Average mood (1-5)
- `moodSkipCorr()` - Low mood → training skip correlation
- `avgEnergy()` - Average energy (1-5)
- `dataCompleteness()` - Core vs deep data logging

### Storage Layer (Storage.js)

Async abstraction with localStorage fallback:
- `save(state)` - Persist app state
- `load()` - Hydrate from storage
- `clear()` - Delete all data
- `exportData()` - Download as JSON
- `importData()` - Upload from JSON

### Design System

**Color Palette**
- Primary: Lavender (#C4A8D4)
- Accent: Gold (#D4B896)
- Background: Deep purple (#0F0D14)
- Surface: #1A1625
- Text: #EDE8F5 (primary), #9B8FB0 (secondary)

**Typography**
- Serif: Cormorant Garamond (headings)
- Sans: DM Sans (body)

**Spacing & Radius**
- Small: 12px
- Medium: 16px
- Large: 24px

---

## The Marketing Website

### Purpose
Explain Momentum's mission, features, and research approach to potential users and research participants.

### Sections

1. **Hero**
   - Compelling mission statement
   - Subtitle about future independence
   - CTA buttons (Launch App, Learn About Research)

2. **What is Momentum**
   - 6 feature cards with icons
   - Three daily check-ins
   - Behavioral fingerprint
   - Independence account
   - Recovery intelligence
   - Intention milestones
   - Community patterns

3. **How It Works**
   - 5-step process visualization
   - Onboarding → Daily → Weekly → Insights → Long-term

4. **The Research Side**
   - Why research matters
   - Data control and privacy
   - What we're learning
   - Transparency commitments
   - 6 research focus areas

5. **Who Is This For**
   - Shift workers
   - Older adults
   - Parents/caregivers
   - Athletes
   - People returning to movement
   - Anyone building habits

6. **Your Data Is Yours**
   - What we collect
   - How we use it
   - Our commitments
   - Privacy note with transparency link

7. **CTA Final**
   - Final call to action

8. **Footer**
   - Links (research, transparency, privacy)
   - Contact information

### Design Features
- Dark theme matching the app
- Responsive grid layouts
- Smooth scroll animations
- Hover effects on cards
- Mobile-first responsive design
- Intersection observer for scroll animations

---

## Data Model

### App State Structure
```javascript
{
  screen: 'philosophy',           // Current onboarding screen
  inApp: false,                   // Whether user completed onboarding
  navScreen: 'today',             // Current app screen
  userProfile: {
    name: '',
    email: '',
    wakeTime: '7:00 AM',
    sleepTime: '10:30 PM',
    schedule: 'standard',
    trainingDays: 3,
    tone: 'warm',
    notifs: true,
    research: false,
    movements: [],
    fitnessLevel: null,
    foundingIntention: '',
    theme: 'dark'
  },
  checkIns: {
    '2026-03-02': {
      morning: 'yes',
      evening: 'worked',
      night: 'recovered',
      sleepQuality: 4,
      workoutType: 'strength',
      workoutDuration: '40to60',
      workoutFeeling: 'right',
      energyLevel: 4,
      painLevel: 'none',
      moodLevel: 4,
      stressLevel: 'normal'
    }
  }
}
```

### Check-in Fields
- **Core**: morning, evening, night
- **Optional**: sleepQuality, workoutType, workoutDuration, workoutFeeling, energyLevel, painLevel, moodLevel, stressLevel

---

## Key Innovations

### 1. Hero Expand Animations
Tiles expand smoothly from their clicked position to full screen using:
- Origin position tracking
- CSS transitions with cubic-bezier easing
- Content fade-in after expansion

### 2. Behavioral Phenotypes
Automatically classifies users based on check-in patterns:
- Recovery-responsive
- Habit-builder
- Accountability-driven
- Intention-led

### 3. Recovery Predictiveness
Computes correlation between night state and next-day training:
- Tracks when users feel "recovered" at night
- Measures if they train the next morning
- Returns percentage accuracy (e.g., 83%)

### 4. Independence Account
Visualizes long-term capacity building:
- 10-year goal: 1,095 sessions (3/week)
- Tracks progress as percentage
- Shows impact on muscle, cardiovascular, mobility

### 5. Intention Milestones
Returns founding intention at key moments:
- 7 days: "You made a promise to yourself"
- 30 days: "Thirty days of showing up"
- 100 days: "You are building something real"
- 365 days: "You said we would return this to you"

---

## Research Framework

### Data Collection
- Daily check-ins (3 per day)
- Optional: sleep, energy, mood, pain, stress, workout details
- User preferences and schedule
- Founding intention

### Research Questions
1. How accurately does night state predict next-day training?
2. How do motivation types evolve over time?
3. What predicts sustained adherence?
4. How does sleep quality correlate with training?
5. What behavioral phenotypes emerge from check-in sequences?
6. How do patterns differ across populations?

### Privacy Commitments
- Individual data never shared with third parties
- No advertising or data brokers
- Research contribution is optional
- Only anonymised, aggregated patterns used
- Users can export or delete data anytime
- Research findings published openly

---

## Deployment

### App Deployment
1. Build: `npm run build`
2. Deploy `build/` folder to hosting
3. Configure environment variables if needed
4. Set up database for production (optional)

### Website Deployment
1. Upload all files to web server
2. Update links in footer
3. Configure email for contact form (if adding)
4. Set up SSL certificate

---

## Future Enhancements

### App
- Push notifications for check-in reminders
- Community features (leaderboards, challenges)
- Integration with wearables (Apple Watch, Fitbit)
- Advanced analytics dashboard
- Coaching recommendations based on patterns
- Multi-language support

### Website
- Blog with research findings
- Case studies from users
- Video testimonials
- Interactive demo
- FAQ section
- Newsletter signup

### Research
- Publish peer-reviewed papers
- Collaborate with universities
- Expand to different populations
- Longitudinal studies (5+ years)
- Intervention studies

---

## File Locations

### App Files
- Main app: `src/App.jsx`
- Storage: `src/lib/storage.js`
- Date utilities: `src/lib/date.js`
- Stats engine: `src/lib/stats.js`
- HTML template: `public/index.html`
- Dependencies: `package.json`

### Website Files
- Main page: `momentum-website/index.html`
- Styles: `momentum-website/styles.css`
- Scripts: `momentum-website/script.js`
- Docs: `momentum-website/README.md`

### Backups
- Complete app backup: `momentum-app-backup/`

---

## Getting Started

### Running the App
```bash
npm install
npm start
# Opens at localhost:3000
```

### Viewing the Website
```bash
# Open momentum-website/index.html in a browser
# Or serve with a local server:
python -m http.server 8000
# Visit http://localhost:8000/momentum-website/
```

---

## Contact & Support

For questions about the project:
- App issues: Check `src/App.jsx` and utility files
- Website updates: Edit `momentum-website/` files
- Research questions: See research framework section

---

**Last Updated**: March 2, 2026
**Version**: 1.0.0
**Status**: Production Ready
