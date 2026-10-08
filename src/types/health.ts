export type ScreenType = 'home' | 'activity' | 'sleep' | 'profile';

export interface WorkoutLog {
  id: string;
  type: 'running' | 'walking' | 'cycling' | 'strength' | 'swimming' | 'yoga';
  name: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  avgHeartRate: number;
  timestamp: string;
}

export interface DayActivityData {
  dayName: string; // '월', '화', '수', '목', '금', '토', '일'
  dateStr: string;
  steps: number;
  stepGoal: number;
  calories: number;
  sleepHours: number;
  activeMinutes: number;
}

export interface SleepRecord {
  date: string;
  bedTime: string; // "23:15"
  wakeTime: string; // "06:50"
  totalMinutes: number;
  deepMinutes: number;
  remMinutes: number;
  lightMinutes: number;
  awakeMinutes: number;
  sleepScore: number;
  hrv: number; // ms
  respiratoryRate: number; // breaths/min
}

export interface UserGoals {
  dailySteps: number;
  dailyCalories: number;
  dailySleepHours: number;
  dailyWaterMl: number;
  targetWeightKg: number;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  avatarUrl: string;
  tier: string;
  connectedDevices: {
    name: string;
    type: string;
    battery: number;
    syncedAt: string;
    connected: boolean;
  }[];
}

export interface TodayVitals {
  steps: number;
  activeCalories: number;
  basalCalories: number;
  totalCalories: number;
  distanceKm: number;
  activeTimeMinutes: number;
  waterMl: number;
  currentHeartRate: number;
  restingHeartRate: number;
  maxHeartRate: number;
  stressLevel: number; // 0-100
  readinessScore: number; // 0-100
}
