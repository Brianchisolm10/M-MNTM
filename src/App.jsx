import { useState, useEffect, useCallback, useRef } from "react";

// ─── GOOGLE FONTS ─────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
);

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const tokens = `/* ── DARK MODE (default) ── */:root {
--bg:         #0F0D14;
--surface:    #1A1625;
--elevated:   #221D30;
--border:     #2D2740;
--silent:     #3D3550;
--lavender:   #C4A8D4;
--gold:       #D4B896;
--deep-lav:   #8B6FA8;
--soft-bloom: #E8D5F0;
--text-1:     #EDE8F5;
--text-2:     #9B8FB0;
--text-3:     #5C5270;
--sage:       #7BC8A4;
--amber:      #C4A86A;
--rose:       #C47A7A;
--scrim:      rgba(15,13,20,0.92);
--nav-bg:     rgba(15,13,20,0.97);
--select-bg:  #221D30;
--font-serif: 'Cormorant Garamond', Georgia, serif;
--font-sans:  'DM Sans', system-ui, sans-serif;
--r-sm: 12px; --r-md: 16px; --r-lg: 24px;
}
/* ── LIGHT MODE — lavender brand palette ── */
.theme-light {
--bg:         #F0EBF8;
--surface:    #E6DCF3;
--elevated:   #D9CCEC;
--border:     #C6B3E2;
--silent:     #A892CC;
--lavender:   #6A3FA0;
--gold:       #7A5A10;
--deep-lav:   #522A88;
--soft-bloom: #3D1A70;
--text-1:     #1C1030;
--text-2:     #3A2558;
--text-3:     #6A5585;
--sage:       #1A6B3C;
--amber:      #6B4808;
--rose:       #7A2222;
--scrim:      rgba(180,160,210,0.55);
--nav-bg:     rgba(230,220,243,0.97);
--select-bg:  #D9CCEC;
}
.theme-light .noise-overlay { opacity: 0; }
.theme-light .first-screen-glow {
background: radial-gradient(ellipse, rgba(106,63,160,0.06) 0%, transparent 70%);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
background: var(--bg); color: var(--text-1);
font-family: var(--font-sans); -webkit-font-smoothing: antialiased;
overflow: hidden; height: 100vh;
}
.app {
width: 100%; max-width: 420px; margin: 0 auto;
height: 100vh; position: relative; overflow: hidden; background: var(--bg);
}
.screen {
position: absolute; inset: 0; display: flex; flex-direction: column;
opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
overflow-y: auto; overflow-x: hidden;
}
.screen.active { opacity: 1; pointer-events: all; }
.card {
background: var(--surface); border: 1px solid var(--border);
border-radius: var(--r-lg); padding: 20px;
}
.card-elevated {
background: var(--elevated); border: 1px solid var(--border);
border-radius: var(--r-lg); padding: 20px;
}
/* ── BUTTONS ── */
.btn-primary {
display: flex; align-items: center; justify-content: center;
width: 100%; min-height: 54px; padding: 14px 24px;
border-radius: var(--r-md); border: 1.5px solid var(--lavender);
background: transparent; color: var(--lavender);
font-family: var(--font-sans); font-size: 17px; font-weight: 500;
letter-spacing: 0.01em; cursor: pointer; transition: all 0.2s ease;
-webkit-tap-highlight-color: transparent;
}
.btn-primary:hover, .btn-primary:active { background: rgba(196,168,212,0.12); }
.btn-primary.filled { background: var(--lavender); color: var(--bg); }
.btn-primary.filled:hover { background: var(--soft-bloom); }
.btn-ghost {
display: flex; align-items: center; justify-content: center;
width: 100%; min-height: 50px; padding: 12px 24px;
border-radius: var(--r-md); border: 1px solid var(--border);
background: transparent; color: var(--text-2);
font-family: var(--font-sans); font-size: 16px;
cursor: pointer; transition: all 0.2s ease;
-webkit-tap-highlight-color: transparent;
}
.btn-ghost:hover { border-color: var(--silent); color: var(--text-1); }
.btn-choice {
display: flex; align-items: center; width: 100%; min-height: 58px;
padding: 16px 20px; border-radius: var(--r-md);
border: 1.5px solid var(--border); background: transparent;
color: var(--text-1); font-family: var(--font-sans); font-size: 17px;
cursor: pointer; transition: all 0.2s ease; text-align: left; gap: 14px;
-webkit-tap-highlight-color: transparent;
}
.btn-choice:hover { border-color: var(--deep-lav); }
.btn-choice.selected { border-color: var(--lavender); background: rgba(196,168,212,0.08); color: var(--lavender); }
/* ── CHECK-IN OPTS ── */
.checkin-opts { display: flex; gap: 8px; flex-wrap: wrap; }
.checkin-opt {
flex: 1; min-width: 80px; min-height: 54px;
padding: 12px 10px; border-radius: var(--r-md);
border: 1.5px solid var(--border); background: transparent;
color: var(--text-2); font-family: var(--font-sans); font-size: 15px;
font-weight: 500; cursor: pointer; transition: all 0.2s ease; text-align: center; line-height: 1.3;
-webkit-tap-highlight-color: transparent;
}
.checkin-opt:hover { border-color: var(--deep-lav); color: var(--text-1); }
.checkin-opt.selected { border-color: var(--lavender); background: rgba(196,168,212,0.10); color: var(--lavender); }
/* ── PROGRESS BAR ── */
.progress-bar { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--lavender); border-radius: 2px; transition: width 0.5s ease; }
/* ── DOTS ── */
.dot-strip { display: flex; gap: 10px; align-items: center; }
.dot {
width: 10px; height: 10px; border-radius: 50%;
transition: all 0.3s ease; flex-shrink: 0;
}
.dot.trained { background: var(--deep-lav); box-shadow: 0 0 8px rgba(139,111,168,0.5); }
.dot.untrained { background: transparent; border: 1.5px solid var(--silent); }
.dot.today { background: transparent; border: 1.5px solid var(--lavender); animation: pulse 2s infinite; }
.dot.empty { background: var(--border); border-radius: 2px; width: 6px; height: 2px; }
@keyframes pulse {
0%, 100% { box-shadow: 0 0 0 0 rgba(196,168,212,0.4); }
50% { box-shadow: 0 0 0 5px rgba(196,168,212,0); }
}
/* ── INSIGHT CARD ── */
.insight-card { border-radius: var(--r-lg); border: 1px solid var(--border); overflow: hidden; background: var(--surface); }
.insight-header { padding: 20px 20px 16px; }
.insight-expand {
border-top: 1px solid var(--border); padding: 16px 20px;
cursor: pointer; display: flex; align-items: center; gap: 8px;
color: var(--text-2); font-size: 15px; transition: color 0.2s;
background: transparent; width: 100%; font-family: var(--font-sans); text-align: left;
-webkit-tap-highlight-color: transparent;
}
.insight-expand:hover { color: var(--lavender); }
.insight-body { padding: 0 20px 20px; color: var(--text-2); font-size: 15px; line-height: 1.7; display: none; }
.insight-body.open { display: block; }
/* ── NAV ── */
.nav {
position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
width: 100%; max-width: 420px;
background: var(--nav-bg); backdrop-filter: blur(20px);
border-top: 1px solid var(--border); display: flex;
padding: 10px 0 max(14px, env(safe-area-inset-bottom)); z-index: 100;
}
.nav-item {
flex: 1; display: flex; flex-direction: column; align-items: center;
gap: 4px; cursor: pointer; padding: 6px 0; color: var(--text-3);
font-size: 10px; letter-spacing: 0.04em; transition: color 0.2s;
background: none; border: none; font-family: var(--font-sans);
min-height: 44px; -webkit-tap-highlight-color: transparent;
}
.nav-item.active { color: var(--lavender); }
.nav-item svg { width: 20px; height: 20px; }
/* ── RADIO ── */
.radio-group { display: flex; flex-direction: column; gap: 8px; }
.radio-item {
display: flex; align-items: center; gap: 14px;
padding: 14px 16px; border-radius: var(--r-md);
border: 1.5px solid var(--border); cursor: pointer; transition: all 0.2s;
min-height: 54px; -webkit-tap-highlight-color: transparent;
}
.radio-item:hover { border-color: var(--deep-lav); }
.radio-item.selected { border-color: var(--lavender); background: rgba(196,168,212,0.06); }
.radio-dot {
width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--silent);
flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.radio-item.selected .radio-dot { border-color: var(--lavender); background: var(--lavender); }
.radio-item.selected .radio-dot::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--bg); }
/* ── CHECKBOX GRID ── */
.checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.checkbox-item {
padding: 14px; border-radius: var(--r-md); border: 1.5px solid var(--border);
cursor: pointer; font-size: 14px; color: var(--text-2); transition: all 0.2s;
display: flex; align-items: center; gap: 10px;
background: none; font-family: var(--font-sans); text-align: left; min-height: 50px;
-webkit-tap-highlight-color: transparent;
}
.checkbox-item:hover { border-color: var(--deep-lav); color: var(--text-1); }
.checkbox-item.checked { border-color: var(--lavender); background: rgba(196,168,212,0.08); color: var(--lavender); }
.checkbox-box {
width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid var(--silent);
flex-shrink: 0; transition: all 0.2s; display: flex; align-items: center; justify-content: center;
}
.checkbox-item.checked .checkbox-box { background: var(--lavender); border-color: var(--lavender); }
/* ── ACCOUNT BAR ── */
.account-bar { height: 6px; border-radius: 3px; background: var(--border); overflow: hidden; }
.account-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--deep-lav), var(--lavender)); transition: width 1s ease; }
/* ── COMPACT CHECK-IN PILLS ── */
.checkin-pills { display: flex; flex-wrap: wrap; gap: 7px; }
.checkin-pill {
padding: 9px 16px; border-radius: 100px; border: 1.5px solid var(--border);
background: transparent; color: var(--text-2); font-family: var(--font-sans);
font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s;
min-height: 38px; -webkit-tap-highlight-color: transparent;
}
.checkin-pill:hover { border-color: var(--deep-lav); color: var(--text-1); }
.checkin-pill.selected { border-color: var(--lavender); background: rgba(196,168,212,0.10); color: var(--lavender); }
/* ── COMMUNITY NUMBER ── */
.community-number {
font-family: var(--font-serif); font-size: 48px; font-weight: 300;
color: var(--lavender); letter-spacing: -0.02em; line-height: 1;
}
/* ── MISC ── */
.divider { height: 1px; background: var(--border); margin: 20px 0; }
.safe-top { padding-top: max(52px, env(safe-area-inset-top)); }
.safe-bottom { padding-bottom: max(88px, calc(env(safe-area-inset-bottom) + 76px)); }
.first-screen-glow {
position: absolute; top: 15%; left: 50%; transform: translateX(-50%);
width: 340px; height: 340px;
background: radial-gradient(ellipse, rgba(196,168,212,0.07) 0%, transparent 70%);
pointer-events: none;
}
/* ── STAGGER ── */
.stagger > * { opacity: 0; transform: translateY(14px); animation: staggerIn 0.45s ease forwards; }
.stagger > *:nth-child(1) { animation-delay: 0.05s; }
.stagger > *:nth-child(2) { animation-delay: 0.13s; }
.stagger > *:nth-child(3) { animation-delay: 0.21s; }
.stagger > *:nth-child(4) { animation-delay: 0.29s; }
.stagger > *:nth-child(5) { animation-delay: 0.37s; }
.stagger > *:nth-child(6) { animation-delay: 0.45s; }
.stagger > *:nth-child(7) { animation-delay: 0.53s; }
.stagger > *:nth-child(8) { animation-delay: 0.61s; }
@keyframes staggerIn { to { opacity: 1; transform: translateY(0); } }
/* ── NOISE ── */
.noise-overlay {
position: fixed; inset: 0; pointer-events: none; opacity: 0.025;
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
background-size: 200px; z-index: 9999;
}
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--silent); border-radius: 2px; }
`;

// ─── STORAGE ABSTRACTION ──────────────────────────────────────────────────────
// This layer is the single place to wire up a real database later.
// It uses the artifact persistent storage API with localStorage as fallback.
const Storage = {
  async save(state) {
    try {
      await window.storage.set('momentum_v2', JSON.stringify(state));
    } catch {
      try { localStorage.setItem('momentum_v2', JSON.stringify(state)); } catch {}
    }
  },
  async load() {
    try {
      const r = await window.storage.get('momentum_v2');
      if (r?.value) return JSON.parse(r.value);
    } catch {}
    try {
      const r = localStorage.getItem('momentum_v2');
      if (r) return JSON.parse(r);
    } catch {}
    return null;
  },
  async clear() {
    try { await window.storage.delete('momentum_v2'); } catch {}
    try { localStorage.removeItem('momentum_v2'); } catch {}
  }
};

// ─── DEFAULT STATE ────────────────────────────────────────────────────────────
const defaultState = {
  screen: 'philosophy',
  inApp: false,
  navScreen: 'today',
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
    seenWelcome: false,
    theme: 'dark',
  },
  checkIns: {},
};

// ─── DATE HELPERS ─────────────────────────────────────────────────────────────
const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate()+n); return r; };

