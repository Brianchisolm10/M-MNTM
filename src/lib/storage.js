const STORAGE_KEY = 'momentum_app_state';

export const defaultAppState = {
  screen: 'philosophy',
  inApp: false,
  navScreen: 'today',
  userProfile: {
    name: 'Alex',
    wakeTime: '7:00 AM',
    sleepTime: '10:30 PM',
    schedule: 'standard',
    trainingDays: 3,
    tone: 'warm',
    notifs: true,
    research: false,
    movements: ['Walking — for me', 'Strength / weights'],
    foundingIntention: '',
  },
  checkIns: {}, // { dateKey: { morning, evening, night } }
};

export const loadState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return defaultAppState;
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
};

export const exportData = () => {
  const state = loadState();
  const dataStr = JSON.stringify(state, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `momentum-export-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        saveState(imported);
        resolve(imported);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

export const clearData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
