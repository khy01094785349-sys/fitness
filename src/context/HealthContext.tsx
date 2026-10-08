import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScreenType, WorkoutLog, DayActivityData, SleepRecord, UserGoals, UserProfile, TodayVitals } from '../types/health';

interface HealthContextType {
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType) => void;
  userProfile: UserProfile;
  goals: UserGoals;
  todayVitals: TodayVitals;
  sleepRecord: SleepRecord;
  weeklyData: DayActivityData[];
  workouts: WorkoutLog[];
  addSteps: (delta: number) => void;
  addWater: (deltaMl: number) => void;
  addWorkout: (workout: Omit<WorkoutLog, 'id' | 'timestamp'>) => void;
  deleteWorkout: (id: string) => void;
  updateGoals: (newGoals: Partial<UserGoals>) => void;
  updateSleep: (newSleep: Partial<SleepRecord>) => void;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  quickLogOpen: boolean;
  setQuickLogOpen: (open: boolean) => void;
  resetToDefaults: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: '김민준',
  age: 29,
  gender: '남성',
  heightCm: 178,
  weightKg: 72.4,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  tier: 'PRO VITALITY',
  connectedDevices: [
    { name: 'Galaxy Watch 6 Pro', type: '스마트워치', battery: 84, syncedAt: '방금 전', connected: true },
    { name: '스마트 체성분계 S4', type: '체성분계', battery: 92, syncedAt: '오늘 아침 07:15', connected: true }
  ]
};

const DEFAULT_GOALS: UserGoals = {
  dailySteps: 10000,
  dailyCalories: 2200,
  dailySleepHours: 8,
  dailyWaterMl: 2500,
  targetWeightKg: 70.0
};

const DEFAULT_VITALS: TodayVitals = {
  steps: 8420,
  activeCalories: 640,
  basalCalories: 1200,
  totalCalories: 1840,
  distanceKm: 5.8,
  activeTimeMinutes: 58,
  waterMl: 1750,
  currentHeartRate: 72,
  restingHeartRate: 58,
  maxHeartRate: 154,
  stressLevel: 24, // low
  readinessScore: 88
};

const DEFAULT_SLEEP: SleepRecord = {
  date: '2026-10-07',
  bedTime: '23:15',
  wakeTime: '06:50',
  totalMinutes: 455, // 7h 35m
  deepMinutes: 108, // 1h 48m (24%)
  remMinutes: 98,   // 1h 38m (22%)
  lightMinutes: 225,// 3h 45m (49%)
  awakeMinutes: 24, // 24m (5%)
  sleepScore: 89,
  hrv: 68,
  respiratoryRate: 14.2
};

const DEFAULT_WORKOUTS: WorkoutLog[] = [
  {
    id: 'w-1',
    type: 'running',
    name: '모닝 한강 조깅',
    durationMinutes: 35,
    caloriesBurned: 340,
    distanceKm: 4.8,
    avgHeartRate: 146,
    timestamp: '오전 07:20'
  },
  {
    id: 'w-2',
    type: 'walking',
    name: '점심 산책 & 파워 워킹',
    durationMinutes: 23,
    caloriesBurned: 110,
    distanceKm: 1.9,
    avgHeartRate: 104,
    timestamp: '오후 12:45'
  },
  {
    id: 'w-3',
    type: 'strength',
    name: '퇴근 후 하체 근력 루틴',
    durationMinutes: 45,
    caloriesBurned: 290,
    avgHeartRate: 132,
    timestamp: '오후 18:30'
  }
];