// ─── STATS ENGINE ────────────────────────────────────────────────────────────
const Stats = {
  // % of days in window where morning check-in was logged (any value)
  adherence(checkIns, days = 28) {
    if (!checkIns || !Object.keys(checkIns).length) return 0;
    let logged = 0;
    for (let i = 0; i < days; i++) {
      const key = dateKey(addDays(new Date(), -i));
      if (checkIns[key]?.morning) logged++;
    }
    return Math.round((logged / days) * 100);
  },
  // Days trained (morning === yes or already) in the last N days
  trainedDays(checkIns, days = 7) {
    if (!checkIns) return 0;
    let n = 0;
    for (let i = 0; i < days; i++) {
      const m = checkIns[dateKey(addDays(new Date(), -i))]?.morning;
      if (m === 'yes' || m === 'already') n++;
    }
    return n;
  },
  // Total training sessions ever
  totalSessions(checkIns) {
    if (!checkIns) return 0;
    return Object.values(checkIns).filter(e => e.morning === 'yes' || e.morning === 'already').length;
  },
  // Mon–Sun dot array for a week. weekOffset 0 = this week, -1 = last week
  weekDots(checkIns, weekOffset = 0) {
    const today = new Date();
    const dow = today.getDay(); // 0=sun
    const toMon = dow === 0 ? -6 : 1 - dow;
    const weekStart = addDays(today, toMon + weekOffset * 7);
    const todayKey = dateKey(today);
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(weekStart, i);
      const k = dateKey(d);
      if (k > todayKey) return -1; // future: empty
      const m = checkIns[k]?.morning;
      if (!m) return -1;           // past with no log: empty
      return (m === 'yes' || m === 'already') ? 1 : 0;
    });
  },
  // Index of today in Mon–Sun strip (0=Mon, 6=Sun)
  todayDotIndex() {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  },
  // When you felt recovered at night, % you trained the next day
  // Returns null when sample is too small (<3)
  recoveryPredictiveness(checkIns, days = 28) {
    if (!checkIns) return null;
    let total = 0, trained = 0;
    for (let i = 1; i < days; i++) {
      const prev = checkIns[dateKey(addDays(new Date(), -i))];
      const next = checkIns[dateKey(addDays(new Date(), -(i - 1)))];
      if (prev?.night === 'recovered') {
        total++;
        const m = next?.morning;
        if (m === 'yes' || m === 'already') trained++;
      }
    }
    return total >= 3 ? Math.round((trained / total) * 100) : null;
  },
  // Determine dominant motivation pattern from check-in data
  motivationType(checkIns, days = 28) {
    if (!checkIns) return 'intrinsic';
    let yes = 0, already = 0, no = 0;
    for (let i = 0; i < days; i++) {
      const m = checkIns[dateKey(addDays(new Date(), -i))]?.morning;
      if (m === 'yes') yes++;
      else if (m === 'already') already++;
      else if (m === 'no') no++;
    }
    const total = yes + already + no;
    if (!total) return 'intrinsic';
    if (already / total > 0.35) return 'habit';
    if (no / total > 0.45) return 'external';
    return 'intrinsic';
  },
  // Week number since first check-in
  weekNumber(checkIns) {
    if (!checkIns || !Object.keys(checkIns).length) return 1;
    const first = new Date(Object.keys(checkIns).sort()[0]);
    return Math.floor((Date.now() - first.getTime()) / (7 * 864e5)) + 1;
  },
  // "Mar 3 – Mar 9" for weekOffset 0
  weekRange(weekOffset = 0) {
    const today = new Date();
    const toMon = today.getDay() === 0 ? -6 : 1 - today.getDay();
    const start = addDays(today, toMon + weekOffset * 7);
    const end = addDays(start, 6);
    const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(start)} – ${fmt(end)}`;
  },
  // How many more/fewer days trained vs last week
  trainingDelta(checkIns) {
    const thisWeek = Stats.trainedDays(checkIns, 7);
    let lastWeek = 0;
    for (let i = 7; i < 14; i++) {
      const m = checkIns[dateKey(addDays(new Date(), -i))]?.morning;
      if (m === 'yes' || m === 'already') lastWeek++;
    }
    return thisWeek - lastWeek;
  },
  // Days since first check-in
  daysInApp(checkIns) {
    if (!checkIns || !Object.keys(checkIns).length) return 0;
    const first = new Date(Object.keys(checkIns).sort()[0]);
    return Math.max(0, Math.floor((Date.now() - first.getTime()) / 864e5));
  },
  // Return milestone number (7, 30, 100, 365) if we just crossed it (within 3-day window)
  intentionMilestone(checkIns) {
    const days = Stats.daysInApp(checkIns);
    return [7, 30, 100, 365].find(m => days >= m && days < m + 3) ?? null;
  },
  // Independence account: sessions as % of 10-year goal (365*3 = ~1095 sessions)
  independencePct(checkIns) {
    const s = Stats.totalSessions(checkIns);
    return Math.min(100, Math.round((s / 1095) * 100));
  },
  // ── NEW RESEARCH FIELDS ──────────────────────────────────────────────────
  // Average sleep quality (1–5 scale) over last N days, null if <3 entries
  avgSleep(checkIns, days = 28) {
    if (!checkIns) return null;
    const vals = [];
    for (let i = 0; i < days; i++) {
      const v = checkIns[dateKey(addDays(new Date(), -i))]?.sleepQuality;
      if (v != null) vals.push(Number(v));
    }
    return vals.length >= 3 ? Math.round((vals.reduce((a,b) => a+b, 0) / vals.length) * 10) / 10 : null;
  },
  // % of days with pain flagged (any level) over last N days
  painRate(checkIns, days = 28) {
    if (!checkIns) return null;
    let flagged = 0, total = 0;
    for (let i = 0; i < days; i++) {
      const e = checkIns[dateKey(addDays(new Date(), -i))];
      if (!e) continue;
      if (e.morning || e.evening || e.night) { // only count days with any log
        total++;
        if (e.painLevel && e.painLevel !== 'none') flagged++;
      }
    }
    return total >= 3 ? Math.round((flagged / total) * 100) : null;
  },
  // Does good sleep (4–5) predict training the next morning? Returns % correlation
  sleepTrainingCorr(checkIns, days = 28) {
    if (!checkIns) return null;
    let goodSleepDays = 0, trained = 0;
    for (let i = 1; i < days; i++) {
      const prev = checkIns[dateKey(addDays(new Date(), -i))];
      const next = checkIns[dateKey(addDays(new Date(), -(i-1)))];
      if (!prev?.sleepQuality) continue;
      if (Number(prev.sleepQuality) >= 4) {
        goodSleepDays++;
        const m = next?.morning;
        if (m === 'yes' || m === 'already') trained++;
      }
    }
    return goodSleepDays >= 3 ? Math.round((trained / goodSleepDays) * 100) : null;
  },
  // Dominant workout type over last N days
  topWorkoutType(checkIns, days = 28) {
    if (!checkIns) return null;
    const counts = {};
    for (let i = 0; i < days; i++) {
      const t = checkIns[dateKey(addDays(new Date(), -i))]?.workoutType;
      if (t) counts[t] = (counts[t] || 0) + 1;
    }
    if (!Object.keys(counts).length) return null;
    return Object.entries(counts).sort((a,b) => b[1]-a[1])[0][0];
  },
  // Average mood (1–5) over last N days, null if <3 entries
  avgMood(checkIns, days = 28) {
    if (!checkIns) return null;
    const vals = [];
    for (let i = 0; i < days; i++) {
      const v = checkIns[dateKey(addDays(new Date(), -i))]?.moodLevel;
      if (v != null) vals.push(Number(v));
    }
    return vals.length >= 3 ? Math.round((vals.reduce((a,b) => a+b, 0) / vals.length) * 10) / 10 : null;
  },
  // Does low mood predict training skip? Returns % of low-mood days with no training
  moodSkipCorr(checkIns, days = 28) {
    if (!checkIns) return null;
    let lowMood = 0, skipped = 0;
    for (let i = 0; i < days; i++) {
      const e = checkIns[dateKey(addDays(new Date(), -i))];
      if (!e?.moodLevel) continue;
      if (Number(e.moodLevel) <= 2) {
        lowMood++;
        if (!e.morning || e.morning === 'no') skipped++;
      }
    }
    return lowMood >= 3 ? Math.round((skipped / lowMood) * 100) : null;
  },
  // Average energy level (1–5) over last N days
  avgEnergy(checkIns, days = 28) {
    if (!checkIns) return null;
    const vals = [];
    for (let i = 0; i < days; i++) {
      const v = checkIns[dateKey(addDays(new Date(), -i))]?.energyLevel;
      if (v != null) vals.push(Number(v));
    }
    return vals.length >= 3 ? Math.round((vals.reduce((a,b) => a+b, 0) / vals.length) * 10) / 10 : null;
  },
  // Count of days with each new field filled in (for data completeness)
  dataCompleteness(checkIns) {
    if (!checkIns) return { core: 0, deep: 0 };
    let core = 0, deep = 0;
    Object.values(checkIns).forEach(e => {
      if (e.morning || e.evening || e.night) core++;
      if (e.sleepQuality || e.energyLevel || e.painLevel || e.moodLevel || e.workoutType) deep++;
    });
    return { core, deep };
  },
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>,
    wave: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M2 12s3-4 5-4 4 4 7 4 5-4 7-4"/><path d="M2 18s3-4 5-4 4 4 7 4 5-4 7-4"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    gear: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
    leaf: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    moon: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    apple: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>,
    google: <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    minus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    spinner: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" style={{animation:'spin 1s linear infinite', transformOrigin:'center'}}/></svg>,
  };
  return icons[name] || null;
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const DotStrip = ({ days = [], today = -1 }) => {
  const labels = ["M","T","W","T","F","S","S"];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <div className="dot-strip">
        {days.map((d, i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, flex:1 }}>
            <div className={`dot ${i===today ? "today" : d===1 ? "trained" : d===0 ? "untrained" : "empty"}`} />
            <span style={{ fontSize:10, color:"var(--text-3)" }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const InsightBlock = ({ label, title, body, education }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="insight-card">
      <div className="insight-header">
        {label && <div style={{ fontSize:15, color:"var(--lavender)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>{label}</div>}
        <div style={{ fontSize:16, color:"var(--text-1)", lineHeight:1.5 }}>{title}</div>
        {body && <div style={{ fontSize:16, color:"var(--text-2)", lineHeight:1.6, marginTop:8 }}>{body}</div>}
      </div>
      {education && (
        <>
          <button className="insight-expand" onClick={() => setOpen(!open)}>
            <Icon name="book" size={14} />
            Why does this matter?
            <span style={{ marginLeft:"auto", transform:open?"rotate(180deg)":"none", transition:"0.2s", display:"inline-block" }}>↓</span>
          </button>
          <div className={`insight-body ${open?"open":""}`}>{education}</div>
        </>
      )}
    </div>
  );
};

const AccountBar = ({ pct=60, label, sublabel }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
      <span style={{ fontSize:15, color:"var(--text-2)" }}>{label}</span>
      <span style={{ fontSize:16, color:"var(--text-3)" }}>{sublabel}</span>
    </div>
    <div className="account-bar">
      <div className="account-fill" style={{ width:`${pct}%` }} />
    </div>
  </div>
);

const ProgressHeader = ({ step, total, onBack }) => (
  <div style={{ marginBottom:6 }}>
    <div style={{ display:"flex", alignItems:"center", marginBottom:14 }}>
      {onBack && (
        <button onClick={onBack}
          style={{ background:"none", border:"none", color:"var(--text-3)", fontFamily:"var(--font-sans)", fontSize:16, cursor:"pointer", padding:"0 14px 0 0", display:"flex", alignItems:"center", gap:6, WebkitTapHighlightColor:"transparent" }}
          onMouseEnter={e => e.currentTarget.style.color="var(--lavender)"}
          onMouseLeave={e => e.currentTarget.style.color="var(--text-3)"}
        >← Back</button>
      )}
      <div style={{ fontSize:15, color:"var(--lavender)", letterSpacing:"0.1em", textTransform:"uppercase", marginLeft: onBack ? "auto" : 0 }}>Step {step} of {total}</div>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width:`${(step/total)*100}%` }} />
    </div>
  </div>
);

// ─── ONBOARDING SCREENS ───────────────────────────────────────────────────────
// 1 · Philosophy
const PhilosophyScreen = ({ onNext, theme, onThemeToggle }) => {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 120); return () => clearTimeout(t); }, []);
  const isLight = theme === 'light';
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", padding:"40px 36px", position:"relative" }}>
      <div className="first-screen-glow" />
      {/* Theme toggle — top right, fades in with content */}
      <button
        onClick={onThemeToggle}
        title={isLight ? "Switch to dark mode" : "Switch to light mode"}
        style={{
          position:"absolute", top:"max(20px, env(safe-area-inset-top))", right:20,
          display:"flex", alignItems:"center", gap:7, padding:"8px 14px",
          background:"var(--surface)", border:"1px solid var(--border)", borderRadius:100,
          color:"var(--text-2)", fontFamily:"var(--font-sans)", fontSize:15, cursor:"pointer",
          transition:"all 0.3s", opacity: vis ? 1 : 0, zIndex:10,
          WebkitTapHighlightColor:"transparent",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor="var(--lavender)"; e.currentTarget.style.color="var(--lavender)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text-2)"; }}
      >
        <span style={{ fontSize:15 }}>{isLight ? "☾" : "☀"}</span>
        <span>{isLight ? "Dark" : "Light"}</span>
      </button>
      <div style={{ textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:38, fontWeight:400, color:"var(--lavender)", letterSpacing:"0.15em", marginBottom:60, opacity:vis?1:0, transition:"opacity 0.9s ease" }}>M</div>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:27, fontWeight:400, color:"var(--text-1)", lineHeight:1.55, letterSpacing:"0.01em", marginBottom:24, opacity:vis?1:0, transition:"opacity 1.3s ease 0.3s" }}>Somewhere in your future<br />is a version of you who can<br />still do the things<br />that matter most.</div>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:18, fontWeight:400, color:"var(--text-2)", lineHeight:1.65, fontStyle:"italic", marginBottom:72, opacity:vis?1:0, transition:"opacity 1.3s ease 0.6s" }}>Everything you do today is a<br />conversation with that person.</div>
        <div style={{ width:"100%", maxWidth:220, opacity:vis?1:0, transition:"opacity 1s ease 1.3s" }}>
          <button className="btn-primary filled" onClick={onNext} style={{ fontSize:17, letterSpacing:"0.03em" }}>Begin</button>
        </div>
      </div>
    </div>
  );
};

// 2 · Founding Intention
const IntentionScreen = ({ onNext, onBack, onSave }) => {
  const [val, setVal] = useState("");
  const handleNext = () => {
    onSave(val.trim());
    onNext();
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"64px 28px 40px" }} className="stagger">
      <button onClick={onBack}
        style={{ background:"none", border:"none", color:"var(--text-3)", fontFamily:"var(--font-sans)", fontSize:16, cursor:"pointer", padding:"0 0 24px 0", display:"flex", alignItems:"center", gap:6, alignSelf:"flex-start", WebkitTapHighlightColor:"transparent" }}
        onMouseEnter={e => e.currentTarget.style.color="var(--lavender)"}
        onMouseLeave={e => e.currentTarget.style.color="var(--text-3)"}
      >← Back</button>
      <div style={{ fontFamily:"var(--font-serif)", fontSize:15, color:"var(--lavender)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:32 }}>Before we begin</div>
      <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", lineHeight:1.5, marginBottom:12 }}>What do you want to be able to do that you are not sure you can do yet?</div>
      <div style={{ fontSize:16, color:"var(--text-3)", lineHeight:1.65, marginBottom:28 }}>Optional. Your own words. We will return this to you in a year.</div>
      <textarea
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="Walk the Camino at 70. Play with my grandchildren. Carry my own bags..."
        style={{
          background:"var(--surface)", border:"1.5px solid var(--border)",
          borderRadius:"var(--r-md)", padding:16, color:"var(--text-1)",
          fontFamily:"var(--font-sans)", fontSize:15, lineHeight:1.65,
          resize:"none", minHeight:130, outline:"none", flex:1, transition:"border-color 0.2s"
        }}
        onFocus={e => e.target.style.borderColor = "var(--lavender)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"}
      />
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:24 }}>
        <button className="btn-primary filled" onClick={handleNext}>
          {val.trim() ? "Save and continue →" : "Continue →"}
        </button>
        <button className="btn-ghost" onClick={() => { onSave(""); onNext(); }}>I'm not sure yet — skip</button>
      </div>
    </div>
  );
};

// 3 · Sign In
const SignInScreen = ({ onNext, onBack, onSave }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [method, setMethod] = useState(null);
  const handleContinue = (m) => {
    setMethod(m);
    onSave({ email: email.trim(), name: name.trim(), authMethod: m });
    onNext();
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"64px 28px 40px" }} className="stagger">
      <button onClick={onBack}
        style={{ background:"none", border:"none", color:"var(--text-3)", fontFamily:"var(--font-sans)", fontSize:16, cursor:"pointer", padding:"0 0 24px 0", display:"flex", alignItems:"center", gap:6, alignSelf:"flex-start", WebkitTapHighlightColor:"transparent" }}
        onMouseEnter={e => e.currentTarget.style.color="var(--lavender)"}
        onMouseLeave={e => e.currentTarget.style.color="var(--text-3)"}
      >← Back</button>
      <div style={{ fontFamily:"var(--font-serif)", fontSize:15, color:"var(--lavender)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:32 }}>Create your account</div>
      <div style={{ fontFamily:"var(--font-serif)", fontSize:28, fontWeight:400, color:"var(--text-1)", lineHeight:1.4, marginBottom:8 }}>Welcome.</div>
      <div style={{ fontSize:16, color:"var(--text-3)", lineHeight:1.65, marginBottom:36 }}>Your data is yours.<br />We store it securely. We never sell it. Ever.</div>
      {/* Name field */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:16, color:"var(--text-3)", marginBottom:8, letterSpacing:"0.06em", textTransform:"uppercase" }}>Your name</div>
        <input
          type="text" value={name} onChange={e => setName(e.target.value)}
          placeholder="Alex"
          style={{
            width:"100%", background:"var(--surface)", border:"1.5px solid var(--border)",
            borderRadius:"var(--r-md)", padding:"14px 16px", color:"var(--text-1)",
            fontFamily:"var(--font-sans)", fontSize:15, outline:"none", transition:"border-color 0.2s"
          }}
          onFocus={e => e.target.style.borderColor = "var(--lavender)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:8 }}>
        <button className="btn-choice" onClick={() => handleContinue("apple")}>
          <Icon name="apple" size={20} color="var(--text-1)" />
          <span style={{ fontSize:16 }}>Continue with Apple</span>
        </button>
        <button className="btn-choice" onClick={() => handleContinue("google")}>
          <Icon name="google" size={20} />
          <span style={{ fontSize:16 }}>Continue with Google</span>
        </button>
        <button className="btn-choice" onClick={() => handleContinue("email")}>
          <Icon name="mail" size={20} color="var(--text-2)" />
          <span style={{ fontSize:16 }}>Continue with email</span>
        </button>
      </div>
      <div style={{ fontSize:16, color:"var(--text-3)", lineHeight:1.7, marginTop:28, textAlign:"center" }}>By continuing you agree to our Privacy Policy.<br />Published at momentum.app/transparency</div>
    </div>
  );
};

// 4 · Schedule
const wakeTimes = ["4:00 AM","4:30 AM","5:00 AM","5:30 AM","6:00 AM","6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
const sleepTimes = ["7:00 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM","10:30 PM","11:00 PM","11:30 PM","12:00 AM","12:30 AM","1:00 AM","1:30 AM","2:00 AM","3:00 AM","4:00 AM"];
const selStyle = { width:"100%", background:"var(--elevated)", border:"1.5px solid var(--border)", borderRadius:"var(--r-sm)", padding:"12px 14px", color:"var(--lavender)", fontFamily:"var(--font-serif)", fontSize:18, cursor:"pointer", outline:"none", appearance:"none", WebkitAppearance:"none" };

const ScheduleScreen = ({ onNext, onBack, step=1, total=5, profile, updateProfile }) => {
  const [wakeTime, setWakeTime] = useState(profile.wakeTime || "7:00 AM");
  const [sleepTime, setSleepTime] = useState(profile.sleepTime || "10:30 PM");
  const [schedule, setSchedule] = useState(profile.schedule || "standard");
  const handleNext = () => {
    updateProfile({ wakeTime, sleepTime, schedule });
    onNext();
  };
  const opts = [
    { id:"standard", label:"Consistent each week", sub:"Same schedule most days" },
    { id:"shift", label:"Shifts or irregular hours", sub:"Rotating or variable schedule" },
    { id:"varies", label:"It varies a lot", sub:"Day-to-day changes frequently" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"52px 28px 40px" }} className="stagger">
      <ProgressHeader step={step} total={total} onBack={onBack} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", paddingTop:28 }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", lineHeight:1.4, marginBottom:8 }}>First — how does your day work?</div>
        <div style={{ fontSize:16, color:"var(--text-3)", marginBottom:28 }}>This shapes when Momentum reaches out to you.</div>
        <div style={{ display:"flex", gap:12, marginBottom:24 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:8, letterSpacing:"0.06em", textTransform:"uppercase" }}>Wake up</div>
            <div style={{ position:"relative" }}>
              <select value={wakeTime} onChange={e => setWakeTime(e.target.value)} style={selStyle}
                onFocus={e => e.target.style.borderColor="var(--lavender)"} onBlur={e => e.target.style.borderColor="var(--border)"}
              >
                {wakeTimes.map(t => <option key={t} value={t} style={{ background:"var(--select-bg)" }}>{t}</option>)}
              </select>
              <div style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", color:"var(--text-3)", fontSize:10, pointerEvents:"none" }}>▾</div>
            </div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:8, letterSpacing:"0.06em", textTransform:"uppercase" }}>Bedtime</div>
            <div style={{ position:"relative" }}>
              <select value={sleepTime} onChange={e => setSleepTime(e.target.value)} style={selStyle}
                onFocus={e => e.target.style.borderColor="var(--lavender)"} onBlur={e => e.target.style.borderColor="var(--border)"}
              >
                {sleepTimes.map(t => <option key={t} value={t} style={{ background:"var(--select-bg)" }}>{t}</option>)}
              </select>
              <div style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", color:"var(--text-3)", fontSize:10, pointerEvents:"none" }}>▾</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize:16, color:"var(--text-2)", marginBottom:12 }}>My schedule is mostly</div>
        <div className="radio-group">
          {opts.map(o => (
            <div key={o.id} className={`radio-item ${schedule===o.id?"selected":""}`} onClick={() => setSchedule(o.id)}>
              <div className="radio-dot" />
              <div>
                <div style={{ fontSize:15, color:schedule===o.id?"var(--lavender)":"var(--text-1)" }}>{o.label}</div>
                <div style={{ fontSize:15, color:"var(--text-3)", marginTop:3 }}>{o.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, paddingTop:16 }}>
        <button className="btn-primary filled" onClick={handleNext}>Save and continue →</button>
        <button className="btn-ghost" onClick={() => onNext()}>Skip for now</button>
      </div>
    </div>
  );
};

// 5 · Training Aim
const AimScreen = ({ onNext, onBack, step=2, total=5, profile, updateProfile }) => {
  const [days, setDays] = useState(profile.trainingDays || 3);
  const captions = {
    1:"One dedicated day. Every deposit counts.",
    2:"Two strong sessions. A solid foundation.",
    3:"Three days builds real consistency.",
    4:"Four days. You are investing seriously.",
    5:"Five days. That is a committed practice.",
    6:"Six days. Make sure recovery is in there.",
    7:"Every day. Movement as a daily practice."
  };
  const handleNext = () => { updateProfile({ trainingDays: days }); onNext(); };
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"52px 28px 40px" }} className="stagger">
      <ProgressHeader step={step} total={total} onBack={onBack} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", paddingTop:28 }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", lineHeight:1.4, marginBottom:8 }}>What feels realistic for you right now?</div>
        <div style={{ fontSize:16, color:"var(--text-3)", lineHeight:1.65, marginBottom:44 }}>This is your starting point — not a commitment, not a judgment. Just where we begin.</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:36, marginBottom:20 }}>
          <button onClick={() => setDays(d => Math.max(1,d-1))} style={{ width:52, height:52, borderRadius:"50%", border:"1.5px solid var(--border)", background:"transparent", color:"var(--text-2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="var(--lavender)"} onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}
          ><Icon name="minus" size={18} /></button>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:72, fontWeight:400, color:"var(--lavender)", lineHeight:1 }}>{days}</div>
            <div style={{ fontSize:16, color:"var(--text-3)", marginTop:6 }}>days per week</div>
          </div>
          <button onClick={() => setDays(d => Math.min(7,d+1))} style={{ width:52, height:52, borderRadius:"50%", border:"1.5px solid var(--border)", background:"transparent", color:"var(--text-2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="var(--lavender)"} onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}
          ><Icon name="plus" size={18} /></button>
        </div>
        <div style={{ textAlign:"center", fontSize:16, color:"var(--text-3)", lineHeight:1.6 }}>{captions[days]}</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, paddingTop:16 }}>
        <button className="btn-primary filled" onClick={handleNext}>Save and continue →</button>
        <button className="btn-ghost" onClick={() => onNext()}>Skip for now</button>
      </div>
    </div>
  );
};

// 6 · Movement
const movementTypes = ["Strength / weights","Running / cardio","Yoga / mobility","Swimming","Cycling","Walking","Team sport","Outdoors / nature","Active play","Work-based movement","Something else"];
const fitnessLevels = [
  { id:"starting", label:"Just starting out" },
  { id:"building", label:"Building a habit" },
  { id:"consistent", label:"Consistently active" },
  { id:"serious", label:"Training seriously" },
  { id:"competing", label:"Competing" },
];

const MovementScreen = ({ onNext, onBack, step=3, total=5, profile, updateProfile }) => {
  const [selected, setSelected] = useState(profile.movements || []);
  const [level, setLevel] = useState(profile.fitnessLevel || null);
  const toggle = (t) => setSelected(s => s.includes(t) ? s.filter(x=>x!==t) : [...s,t]);
  const handleNext = () => { updateProfile({ movements: selected, fitnessLevel: level }); onNext(); };
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"52px 28px 40px", overflowY:"auto" }} className="stagger">
      <ProgressHeader step={step} total={total} onBack={onBack} />
      <div style={{ paddingTop:28, paddingBottom:16 }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", lineHeight:1.4, marginBottom:8 }}>What does training look like for you?</div>
        <div style={{ fontSize:16, color:"var(--text-3)", marginBottom:24 }}>Select everything that fits — even if it changes.</div>
        <div className="checkbox-grid" style={{ marginBottom:28 }}>
          {movementTypes.map(t => (
            <button key={t} className={`checkbox-item ${selected.includes(t)?"checked":""}`} onClick={() => toggle(t)}>
              <div className="checkbox-box">{selected.includes(t) && <Icon name="check" size={11} color="var(--bg)" />}</div>
              <span>{t}</span>
            </button>
          ))}
        </div>
        <div style={{ fontSize:16, color:"var(--text-2)", marginBottom:12 }}>How would you describe your level right now?</div>
        <div className="radio-group" style={{ marginBottom:8 }}>
          {fitnessLevels.map(l => (
            <div key={l.id} className={`radio-item ${level===l.id?"selected":""}`} onClick={() => setLevel(l.id)} style={{ padding:"13px 16px" }}>
              <div className="radio-dot" />
              <div style={{ fontSize:15, color:level===l.id?"var(--lavender)":"var(--text-1)" }}>{l.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:15, color:"var(--text-3)", textAlign:"center", marginTop:8 }}>Whatever you choose, every session counts toward your Independence Account.</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, paddingBottom:8 }}>
        <button className="btn-primary filled" onClick={handleNext}>Save and continue →</button>
        <button className="btn-ghost" onClick={() => onNext()}>Skip for now</button>
      </div>
    </div>
  );
};

// 7 · Tone
const toneOptions = [
  { id:"warm", label:"Warm and conversational", sub:"Like a thoughtful friend" },
  { id:"standard", label:"Clear and straightforward", sub:"Just the information" },
  { id:"precise", label:"Precise and analytical", sub:"Data-forward language" },
];

const ToneScreen = ({ onNext, onBack, step=4, total=5, profile, updateProfile }) => {
  const [tone, setTone] = useState(profile.tone || null);
  const handleNext = () => { if (tone) updateProfile({ tone }); onNext(); };
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"52px 28px 40px" }} className="stagger">
      <ProgressHeader step={step} total={total} onBack={onBack} />
      <div style={{ flex:1, paddingTop:28 }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", lineHeight:1.4, marginBottom:8 }}>How would you like Momentum to speak with you?</div>
        <div style={{ fontSize:16, color:"var(--text-3)", marginBottom:28 }}>You can change this any time in Settings.</div>
        <div className="radio-group">
          {toneOptions.map(o => (
            <div key={o.id} className={`radio-item ${tone===o.id?"selected":""}`} onClick={() => setTone(o.id)}>
              <div className="radio-dot" />
              <div>
                <div style={{ fontSize:15, color:tone===o.id?"var(--lavender)":"var(--text-1)" }}>{o.label}</div>
                <div style={{ fontSize:15, color:"var(--text-3)", marginTop:3 }}>{o.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        <button className="btn-primary filled" onClick={handleNext} disabled={!tone} style={{ opacity:tone?1:0.5 }}>
          {tone ? "Save and continue →" : "Choose one to continue"}
        </button>
        <button className="btn-ghost" onClick={() => onNext()}>Skip for now</button>
      </div>
    </div>
  );
};

// 8 · Notifications (final onboarding step)
const NotificationsScreen = ({ onNext, onBack, step=5, total=5, profile, updateProfile }) => {
  const [notifs, setNotifs] = useState(profile.notifs !== undefined ? profile.notifs : true);
  const handleBegin = () => {
    updateProfile({ notifs });
    onNext();
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"52px 28px 40px" }} className="stagger">
      <ProgressHeader step={step} total={total} onBack={onBack} />
      <div style={{ flex:1, paddingTop:28 }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", lineHeight:1.4, marginBottom:24 }}>Almost there.</div>
        <div className="card" style={{ marginBottom:20 }}>
          <div style={{ fontSize:16, color:"var(--text-2)", lineHeight:1.7, marginBottom:12 }}>Momentum uses three brief check-ins each day — morning, evening, and night.Combined they take about <span style={{ color:"var(--lavender)" }}>8 seconds</span>.</div>
          <div style={{ fontSize:15, color:"var(--text-3)" }}>That is the full daily commitment.</div>
        </div>
        <div style={{ fontSize:15, color:"var(--text-1)", marginBottom:14, fontWeight:500 }}>May we send you gentle reminders?</div>
        <div className="radio-group" style={{ marginBottom:28 }}>
          <div className={`radio-item ${notifs?"selected":""}`} onClick={() => setNotifs(true)}>
            <div className="radio-dot" />
            <div>
              <div style={{ fontSize:15, color:notifs?"var(--lavender)":"var(--text-1)" }}>Yes — remind me gently</div>
              <div style={{ fontSize:15, color:"var(--text-3)", marginTop:3 }}>We'll nudge at your scheduled check-in times</div>
            </div>
          </div>
          <div className={`radio-item ${!notifs?"selected":""}`} onClick={() => setNotifs(false)}>
            <div className="radio-dot" />
            <span style={{ fontSize:15, color:!notifs?"var(--lavender)":"var(--text-1)" }}>I'll check in on my own</span>
          </div>
          <div style={{ padding:"16px 0", borderTop:"1px solid var(--border)" }}>
            <div style={{ fontSize:16, color:"var(--text-3)", lineHeight:1.7 }}>Momentum is also a research project studying how people build lasting movement habits.You can decide whether to contribute <span style={{ color:"var(--lavender)" }}>after your first week</span>.</div>
          </div>
        </div>
      </div>
      <button className="btn-primary filled" onClick={handleBegin} style={{ marginTop:16, fontSize:17, letterSpacing:"0.02em" }}>Begin — Day One</button>
    </div>
  );
};

// ─── APP SCREENS ──────────────────────────────────────────────────────────────
// ── PROGRESS RING ─────────────────────────────────────────────────────────────
const ProgressRing = ({ done, total, size = 48 }) => {
  const r = (size / 2) - 5;
  const circ = Math.PI * 2 * r;
  const pct  = total > 0 ? done / total : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink:0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={3} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--lavender)" strokeWidth={3}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition:"stroke-dashoffset 0.6s ease" }} />
      <text x={size/2} y={size/2 + 5} textAnchor="middle" fontSize={12}
        fill="var(--lavender)" fontFamily="var(--font-sans)" fontWeight="500">{done}/{total}</text>
    </svg>
  );
};

// ── PAGE HEADER (shared by all section pages) ─────────────────────────────────
const PageHeader = ({ label, labelColor = "var(--lavender)", onBack }) => (
  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"max(52px,env(safe-area-inset-top)) 20px 0", flexShrink:0 }}>
    <button onClick={onBack}
      style={{ width:36, height:36, borderRadius:"50%", border:"1px solid var(--border)", background:"none",
        color:"var(--text-2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0, transition:"all 0.2s", fontSize:16 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor="var(--lavender)"; e.currentTarget.style.color="var(--lavender)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)";   e.currentTarget.style.color="var(--text-2)"; }}
    >←</button>
    <div style={{ fontSize:15, color:labelColor, letterSpacing:"0.12em", textTransform:"uppercase" }}>{label}</div>
  </div>
);

// ── COMPACT CHECK-IN ROW ──────────────────────────────────────────────────────
const CheckInPill = ({ entry, setEntry, label, icon, valueKey, hint, options }) => {
  const value = entry[valueKey];
  const opt = options.find(o => o.id === value);
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: hint && !value ? 4 : 8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <Icon name={icon} size={14} color="var(--text-3)" />
          <span style={{ fontSize:16, color:"var(--lavender)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</span>
        </div>
        {value && (
          <button onClick={() => setEntry({ [valueKey]: null })}
            style={{ background:"none", border:"none", color:"var(--text-3)", fontSize:16, cursor:"pointer", fontFamily:"var(--font-sans)", padding:"2px 6px" }}>← undo</button>
        )}
      </div>
      {hint && !value && (
        <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:8, paddingLeft:21, lineHeight:1.4 }}>{hint}</div>
      )}
      {!value ? (
        <div className="checkin-pills">
          {options.map(o => (
            <button key={o.id} className="checkin-pill" onClick={() => setEntry({ [valueKey]: o.id })}>{o.label}</button>
          ))}
        </div>
      ) : (
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:26, height:26, borderRadius:"50%", flexShrink:0,
            background: value==="no"||value==="rest"||value==="tired" ? "var(--border)" : "var(--deep-lav)",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            {value !== "no" && value !== "rest" && <Icon name="check" size={12} color="var(--text-1)" />}
          </div>
          <span style={{ fontSize:16, color:"var(--text-1)" }}>{opt?.label || value}</span>
        </div>
      )}
    </div>
  );
};

// ─── FOUNDING INTENTION MOMENT ────────────────────────────────────────────────
const IntentionMoment = ({ intention, milestone, onDismiss }) => {
  if (!intention || !milestone) return null;
  const messages = {
    7:   { label:"One week in",   line:"You made a promise to yourself." },
    30:  { label:"One month in",  line:"Thirty days of showing up." },
    100: { label:"100 days",      line:"You are building something real." },
    365: { label:"One year",      line:"You said we would return this to you." },
  };
  const { label, line } = messages[milestone] || {};
  return (
    <div style={{ position:"fixed", inset:0, background:"var(--scrim)", backdropFilter:"blur(16px)", zIndex:700, display:"flex", alignItems:"center", justifyContent:"center", padding:"32px" }}>
      <div style={{ width:"100%", maxWidth:360, textAlign:"center" }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:15, color:"var(--gold)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:24 }}>{label}</div>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:20, fontWeight:400, color:"var(--text-2)", lineHeight:1.6, marginBottom:36, fontStyle:"italic" }}>{line}</div>
        <div style={{ background:"var(--elevated)", border:"1px solid rgba(196,168,212,0.3)", borderRadius:"var(--r-lg)", padding:"28px 24px", marginBottom:36 }}>
          <div style={{ fontSize:15, color:"var(--text-3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:14 }}>Your founding intention</div>
          <div style={{ fontFamily:"var(--font-serif)", fontSize:19, fontWeight:400, color:"var(--lavender)", lineHeight:1.65, fontStyle:"italic" }}>"{intention}"</div>
        </div>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:15, fontWeight:400, color:"var(--text-2)", lineHeight:1.6, marginBottom:32 }}>Everything you have done since Day One has been a conversation with the person who wrote those words.</div>
        <button className="btn-primary filled" onClick={onDismiss} style={{ maxWidth:200, margin:"0 auto" }}>Keep going</button>
      </div>
    </div>
  );
};

// ─── SECTION PAGES (full-screen, each scrollable internally) ─────────────────
// ── Inline follow-up picker — appears after a core check-in is answered ────────
const FollowUpPill = ({ label, value, options, onChange }) => (
  <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border)" }}>
    <div style={{ fontSize:14, color:"var(--text-3)", marginBottom:8 }}>{label}</div>
    {!value ? (
      <div className="checkin-pills">
        {options.map(o => (
          <button key={o.id} className="checkin-pill" onClick={() => onChange(o.id)}>{o.label}</button>
        ))}
      </div>
    ) : (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:15, color:"var(--text-1)" }}>{options.find(o => o.id === value)?.label || value}</span>
        <button onClick={() => onChange(null)}
          style={{ background:"none", border:"none", color:"var(--text-3)", fontSize:15, cursor:"pointer", fontFamily:"var(--font-sans)", padding:"2px 6px" }}>← undo</button>
      </div>
    )}
  </div>
);

// ── 1–5 scale picker ───────────────────────────────────────────────────────────
const StarPicker = ({ label, value, onChange }) => (
  <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border)" }}>
    <div style={{ fontSize:14, color:"var(--text-3)", marginBottom:10 }}>{label}</div>
    <div style={{ display:"flex", gap:10, alignItems:"center" }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange(value === n ? null : n)}
          style={{
            width:38, height:38, borderRadius:"50%",
            border:`1.5px solid ${value >= n ? "var(--lavender)" : "var(--border)"}`,
            background: value >= n ? "rgba(196,168,212,0.15)" : "transparent",
            color: value >= n ? "var(--lavender)" : "var(--text-3)",
            fontFamily:"var(--font-sans)", fontSize:16, fontWeight:500,
            cursor:"pointer", transition:"all 0.15s",
            display:"flex", alignItems:"center", justifyContent:"center",
            WebkitTapHighlightColor:"transparent",
          }}
        >{n}</button>
      ))}
      {value != null && (
        <span style={{ fontSize:13, color:"var(--text-3)", marginLeft:4 }}>
          {value <= 1 ? "Very low" : value === 2 ? "Low" : value === 3 ? "Okay" : value === 4 ? "Good" : "Great"}
        </span>
      )}
    </div>
  </div>
);

const LogTodayPage = ({ entry, setEntry, checkIns, profile, onBack }) => {
  const weekDots        = Stats.weekDots(checkIns);
  const todayIdx        = Stats.todayDotIndex();
  const trainedThisWeek = Stats.trainedDays(checkIns, 7);
  const trainingGoal    = profile.trainingDays || 3;
  const trained         = entry.morning === 'yes' || entry.morning === 'already';
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"var(--bg)" }}>
      <PageHeader label="Today's log" labelColor="var(--gold)" onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", padding:"24px 20px 48px" }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", marginBottom:6, lineHeight:1.35 }}>How are you doing today?</div>
        <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:24, lineHeight:1.6 }}>Three quick check-ins — morning, evening, night. Add more detail when you have a moment.</div>
        {/* ── MORNING ── */}
        <div className="card" style={{ marginBottom:12 }}>
          <CheckInPill entry={entry} setEntry={setEntry} label="Morning" icon="sun" valueKey="morning"
            hint="Planning to train today, or did you already get it done?"
            options={[
              {id:"yes",label:"Planning to train"},
              {id:"already",label:"Already did it"},
              {id:"no",label:"Not today"}
            ]} />
          {entry.morning && (
            <StarPicker
              label="How did you sleep last night?"
              value={entry.sleepQuality}
              onChange={v => setEntry({ sleepQuality: v })}
            />
          )}
          {trained && (
            <>
              <FollowUpPill
                label="What kind of movement?"
                value={entry.workoutType}
                options={[
                  {id:"strength",  label:"Strength"},
                  {id:"cardio",    label:"Cardio"},
                  {id:"mobility",  label:"Mobility / yoga"},
                  {id:"walk",      label:"Walk"},
                  {id:"swim",      label:"Swim"},
                  {id:"class",     label:"Class / group"},
                  {id:"other",     label:"Something else"},
                ]}
                onChange={v => setEntry({ workoutType: v })}
              />
              <FollowUpPill
                label="How long?"
                value={entry.workoutDuration}
                options={[
                  {id:"under20",  label:"Under 20 min"},
                  {id:"20to40",   label:"20–40 min"},
                  {id:"40to60",   label:"40–60 min"},
                  {id:"over60",   label:"60+ min"},
                ]}
                onChange={v => setEntry({ workoutDuration: v })}
              />
              <FollowUpPill
                label="How did it feel?"
                value={entry.workoutFeeling}
                options={[
                  {id:"easy",     label:"Easy — could do more"},
                  {id:"right",    label:"Just right"},
                  {id:"hard",     label:"Hard but good"},
                  {id:"toomuch",  label:"Too much today"},
                ]}
                onChange={v => setEntry({ workoutFeeling: v })}
              />
            </>
          )}
        </div>
        {/* ── EVENING ── */}
        <div className="card" style={{ marginBottom:12 }}>
          <CheckInPill entry={entry} setEntry={setEntry} label="Evening" icon="wave" valueKey="evening"
            hint="How did your body actually show up today?"
            options={[
              {id:"good",label:"Felt good"},
              {id:"worked",label:"Worked hard"},
              {id:"pushed",label:"Pushed through"},
              {id:"rest",label:"Rest day"}
            ]} />
          {entry.evening && (
            <>
              <StarPicker
                label="How is your energy right now?"
                value={entry.energyLevel}
                onChange={v => setEntry({ energyLevel: v })}
              />
              <FollowUpPill
                label="Any pain or discomfort today?"
                value={entry.painLevel}
                options={[
                  {id:"none",     label:"None"},
                  {id:"mild",     label:"Mild — manageable"},
                  {id:"moderate", label:"Moderate — noticeable"},
                  {id:"high",     label:"High — affecting movement"},
                ]}
                onChange={v => setEntry({ painLevel: v })}
              />
            </>
          )}
        </div>
        {/* ── NIGHT ── */}
        <div className="card" style={{ marginBottom:24 }}>
          <CheckInPill entry={entry} setEntry={setEntry} label="Night" icon="moon" valueKey="night"
            hint="How recovered do you feel going into tomorrow?"
            options={[
              {id:"recovered",label:"Recovered"},
              {id:"tired",label:"Tired but okay"},
              {id:"fatigued",label:"Quite fatigued"},
              {id:"wired",label:"Wired — hard to wind down"}
            ]} />
          {entry.night && (
            <>
              <StarPicker
                label="How is your mood this evening?"
                value={entry.moodLevel}
                onChange={v => setEntry({ moodLevel: v })}
              />
              <FollowUpPill
                label="How was your stress level today?"
                value={entry.stressLevel}
                options={[
                  {id:"low",      label:"Low — easy day"},
                  {id:"normal",   label:"Normal"},
                  {id:"elevated", label:"Elevated"},
                  {id:"high",     label:"High — a lot on my mind"},
                ]}
                onChange={v => setEntry({ stressLevel: v })}
              />
            </>
          )}
        </div>
        {/* ── WEEK STRIP ── */}
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:14, color:"var(--text-3)", letterSpacing:"0.06em", textTransform:"uppercase" }}>This week</span>
            <span style={{ fontSize:15, color: trainedThisWeek >= trainingGoal ? "var(--sage)" : "var(--lavender)" }}>
              {trainedThisWeek} of {trainingGoal}{trainedThisWeek >= trainingGoal ? " ✓" : ""}
            </span>
          </div>
          <DotStrip days={weekDots} today={todayIdx} />
          <div style={{ display:"flex", gap:14, marginTop:16, paddingTop:10, borderTop:"1px solid var(--border)" }}>
            {[
              [<span style={{width:8,height:8,borderRadius:"50%",background:"var(--deep-lav)",display:"inline-block"}} />, "Trained"],
              [<span style={{width:8,height:8,borderRadius:"50%",border:"1.5px solid var(--lavender)",display:"inline-block"}} />, "Today"],
              [<span style={{width:8,height:8,borderRadius:"50%",border:"1.5px solid var(--silent)",display:"inline-block"}} />, "Not logged"],
            ].map(([dot, lbl]) => (
              <div key={lbl} style={{ display:"flex", alignItems:"center", gap:5 }}>
                {dot}
                <span style={{ fontSize:14, color:"var(--text-3)" }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReflectPage = ({ checkIns, onBack }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [feeling, setFeeling] = useState(null);
  const weekDots  = Stats.weekDots(checkIns, weekOffset);
  const weekNum   = Stats.weekNumber(checkIns) - weekOffset;
  const weekRange = Stats.weekRange(weekOffset);
  const trained   = Stats.trainedDays(checkIns, 7);
  const delta     = weekOffset === 0 ? Stats.trainingDelta(checkIns) : null;
  const recovery  = Stats.recoveryPredictiveness(checkIns);
  const feelings  = ["Better than expected","About right","Harder than I wanted","Complicated"];
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"var(--bg)" }}>
      <PageHeader label="Reflect" labelColor="var(--gold)" onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", padding:"24px 20px 40px" }}>
        {/* Week navigation */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:22, fontWeight:400, color:"var(--text-1)" }}>
              {weekOffset === 0 ? "This week" : weekOffset === -1 ? "Last week" : `${Math.abs(weekOffset)} weeks ago`}
            </div>
            <div style={{ fontSize:16, color:"var(--text-3)", marginTop:2 }}>{weekRange}</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {weekOffset < 0 && (
              <button onClick={() => setWeekOffset(w => w + 1)}
                style={{ padding:"6px 12px", borderRadius:100, border:"1px solid var(--border)", background:"none", color:"var(--text-2)", fontFamily:"var(--font-sans)", fontSize:16, cursor:"pointer" }}>← newer</button>
            )}
            <button onClick={() => setWeekOffset(w => w - 1)}
              style={{ padding:"6px 12px", borderRadius:100, border:"1px solid var(--border)", background:"none", color:"var(--text-2)", fontFamily:"var(--font-sans)", fontSize:16, cursor:"pointer" }}>older →</button>
          </div>
        </div>
        {/* Dot strip */}
        <div className="card" style={{ marginBottom:16 }}>
          <DotStrip days={weekDots} today={weekOffset === 0 ? Stats.todayDotIndex() : -1} />
          <div style={{ fontFamily:"var(--font-serif)", fontSize:20, fontWeight:400, color:"var(--text-1)", marginTop:16, marginBottom:4 }}>
            {trained === 0 ? "No sessions logged yet." : trained === 1 ? "You trained 1 day." : `You trained ${trained} days.`}
          </div>
          {weekNum === 1 && (
            <div style={{ fontSize:15, color:"var(--text-3)", lineHeight:1.55 }}>Week one is a foundation. It becomes a pattern.</div>
          )}
          {delta !== null && delta !== 0 && (
            <div style={{ fontSize:15, marginTop:4, color: delta > 0 ? "var(--sage)" : "var(--rose)" }}>
              {delta > 0 ? `↑ ${delta} more than last week` : `↓ ${Math.abs(delta)} fewer than last week`}
            </div>
          )}
        </div>
        {/* Recovery signal */}
        {recovery !== null && (
          <div style={{ background:"rgba(196,168,212,0.05)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:"16px 18px", marginBottom:16 }}>
            <div style={{ fontSize:15, color:"var(--lavender)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Recovery signal</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:8, marginBottom:6 }}>
              <div style={{ fontFamily:"var(--font-serif)", fontSize:40, fontWeight:400, color:"var(--lavender)", lineHeight:1 }}>{recovery}%</div>
              <div style={{ fontSize:16, color:"var(--text-3)", marginBottom:4, lineHeight:1.4 }}>next-day training rate<br />when recovered at night</div>
            </div>
            <div style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.6 }}>
              {recovery >= 80 ? "An unusually strong signal — your body is telling you something real." : "A meaningful pattern is emerging."}
            </div>
          </div>
        )}
        {/* Self reflection */}
        <div className="card" style={{ marginBottom:16 }}>
          <div style={{ fontSize:15, color:"var(--text-2)", marginBottom:12 }}>How does this week sit with you?</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {feelings.map(f => (
              <button key={f} className={`checkin-pill ${feeling === f ? "selected" : ""}`}
                onClick={() => setFeeling(feeling === f ? null : f)}>{f}</button>
            ))}
          </div>
          {feeling && (
            <div style={{ fontSize:15, color:"var(--text-3)", marginTop:12, lineHeight:1.6, paddingTop:12, borderTop:"1px solid var(--border)" }}>
              {feeling === "Better than expected" && "Something clicked this week. Notice what made it easier and do more of that."}
              {feeling === "About right" && "Consistency over intensity. This is exactly what building looks like."}
              {feeling === "Harder than I wanted" && "Harder weeks are data, not failure. What made it hard? That is the useful question."}
              {feeling === "Complicated" && "Complicated is honest. The log still counts whether it felt good or not."}
            </div>
          )}
        </div>
        <div style={{ fontSize:16, color:"var(--text-3)", textAlign:"center", lineHeight:1.6, padding:"0 16px" }}>Swipe through previous weeks to see how your pattern develops over time.</div>
      </div>
    </div>
  );
};

const InsightsPage = ({ checkIns, onBack }) => {
  const [window, setWindow] = useState(28);
  const [motiOverride, setMotiOverride] = useState(null);
  const adherence    = Stats.adherence(checkIns, window);
  const recovery     = Stats.recoveryPredictiveness(checkIns, window);
  const totalSessions = Stats.totalSessions(checkIns);
  const detectedMoti  = Stats.motivationType(checkIns, window);
  const motiDisplay   = motiOverride || detectedMoti;
  const hasData       = totalSessions >= 3;
  const motiInfo = {
    intrinsic: "You train because it matters to you. The most durable form of motivation — it doesn't depend on circumstances staying the same.",
    external:  "Training because of external structure — a class, a commitment, a person. Useful scaffold. The goal is making the movement itself the reason.",
    habit:     "Training because it's what you do. Automatic. Environmentally triggered. The hardest state to reach and the easiest to maintain.",
  };
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"var(--bg)" }}>
      <PageHeader label="Insights" labelColor="var(--lavender)" onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", padding:"24px 20px 40px" }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", marginBottom:6, lineHeight:1.35 }}>Your numbers.</div>
        <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:20, lineHeight:1.6 }}>Computed from your actual check-ins. Nothing invented.</div>
        {/* Window selector */}
        <div style={{ display:"flex", gap:6, marginBottom:20 }}>
          {[[7,"7d"],[28,"28d"],[90,"90d"]].map(([v,label]) => (
            <button key={v} onClick={() => setWindow(v)}
              style={{ padding:"6px 14px", borderRadius:100, border:`1.5px solid ${window===v?"var(--lavender)":"var(--border)"}`,
                background: window===v ? "rgba(196,168,212,0.1)" : "transparent",
                color: window===v ? "var(--lavender)" : "var(--text-2)",
                fontFamily:"var(--font-sans)", fontSize:15, cursor:"pointer", transition:"all 0.2s" }}>{label}</button>
          ))}
        </div>
        {/* Consistency */}
        <div className="card" style={{ marginBottom:12 }}>
          <div style={{ fontSize:15, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Consistency</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:12 }}>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:44, fontWeight:400, color:"var(--lavender)", lineHeight:1 }}>
              {hasData ? `${adherence}%` : "—"}
            </div>
            {hasData && (
              <span style={{ fontSize:16, color: adherence >= 60 ? "var(--sage)" : "var(--text-3)", marginBottom:4 }}>
                {adherence >= 80 ? "exceptional" : adherence >= 60 ? "building" : adherence >= 40 ? "developing" : "early days"}
              </span>
            )}
          </div>
          <AccountBar pct={hasData ? adherence : 0} label="Check-in rate" sublabel={`last ${window} days`} />
          {!hasData && (
            <div style={{ fontSize:16, color:"var(--text-3)", marginTop:12, lineHeight:1.55 }}>Log 3 or more sessions to see your consistency.</div>
          )}
        </div>
        {/* Recovery signal */}
        {hasData ? (
          <div className="card" style={{ marginBottom:12 }}>
            <div style={{ fontSize:15, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Recovery signal</div>
            {recovery !== null ? (
              <>
                <div style={{ fontFamily:"var(--font-serif)", fontSize:44, fontWeight:400, color:"var(--lavender)", lineHeight:1, marginBottom:8 }}>{recovery}%</div>
                <div style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.6 }}>
                  When you feel recovered at night, you train the next day {recovery}% of the time.
                  {recovery >= 80 ? " An unusually strong signal." : " A meaningful pattern."}
                </div>
              </>
            ) : (
              <div style={{ fontSize:15, color:"var(--text-3)", lineHeight:1.6 }}>Keep logging your night state. This signal appears after a few weeks of consistent data.</div>
            )}
          </div>
        ) : null}
        {/* Motivation explorer */}
        <div className="card" style={{ marginBottom:12 }}>
          <div style={{ fontSize:15, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
            Motivation type{hasData && <span style={{ color:"var(--lavender)", textTransform:"none", letterSpacing:0, marginLeft:8, fontSize:15 }}>· detected: {detectedMoti}</span>}
          </div>
          <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
            {["intrinsic","external","habit"].map(m => (
              <button key={m} onClick={() => setMotiOverride(motiOverride === m ? null : m)}
                style={{ padding:"6px 14px", borderRadius:100, fontSize:16,
                  border:`1.5px solid ${motiDisplay===m?"var(--lavender)":"var(--border)"}`,
                  background:motiDisplay===m?"rgba(196,168,212,0.1)":"transparent",
                  color:motiDisplay===m?"var(--lavender)":"var(--text-2)",
                  cursor:"pointer", fontFamily:"var(--font-sans)", transition:"all 0.2s" }}>{m}</button>
            ))}
          </div>
          <div style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.65 }}>{motiInfo[motiDisplay]}</div>
        </div>
        {/* Research note */}
        <div style={{ padding:"14px 16px", background:"rgba(123,200,164,0.05)", borderRadius:"var(--r-md)", borderLeft:"2px solid var(--sage)" }}>
          <div style={{ fontSize:15, color:"var(--sage)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>About this data</div>
          <div style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.6 }}>All patterns are computed locally from your check-ins. No algorithm interprets your data on a server. What you see is what your own log says.</div>
        </div>
      </div>
    </div>
  );
};

const IndependencePage = ({ checkIns, onBack, onGoLog }) => {
  const totalSessions = Stats.totalSessions(checkIns);
  const daysInApp     = Stats.daysInApp(checkIns);
  const indPct        = Stats.independencePct(checkIns);
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"var(--bg)" }}>
      <PageHeader label="Independence account" labelColor="var(--gold)" onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", padding:"24px 20px 40px" }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", marginBottom:6, lineHeight:1.35 }}>Every session is a deposit.</div>
        <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:24, lineHeight:1.6 }}>Physical capacity — muscle, cardiovascular health, mobility — compounds over decades. The independence that matters most at 70 is built by what you do today.</div>
        {totalSessions === 0 ? (
          <>
            <div style={{ background:"rgba(196,168,212,0.05)", border:"1px solid rgba(196,168,212,0.15)", borderRadius:"var(--r-lg)", padding:"24px 20px", marginBottom:16, textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-serif)", fontSize:18, fontWeight:400, color:"var(--text-2)", marginBottom:8, lineHeight:1.55 }}>Your account opens with your first session.</div>
              <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:20, lineHeight:1.55 }}>Log a morning check-in — "Planning to train" or "Already did it" — to make your first deposit.</div>
              <button onClick={onGoLog}
                style={{ padding:"11px 24px", borderRadius:100, border:"1.5px solid var(--lavender)", background:"rgba(196,168,212,0.1)", color:"var(--lavender)", fontFamily:"var(--font-sans)", fontSize:16, cursor:"pointer", transition:"all 0.2s" }}>Go to today's log →</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                ["Muscle preservation","Each session preserves the strength that keeps you independent at 70, 80, 90."],
                ["Cardiovascular capacity","Your heart and lungs. The engine of everything else. Built session by session."],
                ["Functional mobility","The ability to move freely. Bend, reach, carry, climb. The last thing you want to lose."],
              ].map(([lbl, desc]) => (
                <div key={lbl} style={{ padding:"16px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--r-md)" }}>
                  <div style={{ fontSize:16, color:"var(--text-1)", marginBottom:4 }}>{lbl}</div>
                  <div style={{ fontSize:15, color:"var(--text-3)", lineHeight:1.55 }}>{desc}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Sessions counter */}
            <div style={{ display:"flex", justifyContent:"space-around", padding:"20px 0", marginBottom:20, background:"var(--surface)", borderRadius:"var(--r-lg)", border:"1px solid var(--border)" }}>
              {[[totalSessions,"sessions"],[daysInApp,"days in"],[`${indPct}%`,"of 10yr goal"]].map(([v,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-serif)", fontSize:32, fontWeight:400, color:"var(--lavender)", lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:15, color:"var(--text-3)", marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
            {/* Account bars */}
            <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:20 }}>
              {[
                ["Muscle preservation",      indPct,                   "Each session slows the loss."],
                ["Cardiovascular capacity",  Math.round(indPct * 0.85),"The engine of everything else."],
                ["Functional mobility",       Math.round(indPct * 1.1), "Bend, reach, carry, climb."],
              ].map(([label, pct, note]) => (
                <div key={label} style={{ padding:"16px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--r-md)" }}>
                  <AccountBar pct={Math.max(pct, 1)} label={label} sublabel={`${Math.max(pct,1)}%`} />
                  <div style={{ fontSize:16, color:"var(--text-3)", marginTop:10, lineHeight:1.5 }}>{note}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:"14px 16px", background:"rgba(212,184,150,0.06)", borderRadius:"var(--r-md)", borderLeft:"2px solid var(--gold)" }}>
              <div style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.65 }}>
                The 10-year goal is 1,095 sessions — roughly 3 per week for a decade. You are {indPct}% of the way there.
                {totalSessions < 50 ? " Every single one counts." : " You are building something real."}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const PatternPage = ({ checkIns, onBack }) => {
  const [motiOverride, setMotiOverride] = useState(null);
  const totalSessions = Stats.totalSessions(checkIns);
  const adherence     = Stats.adherence(checkIns, 28);
  const recovery      = Stats.recoveryPredictiveness(checkIns);
  const detectedMoti  = Stats.motivationType(checkIns, 28);
  const motiDisplay   = motiOverride || detectedMoti;
  const hasData       = totalSessions >= 3;
  const phenotype = (() => {
    if (!hasData) return { name:"Still building", desc:"Log a few more sessions to reveal your behavioral pattern. Patterns need data to emerge." };
    if (recovery !== null && recovery >= 75) return { name:"Recovery-responsive", desc:"You listen to your body. When you feel recovered, you show up. That attunement becomes a durability asset over time." };
    if (detectedMoti === "habit")    return { name:"Habit-builder",         desc:"Movement is becoming automatic. Less a decision, more just what you do. The most durable form of consistency." };
    if (detectedMoti === "external") return { name:"Accountability-driven", desc:"External structures are supporting your training. The long game is building intrinsic motivation underneath them." };
    return { name:"Intention-led", desc:"You show up because it matters. That intrinsic foundation is the most durable thing a training practice can be built on." };
  })();
  const motiInfo = {
    intrinsic: "Training because it matters to you personally. The most durable form — it doesn't depend on circumstances staying the same.",
    external:  "Training because of external structure — a class, a commitment, a person. Useful scaffold. The goal is making the movement itself the reason.",
    habit:     "Training because it's what you do. Automatic. Environmentally triggered. The hardest state to reach and the easiest to maintain.",
  };
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"var(--bg)" }}>
      <PageHeader label="Your pattern" labelColor="var(--lavender)" onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", padding:"24px 20px 40px" }}>
        <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--text-1)", marginBottom:6, lineHeight:1.35 }}>What your data says.</div>
        <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:24, lineHeight:1.6 }}>Behavioral patterns are detected from check-in sequences over time — not from what you said about yourself during onboarding.</div>
        {/* Phenotype */}
        <div style={{ background:"var(--elevated)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:"22px 20px", marginBottom:16 }}>
          <div style={{ fontSize:15, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Behavioral pattern</div>
          <div style={{ fontFamily:"var(--font-serif)", fontSize:26, fontWeight:400, color:"var(--text-1)", marginBottom:8 }}>{phenotype.name}</div>
          <div style={{ fontSize:16, color:"var(--text-2)", lineHeight:1.65 }}>{phenotype.desc}</div>
        </div>
        {/* Consistency */}
        {hasData && (
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ fontSize:15, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>28-day consistency</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:10, marginBottom:12 }}>
              <div style={{ fontFamily:"var(--font-serif)", fontSize:40, fontWeight:400, color:"var(--lavender)", lineHeight:1 }}>{adherence}%</div>
              <span style={{ fontSize:16, color: adherence >= 60 ? "var(--sage)" : "var(--text-3)", marginBottom:4 }}>
                {adherence >= 80 ? "exceptional" : adherence >= 60 ? "building" : adherence >= 40 ? "developing" : "early days"}
              </span>
            </div>
            <AccountBar pct={adherence} label="Check-in adherence" sublabel="28 days" />
          </div>
        )}
        {/* Motivation explorer */}
        <div className="card" style={{ marginBottom:16 }}>
          <div style={{ fontSize:15, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Motivation type</div>
          {hasData && (
            <div style={{ fontSize:16, color:"var(--lavender)", marginBottom:12 }}>Detected from your data: {detectedMoti}</div>
          )}
          <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
            {["intrinsic","external","habit"].map(m => (
              <button key={m} onClick={() => setMotiOverride(motiOverride === m ? null : m)}
                style={{ padding:"6px 14px", borderRadius:100, fontSize:16,
                  border:`1.5px solid ${motiDisplay===m?"var(--lavender)":"var(--border)"}`,
                  background:motiDisplay===m?"rgba(196,168,212,0.1)":"transparent",
                  color:motiDisplay===m?"var(--lavender)":"var(--text-2)",
                  cursor:"pointer", fontFamily:"var(--font-sans)", transition:"all 0.2s" }}>{m}</button>
            ))}
          </div>
          <div style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.65 }}>{motiInfo[motiDisplay]}</div>
        </div>
        {/* Recovery */}
        {recovery !== null && (
          <div style={{ padding:"16px 18px", background:"rgba(196,168,212,0.05)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", marginBottom:16 }}>
            <div style={{ fontSize:15, color:"var(--lavender)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Recovery signal</div>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:36, fontWeight:400, color:"var(--lavender)", marginBottom:6, lineHeight:1 }}>{recovery}%</div>
            <div style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.6 }}>
              When you feel recovered at night, you train the next day {recovery}% of the time. {recovery >= 75 ? "Your body and behaviour are well-aligned." : "A pattern worth paying attention to."}
            </div>
          </div>
        )}
        {!hasData && (
          <div style={{ fontSize:15, color:"var(--text-3)", lineHeight:1.65, textAlign:"center", padding:"0 16px" }}>Your behavioral pattern emerges from the data. Three sessions starts it. Twenty sessions reveals it.</div>
        )}
      </div>
    </div>
  );
};

// ── Mini dot strip for tile preview ──────────────────────────────────────────
const MiniDots = ({ dots, todayIdx }) => (
  <div style={{ display:"flex", gap:5, alignItems:"center", margin:"8px 0 6px" }}>
    {dots.map((d, i) => {
      const isToday   = i === todayIdx;
      const isTrained = d === 1;
      const isFuture  = d === -1;
      return (
        <div key={i} style={{
          width:7, height:7, borderRadius:"50%", flexShrink:0,
          background: isTrained ? "var(--deep-lav)" : "transparent",
          border: isToday ? "1.5px solid var(--lavender)" : isFuture ? "none" : "1.5px solid var(--silent)",
          boxShadow: isTrained ? "0 0 5px rgba(139,111,168,0.5)" : "none",
          opacity: isFuture ? 0.2 : 1,
        }} />
      );
    })}
  </div>
);

// ── Mini progress bar for tile preview ───────────────────────────────────────
const MiniBar = ({ pct, color = "var(--deep-lav)" }) => (
  <div style={{ height:3, borderRadius:2, background:"var(--border)", overflow:"hidden", margin:"8px 0 4px" }}>
    <div style={{ height:"100%", borderRadius:2, background:color, width:`${Math.max(pct,1)}%`, transition:"width 1s ease" }} />
  </div>
);

// ── Tile button wrapper ───────────────────────────────────────────────────────
const Tile = ({ id, accentColor, onOpen, children }) => (
  <button onClick={e => onOpen(id, e)}
    style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)",
      padding:"14px 14px 12px", cursor:"pointer", textAlign:"left", display:"flex",
      flexDirection:"column", overflow:"hidden", transition:"border-color 0.2s",
      WebkitTapHighlightColor:"transparent" }}
    onMouseEnter={e => e.currentTarget.style.borderColor = accentColor}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
  >{children}</button>
);

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
const HomeScreen = ({ entry, setEntry, profile, checkIns, updateProfile, onGoSettings }) => {
  const containerRef = useRef(null);
  // Hero expand state
  const [active, setActive]         = useState(null);  // 'log' | 'reflect' | 'insights' | 'independence' | 'pattern'
  const [origin, setOrigin]         = useState(null);  // { top, left, width, height } px in .app coords
  const [expanded, setExpanded]     = useState(false); // controls CSS transition
  const [contentOn, setContentOn]   = useState(false); // fade in content after box expands
  const [dismissed, setDismissed]   = useState(false);
  const milestone     = Stats.intentionMilestone(checkIns);
  const showIntention = !!milestone && !!profile.foundingIntention && !dismissed;
  // Stats for tile previews
  const name           = profile.name || "";
  const hour           = new Date().getHours();
  const greeting       = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr        = new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
  const totalSessions  = Stats.totalSessions(checkIns);
  const trainedThisWeek = Stats.trainedDays(checkIns, 7);
  const trainingGoal   = profile.trainingDays || 3;
  const adherence      = Stats.adherence(checkIns, 28);
  const indPct         = Stats.independencePct(checkIns);
  const weekNum        = Stats.weekNumber(checkIns);
  const detectedMoti   = Stats.motivationType(checkIns, 28);
  const recovery       = Stats.recoveryPredictiveness(checkIns);
  const hasData        = totalSessions >= 3;
  const todayLogged    = ['morning','evening','night'].filter(k => entry[k]).length;
  const phenotypeName = (() => {
    if (!hasData) return "Building";
    if (recovery !== null && recovery >= 75) return "Recovery-responsive";
    if (detectedMoti === "habit")    return "Habit-builder";
    if (detectedMoti === "external") return "Accountability-driven";
    return "Intention-led";
  })();
  // Open a tile with hero expand from the clicked element's position
  const openTile = (id, e) => {
    const el      = e.currentTarget;
    const elRect  = el.getBoundingClientRect();
    const appEl   = containerRef.current;
    const appRect = appEl.getBoundingClientRect();
    setOrigin({
      top:    elRect.top    - appRect.top,
      left:   elRect.left   - appRect.left,
      width:  elRect.width,
      height: elRect.height,
    });
    setActive(id);
    setExpanded(false);
    setContentOn(false);
    // Double rAF: first frame sets initial position, second triggers transition
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setExpanded(true);
      setTimeout(() => setContentOn(true), 320);
    }));
  };
  const closeTile = () => {
    setContentOn(false);
    setTimeout(() => setExpanded(false), 60);
    setTimeout(() => { setActive(null); setOrigin(null); }, 400);
  };
  const delta        = Stats.trainingDelta(checkIns);
  const weekDots     = Stats.weekDots(checkIns);
  const todayDotIdx  = Stats.todayDotIndex();
  const daysInApp    = Stats.daysInApp(checkIns);
  return (
    <>
      {showIntention && (
        <IntentionMoment intention={profile.foundingIntention} milestone={milestone} onDismiss={() => setDismissed(true)} />
      )}
      {/* ── HOME — fixed height, no scroll ── */}
      <div ref={containerRef} style={{
        height:"100%", display:"flex", flexDirection:"column", overflow:"hidden",
        padding:`max(52px,env(safe-area-inset-top)) 18px max(18px,env(safe-area-inset-bottom))`,
        position:"relative",
      }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexShrink:0 }}>
          <div>
            <div style={{ fontSize:13, color:"var(--text-3)", marginBottom:3 }}>{dateStr}</div>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:26, fontWeight:400, color:"var(--text-1)", lineHeight:1.2 }}>
              {greeting}{name ? `, ${name}` : ""}.
            </div>
          </div>
          <button onClick={onGoSettings}
            style={{ padding:"8px 10px", background:"none", border:"1px solid var(--border)", borderRadius:12, color:"var(--text-2)", cursor:"pointer", transition:"all 0.2s", flexShrink:0, marginTop:4 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--lavender)"; e.currentTarget.style.color="var(--lavender)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text-2)"; }}
          ><Icon name="gear" size={17} /></button>
        </div>
        {/* Today row — tappable, opens LogToday page */}
        <button onClick={e => openTile("log", e)}
          style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", background:"var(--surface)",
            border:"1px solid var(--border)", borderRadius:"var(--r-lg)", marginBottom:10, cursor:"pointer",
            textAlign:"left", flexShrink:0, transition:"border-color 0.2s",
            WebkitTapHighlightColor:"transparent" }}
          onMouseEnter={e => e.currentTarget.style.borderColor="var(--gold)"}
          onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}
        >
          <ProgressRing done={todayLogged} total={3} size={42} />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:3 }}>Today's log</div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              {[{ key:"morning", icon:"☀", label:"Morning" },{ key:"evening", icon:"〜", label:"Evening" },{ key:"night",   icon:"◑", label:"Night"   },].map(({ key, icon, label }) => (
                <div key={key} style={{ display:"flex", alignItems:"center", gap:3 }}>
                  <span style={{ fontSize:13, opacity: entry[key] ? 1 : 0.35 }}>{icon}</span>
                  <span style={{ fontSize:13, color: entry[key] ? "var(--text-2)" : "var(--text-3)", textDecoration: entry[key] ? "none" : "none" }}>{entry[key] ? "✓" : "·"}</span>
                </div>
              ))}
              <span style={{ fontSize:13, color:"var(--text-3)", marginLeft:2 }}>
                {todayLogged === 3 ? "— all done" : todayLogged === 0 ? "— tap to log" : "— tap to continue"}
              </span>
            </div>
          </div>
          <span style={{ color:"var(--text-3)", fontSize:15 }}>→</span>
        </button>
        {/* 2×2 tile grid — fills remaining space */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, flex:1, minHeight:0 }}>
          {/* ── REFLECT TILE ── */}
          <Tile id="reflect" accentColor="var(--gold)" onOpen={openTile}>
            <div style={{ fontSize:13, color:"var(--gold)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>Reflect</div>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:26, fontWeight:400, color:"var(--text-1)", lineHeight:1.15 }}>Week {weekNum}</div>
            <MiniDots dots={weekDots} todayIdx={todayDotIdx} />
            <div style={{ fontSize:13, color:"var(--text-1)", marginBottom:2 }}>
              {trainedThisWeek} <span style={{ color:"var(--text-3)" }}>of {trainingGoal} sessions</span>
            </div>
            {delta !== 0 ? (
              <div style={{ fontSize:13, color: delta > 0 ? "var(--sage)" : "var(--rose)", marginTop:2 }}>
                {delta > 0 ? `↑ ${delta} more than last week` : `↓ ${Math.abs(delta)} fewer than last week`}
              </div>
            ) : (
              <div style={{ fontSize:13, color:"var(--text-3)", marginTop:2 }}>Same as last week</div>
            )}
          </Tile>
          {/* ── INSIGHTS TILE ── */}
          <Tile id="insights" accentColor="var(--lavender)" onOpen={openTile}>
            <div style={{ fontSize:13, color:"var(--lavender)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>Insights</div>
            {hasData ? (
              <>
                <div style={{ display:"flex", alignItems:"flex-end", gap:4, marginBottom:2 }}>
                  <div style={{ fontFamily:"var(--font-serif)", fontSize:28, fontWeight:400, color:"var(--lavender)", lineHeight:1 }}>{adherence}%</div>
                  <div style={{ fontSize:13, color:"var(--text-3)", marginBottom:3 }}>consistency</div>
                </div>
                <MiniBar pct={adherence} color="var(--deep-lav)" />
                <div style={{ fontSize:13, color:"var(--text-2)", marginTop:3, marginBottom:2 }}>
                  {adherence >= 80 ? "Exceptional discipline" : adherence >= 60 ? "Building strongly" : adherence >= 40 ? "Developing" : "Early days"}
                </div>
                {recovery !== null && (
                  <div style={{ fontSize:13, color:"var(--text-3)", marginTop:2 }}>Recovery signal: <span style={{ color:"var(--text-2)" }}>{recovery}%</span></div>
                )}
                <div style={{ fontSize:13, color:"var(--text-3)", marginTop:3 }}>{detectedMoti} motivation</div>
              </>
            ) : (
              <>
                <div style={{ fontFamily:"var(--font-serif)", fontSize:26, fontWeight:400, color:"var(--text-3)", lineHeight:1, marginBottom:6 }}>—</div>
                <div style={{ fontSize:13, color:"var(--text-3)", lineHeight:1.5 }}>Your consistency score, recovery signal, and motivation type appear here after a few sessions.</div>
              </>
            )}
          </Tile>
          {/* ── INDEPENDENCE TILE ── */}
          <Tile id="independence" accentColor="var(--gold)" onOpen={openTile}>
            <div style={{ fontSize:13, color:"var(--gold)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>Independence</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:4, marginBottom:2 }}>
              <div style={{ fontFamily:"var(--font-serif)", fontSize:28, fontWeight:400, color:"var(--text-1)", lineHeight:1 }}>{totalSessions}</div>
              <div style={{ fontSize:13, color:"var(--text-3)", marginBottom:3 }}>sessions</div>
            </div>
            <MiniBar pct={indPct} color="var(--amber)" />
            <div style={{ fontSize:13, color:"var(--text-3)", marginBottom:3 }}>{indPct}% of 10-year goal</div>
            <div style={{ fontSize:13, color:"var(--text-2)", marginTop:2 }}>
              {totalSessions === 0? "Opens with first session": daysInApp < 14? "Foundation building": daysInApp < 60? "Early momentum": "Compounding"}
            </div>
            {totalSessions > 0 && (
              <div style={{ fontSize:13, color:"var(--text-3)", marginTop:3 }}>{daysInApp} day{daysInApp !== 1 ? "s" : ""} active</div>
            )}
          </Tile>
          {/* ── YOUR PATTERN TILE ── */}
          <Tile id="pattern" accentColor="var(--lavender)" onOpen={openTile}>
            <div style={{ fontSize:13, color:"var(--lavender)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>Your Pattern</div>
            {hasData ? (
              <>
                <div style={{ fontFamily:"var(--font-serif)", fontSize:18, fontWeight:400, color:"var(--text-1)", lineHeight:1.25, marginBottom:6, flex:1 }}>{phenotypeName}</div>
                <div style={{ fontSize:13, color:"var(--text-3)", marginBottom:3 }}>Motivation: <span style={{ color:"var(--text-2)" }}>{detectedMoti}</span></div>
                {recovery !== null && (
                  <div style={{ fontSize:13, color:"var(--text-3)", marginBottom:3 }}>Recovery→training: <span style={{ color:"var(--text-2)" }}>{recovery}%</span></div>
                )}
                <div style={{ fontSize:13, color:"var(--text-3)" }}>{adherence}% <span style={{ color:"var(--text-3)" }}>check-in rate</span></div>
              </>
            ) : (
              <>
                <div style={{ fontFamily:"var(--font-serif)", fontSize:18, fontWeight:400, color:"var(--text-3)", lineHeight:1.3, marginBottom:6, flex:1 }}>Still building</div>
                <div style={{ fontSize:13, color:"var(--text-3)", lineHeight:1.5 }}>Behavioral pattern, motivation type, and recovery signal appear after a few sessions.</div>
              </>
            )}
          </Tile>
        </div>
      </div>
      {/* ── HERO EXPAND OVERLAY ── */}
      {active && origin && (
        <div style={{
          position:"absolute",
          top:      expanded ? 0         : origin.top,
          left:     expanded ? 0         : origin.left,
          width:    expanded ? "100%"    : origin.width,
          height:   expanded ? "100%"    : origin.height,
          borderRadius: expanded ? 0    : "var(--r-lg)",
          background:"var(--bg)",
          zIndex:200,
          overflow:"hidden",
          transition:"top 0.38s cubic-bezier(0.4,0,0.2,1), left 0.38s cubic-bezier(0.4,0,0.2,1), width 0.38s cubic-bezier(0.4,0,0.2,1), height 0.38s cubic-bezier(0.4,0,0.2,1), border-radius 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <div style={{ opacity: contentOn ? 1 : 0, transition:"opacity 0.25s ease", height:"100%", overflow:"hidden" }}>
            {active === "log" && <LogTodayPage entry={entry} setEntry={setEntry} checkIns={checkIns} profile={profile} onBack={closeTile} />}
            {active === "reflect" && <ReflectPage checkIns={checkIns} onBack={closeTile} />}
            {active === "insights" && <InsightsPage checkIns={checkIns} onBack={closeTile} />}
            {active === "independence" && <IndependencePage checkIns={checkIns} onBack={closeTile} onGoLog={() => { closeTile(); setTimeout(() => {}, 400); }} />}
            {active === "pattern" && <PatternPage checkIns={checkIns} onBack={closeTile} />}
          </div>
        </div>
      )}
    </>
  );
};

// SETTINGS
const SettingsScreen = ({ profile, updateProfile, appState, onReset, onBack }) => {
  const [wakeTime, setWakeTime] = useState(profile.wakeTime || "7:00 AM");
  const [sleepTime, setSleepTime] = useState(profile.sleepTime || "10:30 PM");
  const [schedule, setSchedule] = useState(profile.schedule || "standard");
  const [trainingDays, setTrainingDays] = useState(profile.trainingDays || 3);
  const [tone, setTone] = useState(profile.tone || "warm");
  const [notifs, setNotifs] = useState(profile.notifs !== undefined ? profile.notifs : true);
  const [research, setResearch] = useState(profile.research || false);
  const [movements, setMovements] = useState(profile.movements || []);
  const [saved, setSaved] = useState(false);
  const [savedMsg, setSavedMsg] = useState("Saved");
  const [section, setSection] = useState(null);
  const [modal, setModal] = useState(null); // 'privacy' | 'delete'
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const toggleMovement = (t) => setMovements(s => s.includes(t) ? s.filter(x=>x!==t) : [...s,t]);
  const showToast = (msg = "Saved") => {
    setSavedMsg(msg);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const handleSave = (updates) => {
    updateProfile(updates);
    showToast("Saved");
    setSection(null);
  };
  const handleExport = () => {
    try {
      const data = JSON.stringify(appState, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `momentum-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Data exported");
    } catch {
      showToast("Copied to clipboard");
    }
  };
  const handleDeleteAccount = () => {
    if (deleteConfirm.toLowerCase() !== "delete") return;
    Storage.clear();
    onReset();
  };
  const SectionHeader = ({ id, label, value }) => (
    <button onClick={() => setSection(section===id?null:id)} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"17px 20px", fontFamily:"var(--font-sans)", textAlign:"left", minHeight:56 }}>
      <span style={{ fontSize:15, color:"var(--text-1)" }}>{label}</span>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:15, color:"var(--lavender)" }}>{value}</span>
        <span style={{ color:"var(--text-3)", fontSize:16, transform:section===id?"rotate(180deg)":"none", transition:"0.2s", display:"inline-block" }}>↓</span>
      </div>
    </button>
  );
  const toneLabels = { warm:"Warm & conversational", standard:"Clear & straightforward", precise:"Precise & analytical" };
  const schedLabels = { standard:"Consistent", shift:"Shifts / irregular", varies:"Varies a lot" };
  const checkInCount = Object.keys(appState?.checkIns || {}).length;
  const dataCategories = [
    { label:"Daily check-ins",      detail:`${checkInCount} days logged`,                                          stored:"On your device",   why:"Your Insights, Reflect, and Independence Account — all powered by this." },
    { label:"Profile preferences",  detail:"Schedule, tone, training aim",                                         stored:"On your device",   why:"Personalising the app to your life and goals." },
    { label:"Founding intention",    detail:profile.foundingIntention ? "1 entry" : "Not set",                    stored:"On your device",   why:"Returned to you at milestones. Never read by anyone else." },
    { label:"Research data",         detail:research ? "Contributing anonymised patterns" : "Not contributing",    stored:research ? "Aggregated only" : "Not shared", why:"Only if you opt in. Anonymised aggregate patterns only. You are never identified." },
  ];
  return (
    <div style={{ height:"100%", overflowY:"auto" }}>
      <div style={{ padding:"52px 24px 24px" }} className="stagger">
        <div style={{ fontSize:15, color:"var(--lavender)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Preferences</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
          <div style={{ fontFamily:"var(--font-serif)", fontSize:28, fontWeight:400, color:"var(--text-1)" }}>Settings</div>
          {onBack && (
            <button onClick={onBack}
              style={{ padding:"8px 16px", background:"none", border:"1px solid var(--border)", borderRadius:100, color:"var(--text-2)", fontFamily:"var(--font-sans)", fontSize:15, cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="var(--lavender)"; e.currentTarget.style.color="var(--lavender)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)";   e.currentTarget.style.color="var(--text-2)"; }}>← Back</button>
          )}
        </div>
        {/* Appearance */}
        <div className="card" style={{ marginBottom:10, padding:0, overflow:"hidden" }}>
          <SectionHeader id="appearance" label="Appearance" value={profile.theme === 'light' ? 'Light' : 'Dark'} />
          {section==="appearance" && (
            <div style={{ padding:"0 20px 20px", borderTop:"1px solid var(--border)" }}>
              <div style={{ fontSize:16, color:"var(--text-3)", marginTop:16, marginBottom:14, lineHeight:1.55 }}>Light mode uses a soft lavender background — easier on the eye in bright conditions. Dark mode is better in low light.</div>
              <div className="radio-group">
                {[{ id:"dark",  icon:"☾", label:"Dark",  sub:"Deep purple — easier in low light" },{ id:"light", icon:"☀", label:"Light", sub:"Soft lavender — easier in bright conditions" },].map(o => (
                  <div key={o.id}
                    className={`radio-item ${(profile.theme||'dark')===o.id?"selected":""}`}
                    onClick={() => updateProfile({ theme: o.id })}
                  >
                    <div className="radio-dot" />
                    <div>
                      <div style={{ fontSize:16, color:(profile.theme||'dark')===o.id?"var(--lavender)":"var(--text-1)", display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:18 }}>{o.icon}</span> {o.label}
                      </div>
                      <div style={{ fontSize:15, color:"var(--text-3)", marginTop:3 }}>{o.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Schedule */}
        <div className="card" style={{ marginBottom:10, padding:0, overflow:"hidden" }}>
          <SectionHeader id="schedule" label="Daily schedule" value={schedLabels[schedule]} />
          {section==="schedule" && (
            <div style={{ padding:"0 20px 20px", borderTop:"1px solid var(--border)" }}>
              <div style={{ display:"flex", gap:12, marginTop:16, marginBottom:16 }}>
                {[["Wake up", wakeTimes, wakeTime, setWakeTime],["Bedtime", sleepTimes, sleepTime, setSleepTime]].map(([label, opts, val, setter]) => (
                  <div key={label} style={{ flex:1 }}>
                    <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:8 }}>{label}</div>
                    <select value={val} onChange={e => setter(e.target.value)} style={{ width:"100%", background:"var(--elevated)", border:"1px solid var(--border)", borderRadius:"var(--r-sm)", padding:"11px 12px", color:"var(--lavender)", fontFamily:"var(--font-sans)", fontSize:16, cursor:"pointer", outline:"none" }}>
                      {opts.map(t => <option key={t} value={t} style={{ background:"var(--elevated)" }}>{t}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="radio-group" style={{ marginBottom:16 }}>
                {[{id:"standard",label:"Consistent each week"},{id:"shift",label:"Shifts or irregular"},{id:"varies",label:"It varies a lot"}].map(o => (
                  <div key={o.id} className={`radio-item ${schedule===o.id?"selected":""}`} onClick={() => setSchedule(o.id)} style={{ padding:"12px 16px" }}>
                    <div className="radio-dot" />
                    <span style={{ fontSize:16, color:schedule===o.id?"var(--lavender)":"var(--text-1)" }}>{o.label}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => handleSave({ wakeTime, sleepTime, schedule })}>Save changes</button>
            </div>
          )}
        </div>
        {/* Training aim */}
        <div className="card" style={{ marginBottom:10, padding:0, overflow:"hidden" }}>
          <SectionHeader id="aim" label="Training aim" value={`${trainingDays} days / week`} />
          {section==="aim" && (
            <div style={{ padding:"16px 20px 20px", borderTop:"1px solid var(--border)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:32, marginBottom:20 }}>
                <button onClick={() => setTrainingDays(d => Math.max(1,d-1))} style={{ width:44, height:44, borderRadius:"50%", border:"1.5px solid var(--border)", background:"transparent", color:"var(--text-2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="minus" size={16} /></button>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-serif)", fontSize:52, fontWeight:400, color:"var(--lavender)", lineHeight:1 }}>{trainingDays}</div>
                  <div style={{ fontSize:15, color:"var(--text-3)", marginTop:4 }}>days per week</div>
                </div>
                <button onClick={() => setTrainingDays(d => Math.min(7,d+1))} style={{ width:44, height:44, borderRadius:"50%", border:"1.5px solid var(--border)", background:"transparent", color:"var(--text-2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="plus" size={16} /></button>
              </div>
              <button className="btn-primary" onClick={() => handleSave({ trainingDays })}>Save changes</button>
            </div>
          )}
        </div>
        {/* Movement types */}
        <div className="card" style={{ marginBottom:10, padding:0, overflow:"hidden" }}>
          <SectionHeader id="movement" label="Training types" value={`${movements.length} selected`} />
          {section==="movement" && (
            <div style={{ padding:"16px 20px 20px", borderTop:"1px solid var(--border)" }}>
              <div className="checkbox-grid" style={{ marginBottom:16 }}>
                {movementTypes.map(t => (
                  <button key={t} className={`checkbox-item ${movements.includes(t)?"checked":""}`} onClick={() => toggleMovement(t)} style={{ fontSize:16 }}>
                    <div className="checkbox-box">{movements.includes(t) && <Icon name="check" size={10} color="var(--bg)" />}</div>
                    <span>{t}</span>
                  </button>
                ))}
              </div>
              <button className="btn-primary" onClick={() => handleSave({ movements })}>Save changes</button>
            </div>
          )}
        </div>
        {/* Language & tone */}
        <div className="card" style={{ marginBottom:10, padding:0, overflow:"hidden" }}>
          <SectionHeader id="tone" label="Language and tone" value={toneLabels[tone]} />
          {section==="tone" && (
            <div style={{ padding:"16px 20px 20px", borderTop:"1px solid var(--border)" }}>
              <div className="radio-group" style={{ marginBottom:16 }}>
                {toneOptions.map(o => (
                  <div key={o.id} className={`radio-item ${tone===o.id?"selected":""}`} onClick={() => setTone(o.id)}>
                    <div className="radio-dot" />
                    <div>
                      <div style={{ fontSize:16, color:tone===o.id?"var(--lavender)":"var(--text-1)" }}>{o.label}</div>
                      <div style={{ fontSize:16, color:"var(--text-3)", marginTop:2 }}>{o.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => handleSave({ tone })}>Save changes</button>
            </div>
          )}
        </div>
        {/* Reminders */}
        <div className="card" style={{ marginBottom:10, padding:0, overflow:"hidden" }}>
          <SectionHeader id="notifs" label="Reminders" value={notifs?"On":"Off"} />
          {section==="notifs" && (
            <div style={{ padding:"16px 20px 20px", borderTop:"1px solid var(--border)" }}>
              <div className="radio-group" style={{ marginBottom:16 }}>
                <div className={`radio-item ${notifs?"selected":""}`} onClick={() => setNotifs(true)}>
                  <div className="radio-dot" />
                  <span style={{ fontSize:16, color:notifs?"var(--lavender)":"var(--text-1)" }}>Yes — remind me gently</span>
                </div>
                <div className={`radio-item ${!notifs?"selected":""}`} onClick={() => setNotifs(false)}>
                  <div className="radio-dot" />
                  <span style={{ fontSize:16, color:!notifs?"var(--lavender)":"var(--text-1)" }}>I'll check in on my own</span>
                </div>
              </div>
              <button className="btn-primary" onClick={() => handleSave({ notifs })}>Save changes</button>
            </div>
          )}
        </div>
        {/* Research */}
        <div className="card" style={{ marginBottom:10, padding:0, overflow:"hidden" }}>
          <SectionHeader id="research" label="Research contribution" value={research?"Contributing":"Not yet"} />
          {section==="research" && (
            <div style={{ padding:"16px 20px 20px", borderTop:"1px solid var(--border)" }}>
              <div style={{ fontSize:16, color:"var(--text-2)", lineHeight:1.7, marginBottom:16 }}>Momentum is a research project studying how people build lasting movement habits. Contributing means your anonymised, aggregated behavioral data joins the dataset. You will never be identified. You can withdraw at any time.</div>
              <div className="radio-group" style={{ marginBottom:16 }}>
                <div className={`radio-item ${research?"selected":""}`} onClick={() => setResearch(true)}>
                  <div className="radio-dot" />
                  <div>
                    <div style={{ fontSize:16, color:research?"var(--lavender)":"var(--text-1)" }}>Yes — contribute to research</div>
                    <div style={{ fontSize:16, color:"var(--text-3)", marginTop:2 }}>Your patterns help understand everyone's</div>
                  </div>
                </div>
                <div className={`radio-item ${!research?"selected":""}`} onClick={() => setResearch(false)}>
                  <div className="radio-dot" />
                  <span style={{ fontSize:16, color:!research?"var(--lavender)":"var(--text-1)" }}>Not right now</span>
                </div>
              </div>
              <button className="btn-primary" onClick={() => handleSave({ research })}>Save changes</button>
            </div>
          )}
        </div>
        {/* Account */}
        <div style={{ marginTop:28, marginBottom:28 }}>
          <div style={{ fontSize:15, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Account</div>
          <button onClick={() => setModal("privacy")} style={{ width:"100%", background:"none", border:"none", borderBottom:"1px solid var(--border)", padding:"16px 0", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontFamily:"var(--font-sans)", color:"var(--text-2)", fontSize:15, textAlign:"left" }}>Privacy controls<span style={{ color:"var(--text-3)" }}>→</span></button>
          <button onClick={handleExport} style={{ width:"100%", background:"none", border:"none", borderBottom:"1px solid var(--border)", padding:"16px 0", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontFamily:"var(--font-sans)", color:"var(--text-2)", fontSize:15, textAlign:"left" }}>Export my data<span style={{ color:"var(--text-3)" }}>↓</span></button>
          <button onClick={() => { setDeleteConfirm(""); setModal("delete"); }} style={{ width:"100%", background:"none", border:"none", padding:"16px 0", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontFamily:"var(--font-sans)", color:"var(--rose)", fontSize:15, textAlign:"left" }}>Delete account<span style={{ color:"var(--rose)", opacity:0.5 }}>→</span></button>
        </div>
        <div style={{ fontSize:16, color:"var(--text-3)", textAlign:"center", lineHeight:1.7, marginBottom:24 }}>Momentum · Your data is yours<br />momentum.app/transparency</div>
        {/* ── PRIVACY MODAL ── */}
        {modal === "privacy" && (
          <div style={{ position:"fixed", inset:0, background:"var(--scrim)", backdropFilter:"blur(12px)", zIndex:500, display:"flex", alignItems:"flex-end" }}
            onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
            <div style={{ width:"100%", maxWidth:420, margin:"0 auto", background:"var(--elevated)", borderRadius:"24px 24px 0 0", border:"1px solid var(--border)", borderBottom:"none", maxHeight:"82vh", display:"flex", flexDirection:"column", animation:"staggerIn 0.25s ease forwards" }}>
              {/* Fixed header */}
              <div style={{ padding:"28px 24px 0", flexShrink:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                  <div>
                    <div style={{ fontSize:15, color:"var(--lavender)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Privacy</div>
                    <div style={{ fontFamily:"var(--font-serif)", fontSize:22, fontWeight:400, color:"var(--text-1)" }}>Your data, explained</div>
                  </div>
                  <button onClick={() => setModal(null)} style={{ background:"none", border:"1px solid var(--border)", borderRadius:10, padding:"6px 10px", color:"var(--text-3)", cursor:"pointer", fontFamily:"var(--font-sans)", fontSize:15 }}>✕</button>
                </div>
                <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:16, lineHeight:1.55 }}>Momentum asks for three data points each day. Here is exactly what each one is, why we collect it, and how it is used.</div>
                <div style={{ height:1, background:"var(--border)" }} />
              </div>
              {/* Scrollable body */}
              <div style={{ overflowY:"auto", padding:"16px 24px 0", flex:1 }}>
                {/* Why we collect data */}
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:16, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Why we collect anything at all</div>
                  <div style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.7 }}>Momentum has two purposes: helping you build lasting habits, and contributing to research on how people do that across different life stages. The data you log is the engine of both. Without it, the insights screen would be empty and the research would have nothing to study.</div>
                </div>
                {/* Data categories */}
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:16, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>What is collected and why</div>
                  {dataCategories.map((cat, i) => (
                    <div key={i} style={{ padding:"14px 0", borderBottom: i < dataCategories.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                        <div style={{ fontSize:16, color:"var(--text-1)", fontWeight:500 }}>{cat.label}</div>
                        <div style={{ fontSize:15, color:"var(--sage)", flexShrink:0, marginLeft:12, marginTop:2 }}>{cat.stored}</div>
                      </div>
                      <div style={{ fontSize:15, color:"var(--text-3)", lineHeight:1.55, marginBottom:cat.why ? 6 : 0 }}>{cat.detail}</div>
                      {cat.why && <div style={{ fontSize:16, color:"var(--lavender)", lineHeight:1.5, paddingLeft:0 }}>Used for: {cat.why}</div>}
                    </div>
                  ))}
                </div>
                {/* Research contribution toggle */}
                <div style={{ background:"rgba(196,168,212,0.05)", border:"1px solid var(--border)", borderRadius:"var(--r-md)", padding:"16px", marginBottom:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div style={{ flex:1, paddingRight:12 }}>
                      <div style={{ fontSize:15, color:"var(--text-1)", marginBottom:4 }}>Research contribution</div>
                      <div style={{ fontSize:16, color:"var(--text-3)", lineHeight:1.55 }}>If enabled, your anonymised check-in patterns join the research dataset. You are never identified. Individual data is never shared. You can change this any time in Settings.</div>
                    </div>
                    <div style={{ fontSize:15, color: research ? "var(--sage)" : "var(--text-3)", flexShrink:0 }}>{research ? "On" : "Off"}</div>
                  </div>
                  <button onClick={() => { setModal(null); setSection("research"); }}
                    style={{ background:"rgba(196,168,212,0.08)", border:"1px solid var(--lavender)", borderRadius:"var(--r-md)", padding:"10px 18px", color:"var(--lavender)", fontFamily:"var(--font-sans)", fontSize:15, cursor:"pointer", transition:"all 0.2s", display:"block", width:"100%" }}>Change research setting in Settings →</button>
                </div>
                {/* Guarantees */}
                <div style={{ padding:"14px 16px", background:"rgba(123,200,164,0.06)", borderRadius:"var(--r-md)", borderLeft:"2px solid var(--sage)", marginBottom:20 }}>
                  <div style={{ fontSize:16, color:"var(--sage)", marginBottom:6 }}>Our commitments</div>
                  {["Individual data shared with third parties: zero","No advertising. No data brokers. Ever.","You can export or delete everything at any time.","Research insights are published openly, never sold."].map((g, i) => (
                    <div key={i} style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.55, marginBottom: i < 3 ? 4 : 0 }}>· {g}</div>
                  ))}
                </div>
                <div style={{ fontSize:16, color:"var(--text-3)", textAlign:"center", marginBottom:8 }}>momentum.app/transparency</div>
              </div>
              {/* Fixed footer */}
              <div style={{ padding:"14px 24px", flexShrink:0, borderTop:"1px solid var(--border)", paddingBottom:"max(20px, env(safe-area-inset-bottom))" }}>
                <button className="btn-primary filled" style={{ width:"100%", minHeight:50, borderRadius:"var(--r-md)", border:"none", background:"var(--lavender)", color:"var(--bg)", fontFamily:"var(--font-sans)", fontSize:15, fontWeight:500, cursor:"pointer" }} onClick={() => setModal(null)}>Done</button>
              </div>
            </div>
          </div>
        )}
        {/* ── DELETE MODAL ── */}
        {modal === "delete" && (
          <div style={{ position:"fixed", inset:0, background:"var(--scrim)", backdropFilter:"blur(14px)", zIndex:500, display:"flex", alignItems:"flex-end" }}
            onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
            <div style={{ width:"100%", maxWidth:420, margin:"0 auto", background:"var(--elevated)", borderRadius:"24px 24px 0 0", border:"1px solid rgba(196,119,122,0.3)", borderBottom:"none", padding:"32px 28px 52px", animation:"staggerIn 0.25s ease forwards" }}>
              <div style={{ fontFamily:"var(--font-serif)", fontSize:24, fontWeight:400, color:"var(--rose)", marginBottom:8 }}>Delete account</div>
              <div style={{ fontSize:16, color:"var(--text-2)", lineHeight:1.65, marginBottom:28 }}>This will permanently delete all your check-ins, preferences, and founding intention. This cannot be undone.</div>
              <div style={{ marginBottom:8 }}>
                <div style={{ fontSize:15, color:"var(--text-3)", marginBottom:10 }}>Type <span style={{ color:"var(--text-1)", fontFamily:"var(--font-serif)", letterSpacing:"0.05em" }}>delete</span> to confirm</div>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={e => setDeleteConfirm(e.target.value)}
                  placeholder="delete"
                  autoCapitalize="none"
                  style={{ width:"100%", background:"var(--surface)", border:`1.5px solid ${deleteConfirm.toLowerCase()==="delete" ? "var(--rose)" : "var(--border)"}`, borderRadius:"var(--r-md)", padding:"14px 16px", color:"var(--text-1)", fontFamily:"var(--font-sans)", fontSize:15, outline:"none", marginBottom:16, transition:"border-color 0.2s" }}
                />
              </div>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirm.toLowerCase() !== "delete"}
                style={{ width:"100%", minHeight:52, padding:"14px 24px", borderRadius:"var(--r-md)", border:"1.5px solid var(--rose)", background: deleteConfirm.toLowerCase()==="delete" ? "rgba(196,119,122,0.15)" : "transparent", color:"var(--rose)", fontFamily:"var(--font-sans)", fontSize:15, fontWeight:500, cursor: deleteConfirm.toLowerCase()==="delete" ? "pointer" : "not-allowed", opacity: deleteConfirm.toLowerCase()==="delete" ? 1 : 0.4, transition:"all 0.2s", marginBottom:10 }}>Delete everything permanently</button>
              <button className="btn-ghost" onClick={() => setModal(null)}>Cancel — keep my account</button>
            </div>
          </div>
        )}
        {/* Saved toast */}
        {saved && (
          <div style={{ position:"fixed", bottom:100, left:"50%", transform:"translateX(-50%)", background:"var(--elevated)", border:"1px solid var(--sage)", borderRadius:100, padding:"11px 22px", display:"flex", alignItems:"center", gap:8, zIndex:600, animation:"staggerIn 0.2s ease forwards" }}>
            <Icon name="check" size={15} color="var(--sage)" />
            <span style={{ fontSize:16, color:"var(--sage)", fontFamily:"var(--font-sans)" }}>{savedMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav = ({ active, onNav }) => {
  const items = [
    { id:"today",     icon:"sun",   label:"Today"     },
    { id:"reflect",   icon:"wave",  label:"Reflect"   },
    { id:"insights",  icon:"chart", label:"Insights"  },
    { id:"settings",  icon:"gear",  label:"Settings"  },
    { id:"community", icon:"users", label:"Community" },
  ];
  return (
    <nav className="nav">
      {items.map(item => (
        <button key={item.id} className={`nav-item ${active===item.id?"active":""}`} onClick={() => onNav(item.id)}>
          <Icon name={item.icon} size={20} />
          <span style={{ fontSize:10 }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
const LoadingScreen = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", flexDirection:"column", gap:16 }}>
    <div style={{ fontFamily:"var(--font-serif)", fontSize:36, color:"var(--lavender)", letterSpacing:"0.15em" }}>M</div>
    <div style={{ fontSize:15, color:"var(--text-3)" }}>Loading…</div>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function MomentumApp() {
  const [appState, setAppState] = useState(defaultState);
  const [loaded, setLoaded]     = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  useEffect(() => {
    Storage.load().then(saved => {
      if (saved) setAppState(prev => ({ ...prev, ...saved }));
      setLoaded(true);
    });
  }, []);
  useEffect(() => {
    if (!loaded) return;
    Storage.save(appState);
  }, [appState, loaded]);
  const updateState   = useCallback((updates) => setAppState(prev => ({ ...prev, ...updates })), []);
  const updateProfile = useCallback((updates) => setAppState(prev => ({ ...prev, userProfile: { ...prev.userProfile, ...updates } })), []);
  const updateCheckIn = useCallback((date, updates) => {
    const key = dateKey(date);
    setAppState(prev => ({ ...prev, checkIns: { ...prev.checkIns, [key]: { ...prev.checkIns[key], ...updates } } }));
  }, []);
  const flow = ["philosophy","intention","signin","schedule","aim","movement","tone","notifications"];
  const next = () => {
    const { screen } = appState;
    if (screen === "notifications") {
      updateState({ inApp:true, screen:"app" });
      return;
    }
    const idx = flow.indexOf(screen);
    if (idx >= 0 && idx < flow.length - 1) updateState({ screen: flow[idx + 1] });
  };
  const prev = () => {
    const { screen } = appState;
    const idx = flow.indexOf(screen);
    if (idx > 0) updateState({ screen: flow[idx - 1] });
  };
  const { screen, inApp, userProfile, checkIns } = appState;
  const theme         = userProfile.theme || 'dark';
  const todayEntry    = checkIns[dateKey()] || {};
  const setTodayEntry = (updates) => updateCheckIn(new Date(), updates);
  const toggleTheme   = useCallback(() => updateProfile({ theme: theme === 'dark' ? 'light' : 'dark' }), [theme, updateProfile]);
  // Keep body background in sync so it matches outside .app on wide screens
  useEffect(() => {
    document.body.style.background = theme === 'light' ? '#F0EBF8' : '#0F0D14';
  }, [theme]);
  if (!loaded) return (
    <>
      <FontLoader />
      <style>{tokens}</style>
      <div className="app">
        <LoadingScreen />
      </div>
    </>
  );
  return (
    <>
      <FontLoader />
      <style>{tokens}</style>
      <div className="noise-overlay" />
      <div className={`app theme-${theme}`}>
        {/* ── ONBOARDING ── */}
        {!inApp && (
          <>
            <div className={`screen ${screen==="philosophy"?"active":""}`}>
              <PhilosophyScreen onNext={next} theme={theme} onThemeToggle={toggleTheme} />
            </div>
            <div className={`screen ${screen==="intention"?"active":""}`}>
              <IntentionScreen onNext={next} onBack={prev} onSave={v => updateProfile({ foundingIntention: v })} />
            </div>
            <div className={`screen ${screen==="signin"?"active":""}`}>
              <SignInScreen onNext={next} onBack={prev} onSave={v => updateProfile(v)} />
            </div>
            <div className={`screen ${screen==="schedule"?"active":""}`}>
              <ScheduleScreen onNext={next} onBack={prev} step={1} total={5} profile={userProfile} updateProfile={updateProfile} />
            </div>
            <div className={`screen ${screen==="aim"?"active":""}`}>
              <AimScreen onNext={next} onBack={prev} step={2} total={5} profile={userProfile} updateProfile={updateProfile} />
            </div>
            <div className={`screen ${screen==="movement"?"active":""}`}>
              <MovementScreen onNext={next} onBack={prev} step={3} total={5} profile={userProfile} updateProfile={updateProfile} />
            </div>
            <div className={`screen ${screen==="tone"?"active":""}`}>
              <ToneScreen onNext={next} onBack={prev} step={4} total={5} profile={userProfile} updateProfile={updateProfile} />
            </div>
            <div className={`screen ${screen==="notifications"?"active":""}`}>
              <NotificationsScreen onNext={next} onBack={prev} step={5} total={5} profile={userProfile} updateProfile={updateProfile} />
            </div>
            {screen !== "philosophy" && (
              <button onClick={() => updateState({ inApp:true, screen:"app" })}
                style={{ position:"fixed", bottom:20, right:20, padding:"9px 16px", borderRadius:100, background:"rgba(196,168,212,0.08)", border:"1px solid var(--border)", color:"var(--text-3)", fontSize:16, cursor:"pointer", fontFamily:"var(--font-sans)", zIndex:1000 }}>Skip to app →</button>
            )}
          </>
        )}
        {/* ── IN APP: single screen with settings overlay ── */}
        {inApp && (
          <>
            {/* Home screen — always mounted, hidden when settings open */}
            <div className="screen" style={{ opacity: showSettings ? 0 : 1, pointerEvents: showSettings ? "none" : "all", transition:"opacity 0.25s ease" }}>
              <HomeScreen
                entry={todayEntry}
                setEntry={setTodayEntry}
                profile={userProfile}
                checkIns={checkIns}
                updateProfile={updateProfile}
                onGoSettings={() => setShowSettings(true)}
              />
            </div>
            {/* Settings — slides in from right */}
            <div className="screen" style={{ opacity: showSettings ? 1 : 0, pointerEvents: showSettings ? "all" : "none", transition:"opacity 0.25s ease", transform: showSettings ? "none" : "translateX(24px)" }}>
              <SettingsScreen
                profile={userProfile}
                updateProfile={updateProfile}
                appState={appState}
                onBack={() => setShowSettings(false)}
                onReset={() => { Storage.clear(); setAppState(defaultState); setShowSettings(false); }}
              />
            </div>
            {/* Dev reset */}
            <button
              onClick={() => { Storage.clear(); setAppState(defaultState); setShowSettings(false); }}
              style={{ position:"fixed", bottom:20, right:20, padding:"7px 12px", borderRadius:100, background:"rgba(196,168,212,0.05)", border:"1px solid var(--border)", color:"var(--text-3)", fontSize:15, cursor:"pointer", fontFamily:"var(--font-sans)", zIndex:1000, opacity:0.35 }}
              title="Reset app (dev)">↺ reset</button>
          </>
        )}
      </div>
    </>
  );
}
