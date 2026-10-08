import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import {
  Footprints,
  Flame,
  Moon,
  Heart,
  Droplets,
  Activity,
  Plus,
  ChevronRight,
  TrendingUp,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    todayVitals,
    goals,
    sleepRecord,
    navigateTo,
    addSteps,
    addWater,
    setQuickLogOpen,
    workouts
  } = useHealth();

  const stepPercent = Math.min(100, Math.round((todayVitals.steps / goals.dailySteps) * 100));
  const caloriePercent = Math.min(100, Math.round((todayVitals.totalCalories / goals.dailyCalories) * 100));
  const sleepHours = (sleepRecord.totalMinutes / 60).toFixed(1);
  const sleepPercent = Math.min(100, Math.round(((sleepRecord.totalMinutes / 60) / goals.dailySleepHours) * 100));
  const waterPercent = Math.min(100, Math.round((todayVitals.waterMl / goals.dailyWaterMl) * 100));

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#dfe2eb] pb-28">
      {/* Universal Header with Profile Button */}
      <Header title="홈 대시보드" subtitle="실시간 바이오메트릭 현황" />

      <main className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6 space-y-6">
        {/* Hero Banner: Readiness Score & Quick Jump to Activity Screen */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#161B22] via-[#1c222b] to-[#12161d] border border-white/10 p-5 sm:p-7 shadow-2xl">
          {/* Subtle bio-glow background effect */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#6366F1]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  신체 준비도 (Readiness)
                </span>
                <span className="text-xs text-[#8B949E]">오늘의 바이오 스코어</span>
              </div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight tnum">
                  {todayVitals.readinessScore}
                </h1>
                <span className="text-sm font-semibold text-[#10B981] flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  최적의 신체 컨디션
                </span>
              </div>
              <p className="text-sm text-[#8B949E] max-w-md leading-relaxed">
                충분한 수면과 균형 잡힌 심박수 변이도로 오늘 고강도 운동 수행에 이상적인 상태입니다.
              </p>
            </div>

            {/* Crucial spec element: //button[@id='detail-score-btn'] -> navigates to 활동 관리 (push) */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3">
              <button
                id="detail-score-btn"
                onClick={() => navigateTo('activity')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#0ea372] active:scale-98 text-[#0D1117] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#10B981]/25 hover:shadow-[#10B981]/40"
              >
                <span>활동 스코어 상세 분석</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setQuickLogOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/90 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#10B981]" />
                <span>데이터 빠른 기록</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3 Core Biometrics Grid (걸음수, 수면시간, 칼로리) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#8B949E] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#10B981]" />
              핵심 바이오 지표 (Core Biometrics)
            </h2>
            <span className="text-xs text-[#8B949E]">목표 기준 달성율</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. 오늘 걸음수 (Steps) */}
            <div className="rounded-3xl bg-[#161B22]/90 border border-white/10 p-5 shadow-lg relative overflow-hidden group hover:border-[#10B981]/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
                    <Footprints className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#8B949E]">오늘 걸음수</span>
                </div>
                <span className="text-xs font-bold text-[#10B981] tnum">{stepPercent}%</span>
              </div>

              <div className="flex items-baseline gap-1.5 my-2">
                <span className="text-3xl font-extrabold text-white tnum tracking-tight">
                  {todayVitals.steps.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-[#8B949E]">/ {goals.dailySteps.toLocaleString()}보</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#21262D] rounded-full h-2 my-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#06B6D4] to-[#10B981] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stepPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8B949E] mt-3 pt-3 border-t border-white/5">
                <span>거리 {todayVitals.distanceKm} km</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => addSteps(500)}
                    className="px-2 py-0.5 rounded-lg bg-[#21262D] text-[#10B981] hover:bg-[#10B981]/20 font-medium transition-colors"
                    title="+500 걸음 추가"
                  >
                    +500
                  </button>
                  <button
                    onClick={() => addSteps(1000)}
                    className="px-2 py-0.5 rounded-lg bg-[#21262D] text-[#10B981] hover:bg-[#10B981]/20 font-medium transition-colors"
                    title="+1000 걸음 추가"
                  >
                    +1,000
                  </button>
                </div>
              </div>
            </div>

            {/* 2. 오늘 수면시간 (Sleep) */}
            <div
              onClick={() => navigateTo('sleep')}
              className="rounded-3xl bg-[#161B22]/90 border border-white/10 p-5 shadow-lg relative overflow-hidden group hover:border-[#6366F1]/40 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#6366F1]/15 text-[#6366F1] flex items-center justify-center">
                    <Moon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#8B949E]">수면 분석</span>
                </div>
                <span className="text-xs font-bold text-[#6366F1] tnum">{sleepRecord.sleepScore}점</span>
              </div>

              <div className="flex items-baseline gap-1.5 my-2">
                <span className="text-3xl font-extrabold text-white tnum tracking-tight">
                  {Math.floor(sleepRecord.totalMinutes / 60)}h {sleepRecord.totalMinutes % 60}m
                </span>
                <span className="text-xs font-medium text-[#8B949E]">/ {goals.dailySleepHours}h 목표</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#21262D] rounded-full h-2 my-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#9699ff] to-[#6366F1] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${sleepPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8B949E] mt-3 pt-3 border-t border-white/5">
                <span>깊은 수면 {Math.floor(sleepRecord.deepMinutes / 60)}시간 {sleepRecord.deepMinutes % 60}분</span>
                <span className="text-[#6366F1] font-medium flex items-center">
                  상세보기 <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* 3. 소모 칼로리 (Calories) */}
            <div className="rounded-3xl bg-[#161B22]/90 border border-white/10 p-5 shadow-lg relative overflow-hidden group hover:border-[#F97316]/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F97316]/15 text-[#F97316] flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#8B949E]">소모 칼로리</span>
                </div>
                <span className="text-xs font-bold text-[#F97316] tnum">{caloriePercent}%</span>
              </div>

              <div className="flex items-baseline gap-1.5 my-2">
                <span className="text-3xl font-extrabold text-white tnum tracking-tight">
                  {todayVitals.totalCalories.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-[#8B949E]">/ {goals.dailyCalories.toLocaleString()} kcal</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#21262D] rounded-full h-2 my-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#ffb690] to-[#F97316] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${caloriePercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8B949E] mt-3 pt-3 border-t border-white/5">
                <span>활동 {todayVitals.activeCalories} · 기초 {todayVitals.basalCalories}</span>
                <span className="text-orange-400 font-semibold">{goals.dailyCalories - todayVitals.totalCalories} kcal 남음</span>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time Auxiliary Health Vitals */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#8B949E] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#06B6D4]" />
            실시간 바이탈 & 수분
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Heart Rate */}
            <div className="rounded-2xl bg-[#161B22] border border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
                  <Heart className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs text-[#8B949E]">현재 심박수</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white tnum">{todayVitals.currentHeartRate}</span>
                    <span className="text-xs text-[#8B949E]">BPM</span>
                  </div>
                </div>
              </div>
              <div className="text-right text-[11px] text-[#8B949E]">
                <div>안정시 {todayVitals.restingHeartRate}</div>
                <div className="text-emerald-400 font-medium">정상 범위</div>
              </div>
            </div>

            {/* Hydration / Water Tracker */}
            <div className="rounded-2xl bg-[#161B22] border border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#8B949E]">수분 섭취 ({waterPercent}%)</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white tnum">{(todayVitals.waterMl / 1000).toFixed(1)}</span>
                    <span className="text-xs text-[#8B949E]">/ {(goals.dailyWaterMl / 1000).toFixed(1)} L</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => addWater(250)}
                className="px-2.5 py-1.5 rounded-xl bg-[#06B6D4]/15 hover:bg-[#06B6D4]/30 text-[#06B6D4] text-xs font-bold transition-colors"
                title="물 250ml 기록"
              >
                +250ml
              </button>
            </div>

            {/* Stress level */}
            <div className="rounded-2xl bg-[#161B22] border border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#8B949E]">스트레스 지수</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white tnum">{todayVitals.stressLevel}</span>
                    <span className="text-xs text-[#8B949E]">/ 100</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                안정 (휴식 권장)
              </span>
            </div>
          </div>
        </section>

        {/* Today's Workout Feed preview */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#8B949E] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F97316]" />
              오늘의 운동 활동 기록 ({workouts.length}건)
            </h2>
            <button
              onClick={() => navigateTo('activity')}
              className="text-xs text-[#10B981] hover:underline flex items-center gap-1 font-semibold"
            >
              전체 활동 보기 <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="rounded-2xl bg-[#161B22] border border-white/5 p-4 flex items-center justify-between hover:bg-[#1a2029] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#21262D] flex items-center justify-center text-white/90">
                    {workout.type === 'running' && <Zap className="w-5 h-5 text-[#10B981]" />}
                    {workout.type === 'walking' && <Footprints className="w-5 h-5 text-[#06B6D4]" />}
                    {workout.type === 'strength' && <Flame className="w-5 h-5 text-[#F97316]" />}
                    {workout.type === 'cycling' && <Activity className="w-5 h-5 text-amber-400" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{workout.name}</h4>
                    <p className="text-xs text-[#8B949E]">
                      {workout.timestamp} · {workout.durationMinutes}분{workout.distanceKm ? ` · ${workout.distanceKm}km` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-[#F97316] tnum">
                    +{workout.caloriesBurned} kcal
                  </div>
                  <div className="text-[11px] text-[#8B949E] tnum">
                    평균 {workout.avgHeartRate} BPM
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Universal Navigation bar with data-path attributes */}
      <Navigation />
    </div>
  );
};
