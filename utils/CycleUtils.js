// cycleUtils.js

// Helper: get difference in days between two dates
export const getDayDifference = (startDate, endDate) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((endDate - startDate) / msPerDay);
};

// Returns current day in the cycle (1 to cycleLength)
export const getCurrentDayInCycle = (lastPeriodStart, cycleLength = 28) => {
  const now = new Date();
  const start = new Date(lastPeriodStart);
  const diff = getDayDifference(start, now);
  return (diff % cycleLength) + 1; // +1 because cycle starts from day 1
};

// Returns the current phase based on the day in cycle
export const getCurrentPhase = (day) => {
  if (day >= 1 && day <= 5) return "Menstrual";
  if (day >= 6 && day <= 13) return "Follicular";
  if (day >= 14 && day <= 17) return "Ovulation";
  if (day >= 18 && day <= 28) return "Luteal";
  return "Unknown";
};

// Days until ovulation (from today)
export const getDaysUntilOvulation = (currentDay) => {
  if (currentDay >= 14 && currentDay <= 17) return 0; // Already in ovulation
  if (currentDay < 14) return 14 - currentDay;
  return 28 - currentDay + 14; // wrap around
};

// Days until period ends (only if currently in Menstrual phase)
export const getDaysUntilPeriodEnds = (currentDay) => {
  return currentDay >= 1 && currentDay <= 5 ? 5 - currentDay : null;
};

// Days until next period (always returns how far day 1 is)
export const getDaysUntilNextPeriod = (currentDay, cycleLength = 28) => {
  return cycleLength - currentDay;
};
