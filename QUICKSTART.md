# Momentum Project - Quick Start Guide

## What You Have

### 1. The Momentum App (React)
A fully functional movement tracking application with:
- 8-screen onboarding flow
- Daily check-in system
- 5 main app screens (Today, Reflect, Insights, Independence, Pattern)
- Settings with data export/import
- Advanced analytics engine
- Persistent storage with localStorage

**Location**: `momentum-app-backup/` (backup) and current working directory (running)

**Running the App**:
```bash
npm start
# Opens at http://localhost:3000
```

### 2. The Marketing Website
A beautiful landing page explaining Momentum's mission and research:
- Hero section with compelling copy
- 6 feature cards
- 5-step how-it-works process
- Research explanation
- 6 audience segments
- Privacy and data transparency
- Responsive design

**Location**: `momentum-website/`

**Viewing the Website**:
```bash
# Option 1: Open directly
open momentum-website/index.html

# Option 2: Serve locally
python -m http.server 8000
# Visit http://localhost:8000/momentum-website/
```

---

## Project Structure

```
Momentum/
├── src/                          # React app source
│   ├── App.jsx                  # Main app (~2500 lines)
│   ├── index.js                 # Entry point
│   └── lib/
│       ├── storage.js           # Persistent storage
│       ├── date.js              # Date utilities
│       └── stats.js             # Analytics engine
│
├── public/                       # Static assets
│   └── index.html               # HTML template
│
├── momentum-app-backup/          # Complete app backup
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── momentum-website/             # Marketing website
│   ├── index.html               # Main page
│   ├── styles.css               # Styling
│   ├── script.js                # Interactions
│   └── README.md                # Website docs
│
├── package.json                  # App dependencies
├── PROJECT_SUMMARY.md            # Detailed documentation
└── QUICKSTART.md                 # This file
```

---

## Key Features

### App Features
✅ Onboarding with theme toggle
✅ Daily check-ins (morning/evening/night)
✅ Weekly reflection screen
✅ Behavioral analytics
✅ Independence account tracking
✅ Behavioral phenotype detection
✅ Settings with data export
✅ Hero expand animations
✅ Intention milestone modals
✅ Privacy transparency modals
✅ Light/dark theme support

### Website Features
✅ Responsive design
✅ Smooth scroll animations
✅ Feature cards with hover effects
✅ Research explanation
✅ Audience segmentation
✅ Privacy commitments
✅ Mobile-first layout
✅ Dark theme matching app

---

## Important Files

### App Core
- `src/App.jsx` - Everything (2500+ lines)
- `src/lib/storage.js` - Data persistence
- `src/lib/stats.js` - Analytics engine
- `src/lib/date.js` - Date utilities

### Website
- `momentum-website/index.html` - All content
- `momentum-website/styles.css` - All styling
- `momentum-website/script.js` - Interactions

### Documentation
- `PROJECT_SUMMARY.md` - Complete project overview
- `QUICKSTART.md` - This file
- `momentum-website/README.md` - Website docs

---

## Common Tasks

### Run the App
```bash
npm start
```

### Build for Production
```bash
npm run build
# Creates optimized build in build/ folder
```

### View the Website
```bash
# Open in browser
open momentum-website/index.html

# Or serve locally
python -m http.server 8000
```

### Export App Data
1. Open app settings
2. Click "Export my data"
3. JSON file downloads with all check-ins

### Reset App
1. Click the "↺ reset" button (bottom right, dev mode)
2. Or clear localStorage in browser dev tools

### Customize Colors
Edit `src/App.jsx` tokens section or `momentum-website/styles.css` `:root`

### Update Website Content
Edit `momentum-website/index.html` sections

---

## Data Structure

### Check-in Example
```javascript
{
  '2026-03-02': {
    morning: 'yes',              // yes | already | no
    evening: 'worked',           // good | worked | pushed | rest
    night: 'recovered',          // recovered | tired | fatigued | wired
    sleepQuality: 4,             // 1-5 (optional)
    workoutType: 'strength',     // (optional)
    workoutDuration: '40to60',   // (optional)
    workoutFeeling: 'right',     // (optional)
    energyLevel: 4,              // 1-5 (optional)
    painLevel: 'none',           // (optional)
    moodLevel: 4,                // 1-5 (optional)
    stressLevel: 'normal'        // (optional)
  }
}
```

---

## Analytics Available

### Core Metrics
- Adherence % (check-in rate)
- Trained days (last 7/28/90 days)
- Total sessions (all-time)
- Weekly dots (Mon-Sun pattern)
- Recovery predictiveness (%)
- Motivation type (intrinsic/external/habit)
- Week number (since first check-in)
- Independence % (toward 10-year goal)

### Research Metrics
- Average sleep quality
- Pain rate (%)
- Sleep-training correlation
- Top workout type
- Average mood
- Mood-skip correlation
- Average energy
- Data completeness

---

## Deployment

### App to Production
1. Build: `npm run build`
2. Deploy `build/` folder to hosting (Vercel, Netlify, etc.)
3. Update Storage layer if using backend database

### Website to Production
1. Upload `momentum-website/` files to web server
2. Update links in footer (transparency, privacy)
3. Configure email for contact form (if adding)

---

## Customization Ideas

### App Enhancements
- Add push notifications
- Integrate with wearables
- Add community features
- Create coaching recommendations
- Add multi-language support

### Website Enhancements
- Add blog section
- Create case studies
- Add video testimonials
- Build interactive demo
- Add FAQ section

### Research Expansion
- Publish research papers
- Collaborate with universities
- Expand to new populations
- Run intervention studies
- Create longitudinal tracking

---

## Troubleshooting

### App won't start
```bash
npm install
npm start
```

### Port 3000 in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm start
```

### Data not persisting
- Check browser localStorage is enabled
- Check browser console for errors
- Try clearing cache and reloading

### Website not displaying
- Ensure all files are in `momentum-website/` folder
- Check file paths in HTML
- Try serving with local server instead of opening directly

---

## Next Steps

1. **Customize the App**
   - Update colors in design tokens
   - Modify onboarding questions
   - Add new analytics metrics

2. **Deploy the Website**
   - Upload to web hosting
   - Update links and contact info
   - Set up domain

3. **Deploy the App**
   - Build for production
   - Deploy to hosting platform
   - Set up backend if needed

4. **Launch Research**
   - Set up data collection
   - Create research protocols
   - Begin user recruitment

5. **Iterate**
   - Gather user feedback
   - Analyze research data
   - Publish findings
   - Improve features

---

## Support

For detailed information, see:
- `PROJECT_SUMMARY.md` - Complete documentation
- `momentum-website/README.md` - Website documentation
- `src/App.jsx` - Code comments and structure

---

**Ready to go!** 🚀

The app is running at localhost:3000
The website is ready in momentum-website/
The backup is saved in momentum-app-backup/

Start customizing and deploying!
