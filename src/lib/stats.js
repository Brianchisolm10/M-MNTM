import { dateKey, addDays } from './date';

export const adherencePct = (checkIns, days = 28) => {
  if (!checkIns || Object.keys(checkIns).length === 0) return 0;
  
  let count = 0;
  let total = 0;
  
  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), -i);
    const key = dateKey(date);
    total++;
    
    if (checkIns[key]?.morning) {
      count++;
    }
  }
  
  return total > 0 ? Math.round((count / total) * 100) : 0;
};

export const trainedCount = (checkIns, days = 7) => {
  if (!checkIns) return 0;
  
  let count = 0;
  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), -i);
    const key = dateKey(date);
    const entry = checkIns[key];
    
    if (entry?.morning === 'yes' || entry?.morning === 'already') {
      count++;
    }
  }
  
  return count;
};

export const recoveryPredictiveness = (checkIns, days = 28) => {
  if (!checkIns) return 0;
  
  let recoveredNextTrained = 0;
  let recoveredTotal = 0;
  
  for (let i = 1; i < days; i++) {
    const prevDate = addDays(new Date(), -i);
    const prevKey = dateKey(prevDate);
    const prevEntry = checkIns[prevKey];
    
    if (prevEntry?.night === 'recovered') {
      recoveredTotal++;
      
      const nextDate = addDays(prevDate, 1);
      const nextKey = dateKey(nextDate);
      const nextEntry = checkIns[nextKey];
      
      if (nextEntry?.morning === 'yes' || nextEntry?.morning === 'already') {
        recoveredNextTrained++;
      }
    }
  }
  
  return recoveredTotal > 0 ? Math.round((recoveredNextTrained / recoveredTotal) * 100) : 0;
};

export const weeklyStats = (checkIns) => {
  if (!checkIns) return { trained: 0, days: [] };
  
  const weekDates = [];
  for (let i = 6; i >= 0; i--) {
    weekDates.push(addDays(new Date(), -i));
  }
  
  const days = weekDates.map(date => {
    const key = dateKey(date);
    const entry = checkIns[key];
    
    if (!entry?.morning) return -1; // empty
    if (entry.morning === 'yes' || entry.morning === 'already') return 1; // trained
    return 0; // not trained
  });
  
  const trained = days.filter(d => d === 1).length;
  
  return { trained, days };
};

export const consistencyTrend = (checkIns, timeRange = 28) => {
  const pct = adherencePct(checkIns, timeRange);
  
  if (timeRange === 7) {
    return { pct, label: '6 of 7 days this week.' };
  }
  if (timeRange === 28) {
    return { pct, label: '3 of 4 intentions followed through on average.' };
  }
  return { pct, label: 'Consistent over 3 months — a real pattern.' };
};

export const trainingWindow = (checkIns, days = 28) => {
  if (!checkIns) return null;
  
  const times = {};
  
  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), -i);
    const key = dateKey(date);
    const entry = checkIns[key];
    
    if (entry?.morning === 'yes' || entry?.morning === 'already') {
      const hour = Math.floor(Math.random() * 24); // placeholder
      const timeSlot = `${hour}-${hour + 1}`;
      times[timeSlot] = (times[timeSlot] || 0) + 1;
    }
  }
  
  if (Object.keys(times).length === 0) return null;
  
  const mostCommon = Object.entries(times).sort((a, b) => b[1] - a[1])[0][0];
  return mostCommon;
};

export const motivationType = (checkIns, days = 28) => {
  if (!checkIns) return 'intrinsic';
  
  let intrinsic = 0;
  let external = 0;
  let habit = 0;
  
  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), -i);
    const key = dateKey(date);
    const entry = checkIns[key];
    
    if (entry?.morning === 'yes') intrinsic++;
    if (entry?.morning === 'already') habit++;
    if (entry?.evening === 'worked' || entry?.evening === 'pushed') external++;
  }
  
  if (habit > intrinsic && habit > external) return 'habit';
  if (external > intrinsic) return 'external';
  return 'intrinsic';
};
