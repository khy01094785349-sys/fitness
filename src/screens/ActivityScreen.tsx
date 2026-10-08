import React, { useState, useEffect } from 'react';
import { useHealth } from '../context/HealthContext';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import {
  Footprints,
  Flame,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  TrendingUp,
  Award,
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';
import { WorkoutLog } from '../types/health';

export const ActivityScreen: React.FC = () => {
  const {
    todayVitals,
    goals,
    weeklyData,
    workouts,
    addSteps,
    addWorkout,
    deleteWorkout,
    updateGoals,
    setQuickLogOpen
  } = useHealth();

  // Selected day for interactive inspection
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(5); // Default to '수' (today)

  // Live Workout Timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selectedSport, setSelectedSport] = useState<WorkoutLog['type']>('running');

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleFinishTimerWorkout = () => {
    if (timerSeconds < 10) {
      setIsTimerRunning(false);
      setTimerSeconds(0);
      return;
    }
    const mins = Math.max(1, Math.round(timerSeconds / 60));
    const calRate = selectedSport === 'running' ? 10 : selectedSport === 'cycling' ? 8 : 7;
    const cals = mins * calRate;

    addWorkout({
      type: selectedSport,
      name: `실시간 ${selectedSport === 'running' ? '런닝' : selectedSport === 'cycling' ? '라이딩' : '운동'} 세션`,
      durationMinutes: mins,
      caloriesBurned: cals,
      avgHeartRate: 138,
      distanceKm: selectedSport === 'running' ? parseFloat((mins * 0.16).toFixed(2)) : undefined
    });

    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeDay = weeklyData[selectedDayIndex] || weeklyData[5];
  const maxWeeklySteps = Math.max(...weeklyData.map((d) => d.steps), goals.dailySteps);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#dfe2eb] pb-28">
      {/* Header */}
      <Header title="활동 관리" subtitle="일간/주간 운동 분석 & 워크아웃 세션" />

      <main className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6 space-y-6">
        {/* Step Progress & Target Ring Card */}
        <section className="rounded-3xl bg-[#161B22] border border-white/10 p-5 sm:p-7 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                  실시간 걸음 트래킹
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                오늘의 활동 통계
              </h1>
            </div>

            {/* Quick step booster */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => addSteps(500)}
                className="px-3 py-2 rounded-xl bg-[#21262D] hover:bg-[#10B981]/20 hover:text-[#10B981] text-xs font-bold text-white border border-white/5 transition-colors"
              >
                +500보
              </button>
              <button
                onClick={() => addSteps(1000)}
                className="px-3 py-2 rounded-xl bg-[#21262D] hover:bg-[#10B981]/20 hover:text-[#10B981] text-xs font-bold text-white border border-white/5 transition-colors"
              >
                +1,000보
              </button>
              <button
                onClick={() => setQuickLogOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#10B981] hover:bg-[#0ea372] text-[#0D1117] text-xs font-bold transition-all shadow-md shadow-[#10B981]/20 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                직접 기록
              </button>
            </div>
          </div>

          {/* Metric telemetry grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
            <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-[#8B949E] mb-1">
                <Footprints className="w-3.5 h-3.5 text-[#10B981]" />
                총 걸음 수
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tnum">
                {todayVitals.steps.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#10B981] mt-1 font-semibold">
                목표 대비 {Math.round((todayVitals.steps / goals.dailySteps) * 100)}%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-[#8B949E] mb-1">
                <Flame className="w-3.5 h-3.5 text-[#F97316]" />
                활동 소모
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tnum">
                {todayVitals.activeCalories}
              </div>
              <div className="text-[11px] text-[#8B949E] mt-1">
                총 {todayVitals.totalCalories} kcal
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-[#8B949E] mb-1">
                <Target className="w-3.5 h-3.5 text-[#06B6D4]" />
                이동 거리
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tnum">
                {todayVitals.distanceKm}
              </div>
              <div className="text-[11px] text-[#8B949E] mt-1">km 누적 거리</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-[#8B949E] mb-1">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                활동 시간
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tnum">
                {todayVitals.activeTimeMinutes}
              </div>
              <div className="text-[11px] text-[#8B949E] mt-1">분 활성 시간</div>
            </div>
          </div>
        </section>

        {/* Weekly Step Trend Chart */}
        <section className="rounded-3xl bg-[#161B22] border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                주간 걸음 트렌드 & 목표 달성도
              </h2>
              <p className="text-xs text-[#8B949E]">
                최근 7일간의 활동 데이터를 확인하고 요일별 성과를 비교하세요
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] self-start sm:self-auto">
              주간 평균 {Math.round(weeklyData.reduce((acc, d) => acc + d.steps, 0) / weeklyData.length).toLocaleString()}보
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="pt-6 pb-2">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2">
              {weeklyData.map((d, idx) => {
                const heightPercent = Math.min(100, Math.max(12, Math.round((d.steps / maxWeeklySteps) * 100)));
                const isSelected = selectedDayIndex === idx;
                const isGoalMet = d.steps >= d.stepGoal;

                return (
                  <button
                    key={d.dayName}
                    onClick={() => setSelectedDayIndex(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end group focus:outline-none"
                  >
                    {/* Tooltip on hover/active */}
                    <span
                      className={`text-[10px] font-bold tnum mb-1.5 transition-all ${
                        isSelected ? 'text-[#10B981] opacity-100' : 'text-[#8B949E] opacity-75 group-hover:opacity-100'
                      }`}
                    >
                      {(d.steps / 1000).toFixed(1)}k
                    </span>

                    {/* Bar */}
                    <div className="w-full max-w-[40px] bg-[#21262D] rounded-xl h-full flex items-end p-1 transition-all group-hover:bg-[#282f38]">
                      <div
                        className={`w-full rounded-lg transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-t from-[#06B6D4] to-[#10B981] shadow-lg shadow-[#10B981]/30'
                            : isGoalMet
                            ? 'bg-[#10B981]/80 group-hover:bg-[#10B981]'
                            : 'bg-[#8B949E]/50 group-hover:bg-[#8B949E]'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    {/* Day label */}
                    <span
                      className={`mt-2 text-xs font-bold transition-colors ${
                        isSelected ? 'text-[#10B981]' : 'text-[#8B949E]'
                      }`}
                    >
                      {d.dayName}
                    </span>
                    <span className="text-[10px] text-[#484F58]">{d.dateStr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Detail Card */}
          <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">{activeDay.dayName}요일 ({activeDay.dateStr}) 상세:</span>
              <span className="text-[#10B981] font-bold tnum">{activeDay.steps.toLocaleString()}보</span>
            </div>
            <div className="flex items-center gap-4 text-[#8B949E]">
              <span>소모 칼로리: <b className="text-white tnum">{activeDay.calories} kcal</b></span>
              <span>수면 시간: <b className="text-white tnum">{activeDay.sleepHours}시간</b></span>
              <span>활동 시간: <b className="text-white tnum">{activeDay.activeMinutes}분</b></span>
            </div>
          </div>
        </section>

        {/* Live Workout Session Timer / Tracker */}
        <section className="rounded-3xl bg-[#161B22] border border-white/10 p-5 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Timer className="w-5 h-5 text-amber-400" />
                실시간 운동 세션 타이머
              </h2>
              <p className="text-xs text-[#8B949E]">지금 바로 운동을 시작하고 칼로리를 소모하세요</p>
            </div>
            {isTimerRunning && (
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold animate-pulse">
                REC 측정 중
              </span>
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Sport selector & Display */}
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['running', 'cycling', 'strength', 'walking'] as WorkoutLog['type'][]).map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSport === sport
                        ? 'bg-[#21262D] border-[#10B981] text-[#10B981]'
                        : 'border-white/5 bg-[#0D1117] text-[#8B949E] hover:text-white'
                    }`}
                  >
                    {sport === 'running' ? '런닝' : sport === 'cycling' ? '사이클' : sport === 'strength' ? '근력' : '워킹'}
                  </button>
                ))}
              </div>

              {/* Huge Timer Readout */}
              <div className="p-6 rounded-2xl bg-[#0D1117] border border-white/5 text-center">
                <div className="text-5xl font-black text-white tracking-widest tnum font-mono">
                  {formatTimer(timerSeconds)}
                </div>
                <div className="text-xs text-[#8B949E] mt-2 flex items-center justify-center gap-4">
                  <span>추정 소모: <b className="text-[#F97316] tnum">{Math.round(timerSeconds * 0.15)} kcal</b></span>
                  <span>심박수: <b className="text-red-400 tnum">{isTimerRunning ? '142' : '72'} BPM</b></span>
                </div>
              </div>
            </div>

            {/* Right: Timer Controls */}
            <div className="flex flex-col gap-3">
              {!isTimerRunning ? (
                <button
                  onClick={() => setIsTimerRunning(true)}
                  className="w-full py-4 rounded-2xl bg-[#10B981] hover:bg-[#0ea372] text-[#0D1117] font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#10B981]/30 active:scale-98"
                >
                  <Play className="w-5 h-5 fill-current" />
                  운동 시작하기
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsTimerRunning(false)}
                    className="py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-[#0D1117] font-extrabold text-base flex items-center justify-center gap-2 transition-all"
                  >
                    <Pause className="w-5 h-5 fill-current" />
                    일시정지
                  </button>
                  <button
                    onClick={handleFinishTimerWorkout}
                    className="py-4 rounded-2xl bg-[#F97316] hover:bg-[#ea580c] text-[#0D1117] font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#F97316]/30"
                  >
                    운동 완료 및 저장
                  </button>
                </div>
              )}

              {timerSeconds > 0 && !isTimerRunning && (
                <button
                  onClick={() => setTimerSeconds(0)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8B949E] hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  타이머 초기화
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Workout History Log Feed */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#8B949E] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#10B981]" />
              운동 기록 관리 ({workouts.length}건)
            </h2>
            <button
              onClick={() => setQuickLogOpen(true)}
              className="text-xs text-[#10B981] font-semibold hover:underline flex items-center gap-1"
            >
              + 새 운동 추가
            </button>
          </div>

          <div className="space-y-3">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="rounded-2xl bg-[#161B22] border border-white/5 p-4 sm:p-5 flex items-center justify-between hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#21262D] flex items-center justify-center text-white/90">
                    {workout.type === 'running' && <Zap className="w-6 h-6 text-[#10B981]" />}
                    {workout.type === 'walking' && <Footprints className="w-6 h-6 text-[#06B6D4]" />}
                    {workout.type === 'strength' && <Flame className="w-6 h-6 text-[#F97316]" />}
                    {workout.type === 'cycling' && <Timer className="w-6 h-6 text-amber-400" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{workout.name}</h3>
                    <div className="text-xs text-[#8B949E] flex items-center gap-2 mt-0.5">
                      <span>{workout.timestamp}</span>
                      <span>·</span>
                      <span>{workout.durationMinutes}분 소요</span>
                      {workout.distanceKm && (
                        <>
                          <span>·</span>
                          <span className="text-[#06B6D4] font-medium">{workout.distanceKm} km</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-base font-black text-[#F97316] tnum">
                      +{workout.caloriesBurned} kcal
                    </div>
                    <div className="text-xs text-[#8B949E] tnum">
                      평균 {workout.avgHeartRate} BPM
                    </div>
                  </div>

                  <button
                    onClick={() => deleteWorkout(workout.id)}
                    className="p-2 rounded-xl text-[#8B949E] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="기록 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};
