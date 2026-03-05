# Momentum — Movement for Your Future Independence

A dual-purpose movement tracking application and research platform designed to help people build lasting physical independence while contributing to scientific understanding of habit formation.

## 🚀 Quick Start

### Run the App
```bash
npm start
# Opens at http://localhost:3000
```

### View the Website
```bash
open momentum-website/index.html
# Or serve locally: python -m http.server 8000
```

---

## 📁 Project Structure

```
Momentum/
├── src/                          # React app source code
│   ├── App.jsx                  # Main app component (2500+ lines)
│   ├── index.js                 # Entry point
│   └── lib/
│       ├── storage.js           # Persistent storage layer
│       ├── date.js              # Date utilities
│       └── stats.js             # Analytics engine
│
├── public/                       # Static assets
│   └── index.html               # HTML template
│
├── momentum-app-backup/          # Complete app backup
├── momentum-website/             # Marketing website
│   ├── index.html               # Landing page
│   ├── styles.css               # Styling
│   ├── script.js                # Interactions
│   └── README.md                # Website docs
│
├── package.json                  # Dependencies
├── PROJECT_SUMMARY.md            # Detailed documentation
├── QUICKSTART.md                 # Quick reference guide
└── README.md                     # This file
```

---

## ✨ Key Features

### The App
- **8-Screen Onboarding**: Philosophy, intention, sign-in, schedule, training aim, movements, tone, notifications
- **Daily Check-ins**: 3 quick questions (morning/evening/night) + optional details
- **5 Main Screens**: Today's log, weekly reflection, insights, independence account, behavioral pattern
- **Advanced Analytics**: Real-time computation of 20+ metrics from check-in data
- **Hero Animations**: Smooth tile expansion to full-screen pages
- **Intention Milestones**: Celebration modals at 7, 30, 100, 365 days
- **Privacy Controls**: Data export, import, deletion with transparency modals
- **Light/Dark Theme**: Toggle on philosophy screen and in settings
- **Persistent Storage**: localStorage with async abstraction layer

### The Website
- **Hero Section**: Compelling mission statement
- **Feature Cards**: 6 key capabilities with icons
- **How It Works**: 5-step process visualization
- **Research Explanation**: Why research matters, data control, findings, transparency
- **Audience Segments**: 6 different user types
- **Privacy Commitments**: Clear data handling practices
- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Animations**: Scroll-triggered fade-in effects

---

## 🎯 Core Functionality

### Daily Check-ins
```
Morning:  Did you train? (yes/already/no)
Evening:  How did your body show up? (good/worked/pushed/rest)
Night:    Recovery state (recovered/tired/fatigued/wired)
Optional: Sleep quality, workout type/duration/feeling, energy, pain, mood, stress
```

### Analytics Computed
- Adherence % (check-in rate)
- Trained days (last 7/28/90 days)
- Recovery predictiveness (night state → next-day training)
- Motivation type (intrinsic/external/habit)
- Behavioral phenotype (recovery-responsive/habit-builder/etc)
- Independence account (progress toward 10-year goal)
- Sleep-training correlation
- Mood-skip correlation
- And 12+ more metrics

### Behavioral Phenotypes
Automatically detected from check-in patterns:
- **Recovery-responsive**: Listens to body, shows up when recovered
- **Habit-builder**: Movement becoming automatic
- **Accountability-driven**: External structures supporting training
- **Intention-led**: Shows up because it matters

---

## 🔬 Research Framework

### Data Collection
- Daily check-ins (3 per day, 8 seconds total)
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
✅ Individual data never shared with third parties
✅ No advertising or data brokers
✅ Research contribution is optional
✅ Only anonymised, aggregated patterns used
✅ Users can export or delete data anytime
✅ Research findings published openly
✅ Contracts published at momentum.app/transparency

---

## 🛠 Technology Stack