const DEFAULT_WEEKLY: DayActivityData[] = [
  { dayName: '금', dateStr: '10.02', steps: 10240, stepGoal: 10000, calories: 2350, sleepHours: 7.8, activeMinutes: 65 },
  { dayName: '토', dateStr: '10.03', steps: 12850, stepGoal: 10000, calories: 2680, sleepHours: 8.5, activeMinutes: 82 },
  { dayName: '일', dateStr: '10.04', steps: 8940, stepGoal: 10000, calories: 1980, sleepHours: 8.0, activeMinutes: 42 },
  { dayName: '월', dateStr: '10.05', steps: 11200, stepGoal: 10000, calories: 2420, sleepHours: 7.2, activeMinutes: 68 },
  { dayName: '화', dateStr: '10.06', steps: 9850, stepGoal: 10000, calories: 2150, sleepHours: 7.5, activeMinutes: 52 },
  { dayName: '수', dateStr: '10.07', steps: 8420, stepGoal: 10000, calories: 1840, sleepHours: 7.6, activeMinutes: 58 },
  { dayName: '목', dateStr: '10.08', steps: 3200, stepGoal: 10000, calories: 820, sleepHours: 7.2, activeMinutes: 20 },
];

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('kh_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [goals, setGoals] = useState<UserGoals>(() => {
    const saved = localStorage.getItem('kh_user_goals');
    return saved ? JSON.parse(saved) : DEFAULT_GOALS;
  });

  const [todayVitals, setTodayVitals] = useState<TodayVitals>(() => {
    const saved = localStorage.getItem('kh_today_vitals');
    return saved ? JSON.parse(saved) : DEFAULT_VITALS;
  });

  const [sleepRecord, setSleepRecord] = useState<SleepRecord>(() => {
    const saved = localStorage.getItem('kh_sleep_record');
    return saved ? JSON.parse(saved) : DEFAULT_SLEEP;
  });

  const [weeklyData, setWeeklyData] = useState<DayActivityData[]>(() => {
    const saved = localStorage.getItem('kh_weekly_data');
    return saved ? JSON.parse(saved) : DEFAULT_WEEKLY;
  });

  const [workouts, setWorkouts] = useState<WorkoutLog[]>(() => {
    const saved = localStorage.getItem('kh_workouts');
    return saved ? JSON.parse(saved) : DEFAULT_WORKOUTS;
  });

  const [quickLogOpen, setQuickLogOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kh_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('kh_user_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('kh_today_vitals', JSON.stringify(todayVitals));
  }, [todayVitals]);

  useEffect(() => {
    localStorage.setItem('kh_sleep_record', JSON.stringify(sleepRecord));
  }, [sleepRecord]);

  useEffect(() => {
    localStorage.setItem('kh_workouts', JSON.stringify(workouts));
  }, [workouts]);

  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addSteps = (delta: number) => {
    setTodayVitals((prev) => {
      const newSteps = Math.max(0, prev.steps + delta);
      const addedKm = parseFloat(((delta * 0.7) / 1000).toFixed(2));
      const addedCalories = Math.round(delta * 0.04);
      const newTotalCalories = prev.totalCalories + addedCalories;
      const newActiveCalories = prev.activeCalories + addedCalories;
      const progress = Math.min(100, Math.round((newSteps / goals.dailySteps) * 100));
      // Readiness score dynamic slight boost
      const newReadiness = Math.min(99, Math.round(80 + (progress * 0.18)));

      return {
        ...prev,
        steps: newSteps,
        distanceKm: parseFloat((prev.distanceKm + addedKm).toFixed(2)),
        totalCalories: newTotalCalories,
        activeCalories: newActiveCalories,
        readinessScore: newReadiness
      };
    });

    // Also update Wednesday in weekly data
    setWeeklyData((prev) =>
      prev.map((d) => (d.dayName === '수' ? { ...d, steps: d.steps + delta } : d))
    );
  };

  const addWater = (deltaMl: number) => {
    setTodayVitals((prev) => ({
      ...prev,
      waterMl: Math.max(0, prev.waterMl + deltaMl)
    }));
  };

  const addWorkout = (workout: Omit<WorkoutLog, 'id' | 'timestamp'>) => {
    const newLog: WorkoutLog = {
      ...workout,
      id: `w-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };
    setWorkouts((prev) => [newLog, ...prev]);

    setTodayVitals((prev) => {
      const addedSteps = workout.type === 'running' || workout.type === 'walking' 
        ? Math.round(workout.durationMinutes * (workout.type === 'running' ? 140 : 100))
        : 0;
      return {
        ...prev,
        steps: prev.steps + addedSteps,
        activeCalories: prev.activeCalories + workout.caloriesBurned,
        totalCalories: prev.totalCalories + workout.caloriesBurned,
        activeTimeMinutes: prev.activeTimeMinutes + workout.durationMinutes,
        distanceKm: workout.distanceKm ? parseFloat((prev.distanceKm + workout.distanceKm).toFixed(2)) : prev.distanceKm
      };
    });
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  const updateGoals = (newGoals: Partial<UserGoals>) => {
    setGoals((prev) => ({ ...prev, ...newGoals }));
  };

  const updateSleep = (newSleep: Partial<SleepRecord>) => {
    setSleepRecord((prev) => ({ ...prev, ...newSleep }));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...newProfile }));
  };

  const resetToDefaults = () => {
    setUserProfile(DEFAULT_PROFILE);
    setGoals(DEFAULT_GOALS);
    setTodayVitals(DEFAULT_VITALS);
    setSleepRecord(DEFAULT_SLEEP);
    setWorkouts(DEFAULT_WORKOUTS);
    setWeeklyData(DEFAULT_WEEKLY);
    localStorage.clear();
  };

  return (
    <HealthContext.Provider
      value={{
        currentScreen,
        navigateTo,
        userProfile,
        goals,
        todayVitals,
        sleepRecord,
        weeklyData,
        workouts,
        addSteps,
        addWater,
        addWorkout,
        deleteWorkout,
        updateGoals,
        updateSleep,
        updateProfile,
        quickLogOpen,
        setQuickLogOpen,
        resetToDefaults
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
