import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import {
  User,
  Target,
  Watch,
  Award,
  Settings,
  Save,
  RotateCcw,
  Check,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Flame,
  Moon,
  Droplets
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    userProfile,
    goals,
    updateGoals,
    updateProfile,
    resetToDefaults,
    navigateTo
  } = useHealth();

  // Local form state for goal editing
  const [dailySteps, setDailySteps] = useState(goals.dailySteps);
  const [dailyCalories, setDailyCalories] = useState(goals.dailyCalories);
  const [dailySleepHours, setDailySleepHours] = useState(goals.dailySleepHours);
  const [dailyWaterMl, setDailyWaterMl] = useState(goals.dailyWaterMl);
  const [weightKg, setWeightKg] = useState(userProfile.weightKg);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoals({
      dailySteps: Number(dailySteps),
      dailyCalories: Number(dailyCalories),
      dailySleepHours: Number(dailySleepHours),
      dailyWaterMl: Number(dailyWaterMl)
    });
    updateProfile({
      weightKg: Number(weightKg)
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const bmi = (weightKg / Math.pow(userProfile.heightCm / 100, 2)).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#dfe2eb] pb-28">
      {/* Header */}
      <Header title="내 프로필" subtitle="개인 건강 프로필 & 목표 설정" />

      <main className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6 space-y-6">
        {/* Profile Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#161B22] to-[#1c222b] border border-white/10 p-5 sm:p-7 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-24 h-24 rounded-3xl object-cover border-2 border-[#10B981] shadow-xl shadow-[#10B981]/20"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#0D1117]" />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-black text-white">{userProfile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-bold uppercase tracking-wider self-center sm:self-auto">
                  {userProfile.tier}
                </span>
              </div>
              <p className="text-xs text-[#8B949E]">
                {userProfile.gender} · {userProfile.age}세 · 신장 {userProfile.heightCm}cm · 체중 {userProfile.weightKg}kg
              </p>

              {/* Quick Biometric Tags */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <span className="px-3 py-1 rounded-xl bg-[#0D1117] text-xs border border-white/5 text-[#8B949E]">
                  BMI <b className="text-white tnum">{bmi}</b> (정상 체중)
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#0D1117] text-xs border border-white/5 text-[#8B949E]">
                  골격근량 <b className="text-white tnum">34.2kg</b>
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#0D1117] text-xs border border-white/5 text-[#8B949E]">
                  체지방률 <b className="text-[#10B981] tnum">15.4%</b>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Health Goals Customizer Form */}
        <section className="rounded-3xl bg-[#161B22] border border-white/10 p-5 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-[#10B981]" />
                일일 건강 목표 설정 (Daily Goals)
              </h2>
              <p className="text-xs text-[#8B949E]">
                목표를 변경하면 홈 대시보드와 활동 화면의 달성율에 즉시 반영됩니다
              </p>
            </div>
            {savedSuccess && (
              <span className="px-3 py-1 rounded-xl bg-[#10B981] text-[#0D1117] text-xs font-bold flex items-center gap-1 animate-fadeIn">
                <Check className="w-4 h-4" /> 저장 완료!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveGoals} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Daily Steps Goal */}
              <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8B949E] flex items-center gap-1.5 font-semibold">
                    <Activity className="w-4 h-4 text-[#10B981]" />
                    일일 걸음 수 목표
                  </span>
                  <span className="text-white font-bold tnum">{Number(dailySteps).toLocaleString()}보</span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="25000"
                  step="500"
                  value={dailySteps}
                  onChange={(e) => setDailySteps(Number(e.target.value))}
                  className="w-full accent-[#10B981] cursor-pointer"
                />
              </div>

              {/* Daily Calories Goal */}
              <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8B949E] flex items-center gap-1.5 font-semibold">
                    <Flame className="w-4 h-4 text-[#F97316]" />
                    일일 칼로리 소모 목표
                  </span>
                  <span className="text-white font-bold tnum">{Number(dailyCalories).toLocaleString()} kcal</span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="4000"
                  step="50"
                  value={dailyCalories}
                  onChange={(e) => setDailyCalories(Number(e.target.value))}
                  className="w-full accent-[#F97316] cursor-pointer"
                />
              </div>

              {/* Daily Sleep Goal */}
              <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8B949E] flex items-center gap-1.5 font-semibold">
                    <Moon className="w-4 h-4 text-[#6366F1]" />
                    목표 수면 시간
                  </span>
                  <span className="text-white font-bold tnum">{dailySleepHours}시간</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="11"
                  step="0.5"
                  value={dailySleepHours}
                  onChange={(e) => setDailySleepHours(Number(e.target.value))}
                  className="w-full accent-[#6366F1] cursor-pointer"
                />
              </div>

              {/* Daily Water Goal */}
              <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8B949E] flex items-center gap-1.5 font-semibold">
                    <Droplets className="w-4 h-4 text-[#06B6D4]" />
                    일일 수분 섭취 목표
                  </span>
                  <span className="text-white font-bold tnum">{(dailyWaterMl / 1000).toFixed(1)} L</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="4500"
                  step="100"
                  value={dailyWaterMl}
                  onChange={(e) => setDailyWaterMl(Number(e.target.value))}
                  className="w-full accent-[#06B6D4] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#10B981] hover:bg-[#0ea372] text-[#0D1117] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#10B981]/25 active:scale-98"
              >
                <Save className="w-4 h-4" />
                목표 변경사항 저장
              </button>
            </div>
          </form>
        </section>

        {/* Connected Wearables & Devices */}
        <section className="rounded-3xl bg-[#161B22] border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Watch className="w-5 h-5 text-[#06B6D4]" />
              연결된 디바이스 & 센서
            </h2>
            <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              모두 정상 연결됨
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {userProfile.connectedDevices.map((device, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0D1117] border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#21262D] flex items-center justify-center text-[#06B6D4]">
                    <Watch className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{device.name}</h4>
                    <p className="text-xs text-[#8B949E]">{device.type} · 동기화: {device.syncedAt}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-400">
                    {device.battery}%
                  </span>
                  <div className="text-[10px] text-[#8B949E]">배터리</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievement Badges */}
        <section className="rounded-3xl bg-[#161B22] border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            달성한 바이오 뱃지 & 업적
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { title: '만보 7일 연속', desc: '꾸준한 데일리 워커', icon: '🏃‍♂️', unlocked: true },
              { title: '수면 마스터', desc: '8시간 최적 수면 달성', icon: '🌙', unlocked: true },
              { title: '수분 충전러', desc: '일일 2.5L 섭취 완료', icon: '💧', unlocked: true },
              { title: '칼로리 버너', desc: '고강도 세션 완료', icon: '🔥', unlocked: true },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0D1117] border border-white/5 text-center space-y-1.5"
              >
                <div className="text-3xl mb-1">{badge.icon}</div>
                <div className="text-xs font-bold text-white">{badge.title}</div>
                <div className="text-[10px] text-[#8B949E]">{badge.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Reset / Settings */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              if (window.confirm('모든 헬스 기록과 목표를 기본값으로 재설정하시겠습니까?')) {
                resetToDefaults();
              }
            }}
            className="text-xs text-[#8B949E] hover:text-red-400 flex items-center gap-1.5 transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본 테스트 데이터로 초기화</span>
          </button>
        </div>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};