### App
- **Framework**: React 18.2.0
- **Styling**: CSS-in-JS with design tokens
- **Storage**: localStorage with async abstraction
- **State**: React hooks (useState, useCallback, useEffect)
- **Build**: Create React App

### Website
- **HTML5**: Semantic markup
- **CSS3**: Grid, flexbox, animations
- **JavaScript**: Vanilla JS for interactions
- **Design**: Dark theme with lavender/gold accents

---

## 📊 Design System

### Colors
- **Primary**: Lavender (#C4A8D4)
- **Accent**: Gold (#D4B896)
- **Background**: Deep purple (#0F0D14)
- **Surface**: #1A1625
- **Text**: #EDE8F5 (primary), #9B8FB0 (secondary)

### Typography
- **Serif**: Cormorant Garamond (headings)
- **Sans**: DM Sans (body)

### Spacing
- Small: 12px
- Medium: 16px
- Large: 24px

---

## 📚 Documentation

- **PROJECT_SUMMARY.md** - Complete project overview with all details
- **QUICKSTART.md** - Quick reference guide for common tasks
- **momentum-website/README.md** - Website-specific documentation

---

## 🚀 Deployment

### App to Production
```bash
npm run build
# Deploy build/ folder to Vercel, Netlify, or your hosting
```

### Website to Production
```bash
# Upload momentum-website/ files to web server
# Update links in footer
# Configure email for contact form (if adding)
```

---

## 🎨 Customization

### Update Colors
Edit `:root` in `src/App.jsx` or `momentum-website/styles.css`

### Modify Content
- App: Edit components in `src/App.jsx`
- Website: Edit sections in `momentum-website/index.html`

### Add Features
- New analytics: Add methods to `src/lib/stats.js`
- New screens: Create components in `src/App.jsx`
- New website sections: Add to `momentum-website/index.html`

---

## 📱 Responsive Design

- **Desktop**: Full-width layouts with multi-column grids
- **Tablet**: Adjusted spacing and font sizes
- **Mobile**: Single-column layouts, touch-friendly buttons

---

## 🔐 Data Privacy

### What We Collect
- Daily check-ins (morning/evening/night)
- Optional: sleep, energy, mood, pain, stress, workout details
- User preferences and schedule
- Founding intention

### How We Use It
- Power your Insights dashboard
- Compute your behavioral patterns
- Track your Independence Account
- Optional: contribute to research (anonymised only)

### Your Control
- Export data as JSON anytime
- Delete all data with one click
- Opt-in to research contribution
- View all privacy policies

---

## 🎯 Who Is This For?

- **Shift workers**: Nurses, firefighters, transport workers
- **Older adults**: Building independence for 70s, 80s, 90s
- **Parents/caregivers**: Time structured around others' needs
- **Athletes**: From first session to professional level
- **People returning**: After injury, illness, or time away
- **Habit builders**: Anyone building lasting practices

---

## 📈 Future Enhancements

### App
- Push notifications
- Wearable integration
- Community features
- Coaching recommendations
- Multi-language support

### Website
- Blog with research findings
- Case studies
- Video testimonials
- Interactive demo
- FAQ section

### Research
- Peer-reviewed publications
- University collaborations
- Longitudinal studies
- Intervention studies

---

## 🤝 Contributing

To contribute to Momentum:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 Support

For questions or issues:
- Check `PROJECT_SUMMARY.md` for detailed documentation
- Review `QUICKSTART.md` for common tasks
- See `momentum-website/README.md` for website docs

---

## 📄 License

Momentum is open source. See LICENSE file for details.

---

## 🙏 Acknowledgments

Built with React, inspired by the need for movement tracking that respects real life and contributes to science.

---

## 📍 Status

✅ **Production Ready**
- App fully functional
- Website complete
- All features implemented
- Ready for deployment

---

**Momentum** — Building the physical capacity that lets you do what matters most.

*Everything you do today is a conversation with your future self.*

---

**Last Updated**: March 2, 2026
**Version**: 1.0.0
