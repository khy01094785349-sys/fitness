import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { X, Footprints, Droplets, Dumbbell, Moon, Plus, Check } from 'lucide-react';
import { WorkoutLog } from '../types/health';

export const QuickLogModal: React.FC = () => {
  const { quickLogOpen, setQuickLogOpen, addSteps, addWater, addWorkout, updateSleep, sleepRecord } = useHealth();
  const [activeTab, setActiveTab] = useState<'step' | 'water' | 'workout' | 'sleep'>('step');

  // Step state
  const [customSteps, setCustomSteps] = useState('');
  // Water state
  const [customWater, setCustomWater] = useState('');
  // Workout state
  const [workoutType, setWorkoutType] = useState<WorkoutLog['type']>('running');
  const [workoutName, setWorkoutName] = useState('실내 트레드밀 런');
  const [workoutDuration, setWorkoutDuration] = useState('30');
  const [workoutCalories, setWorkoutCalories] = useState('240');
  const [workoutHeartRate, setWorkoutHeartRate] = useState('135');
  // Sleep state
  const [bedTime, setBedTime] = useState(sleepRecord.bedTime);
  const [wakeTime, setWakeTime] = useState(sleepRecord.wakeTime);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!quickLogOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
      setQuickLogOpen(false);
    }, 1200);
  };

  const handleAddSteps = (amt: number) => {
    addSteps(amt);
    showToast(`걸음 수 ${amt.toLocaleString()}보가 추가되었습니다!`);
  };

  const handleCustomStepsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customSteps, 10);
    if (!isNaN(val) && val > 0) {
      addSteps(val);
      setCustomSteps('');
      showToast(`걸음 수 ${val.toLocaleString()}보가 추가되었습니다!`);
    }
  };

  const handleAddWater = (amt: number) => {
    addWater(amt);
    showToast(`물 ${amt}ml 섭취를 기록했습니다.`);
  };

  const handleCustomWaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customWater, 10);
    if (!isNaN(val) && val > 0) {
      addWater(val);
      setCustomWater('');
      showToast(`물 ${val}ml 섭취를 기록했습니다.`);
    }
  };

  const handleAddWorkoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dur = parseInt(workoutDuration, 10) || 30;
    const cal = parseInt(workoutCalories, 10) || 200;
    const hr = parseInt(workoutHeartRate, 10) || 130;

    addWorkout({
      type: workoutType,
      name: workoutName || '새 운동 세션',
      durationMinutes: dur,
      caloriesBurned: cal,
      avgHeartRate: hr,
      distanceKm: workoutType === 'running' ? parseFloat((dur * 0.15).toFixed(1)) : undefined
    });
    showToast('새 운동 기록이 추가되었습니다!');
  };

  const handleSleepUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate total minutes
    const [bH, bM] = bedTime.split(':').map(Number);
    const [wH, wM] = wakeTime.split(':').map(Number);
    let diffMinutes = (wH * 60 + wM) - (bH * 60 + bM);
    if (diffMinutes <= 0) diffMinutes += 24 * 60;

    const deep = Math.round(diffMinutes * 0.23);
    const rem = Math.round(diffMinutes * 0.21);
    const light = Math.round(diffMinutes * 0.51);
    const awake = Math.max(10, diffMinutes - (deep + rem + light));
    const score = Math.min(98, Math.max(60, Math.round((diffMinutes / 480) * 92)));

    updateSleep({
      bedTime,
      wakeTime,
      totalMinutes: diffMinutes,
      deepMinutes: deep,
      remMinutes: rem,
      lightMinutes: light,
      awakeMinutes: awake,
      sleepScore: score
    });
    showToast('수면 기록이 성공적으로 업데이트되었습니다.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#161B22] border border-white/10 rounded-3xl p-6 shadow-2xl text-[#dfe2eb] overflow-hidden">
        {/* Toast feedback */}
        {toastMsg && (
          <div className="absolute inset-x-6 top-6 z-20 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#10B981] text-[#0D1117] font-bold text-sm shadow-xl">
            <Check className="w-5 h-5" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">건강 데이터 빠른 기록</h3>
              <p className="text-xs text-[#8B949E]">걸음, 수분, 운동, 수면을 즉시 기록합니다</p>
            </div>
          </div>
          <button
            onClick={() => setQuickLogOpen(false)}
            className="p-2 rounded-xl text-[#8B949E] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mt-4 p-1 bg-[#0D1117] rounded-2xl">
          <button
            onClick={() => setActiveTab('step')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'step'
                ? 'bg-[#21262D] text-[#10B981] shadow-sm'
                : 'text-[#8B949E] hover:text-white'
            }`}
          >
            <Footprints className="w-4 h-4 mb-1" />
            <span>걸음수</span>
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'water'
                ? 'bg-[#21262D] text-[#06B6D4] shadow-sm'
                : 'text-[#8B949E] hover:text-white'
            }`}
          >
            <Droplets className="w-4 h-4 mb-1" />
            <span>수분</span>
          </button>
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'workout'
                ? 'bg-[#21262D] text-[#F97316] shadow-sm'
                : 'text-[#8B949E] hover:text-white'
            }`}
          >
            <Dumbbell className="w-4 h-4 mb-1" />
            <span>운동</span>
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'sleep'
                ? 'bg-[#21262D] text-[#6366F1] shadow-sm'
                : 'text-[#8B949E] hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 mb-1" />
            <span>수면</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-5">
          {activeTab === 'step' && (
            <div className="space-y-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8B949E] block">
                원클릭 걸음수 추가
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[500, 1000, 2000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleAddSteps(amt)}
                    className="py-3 px-2 rounded-2xl bg-[#21262D] hover:bg-[#10B981]/20 hover:border-[#10B981]/50 border border-white/5 font-bold text-sm text-[#10B981] transition-all flex flex-col items-center gap-1 active:scale-95"
                  >
                    <span>+{amt.toLocaleString()}</span>
                    <span className="text-[10px] text-[#8B949E] font-normal">보</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleCustomStepsSubmit} className="space-y-2 pt-2">
                <label className="text-xs text-[#8B949E]">직접 걸음 수 입력</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={customSteps}
                    onChange={(e) => setCustomSteps(e.target.value)}
                    placeholder="예: 3500"
                    className="flex-1 bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] tnum"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#10B981] hover:bg-[#059669] text-[#0D1117] font-bold rounded-xl text-sm transition-all shadow-md shadow-[#10B981]/20"
                  >
                    추가
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'water' && (
            <div className="space-y-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8B949E] block">
                물 마시기 기록
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[200, 350, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleAddWater(amt)}
                    className="py-3 px-2 rounded-2xl bg-[#21262D] hover:bg-[#06B6D4]/20 hover:border-[#06B6D4]/50 border border-white/5 font-bold text-sm text-[#06B6D4] transition-all flex flex-col items-center gap-1 active:scale-95"
                  >
                    <span>+{amt}ml</span>
                    <span className="text-[10px] text-[#8B949E] font-normal">
                      {amt === 200 ? '한 컵' : amt === 350 ? '텀블러 1잔' : '대형 보틀'}
                    </span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleCustomWaterSubmit} className="space-y-2 pt-2">
                <label className="text-xs text-[#8B949E]">직접 섭취량 입력 (ml)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={customWater}
                    onChange={(e) => setCustomWater(e.target.value)}
                    placeholder="예: 450"
                    className="flex-1 bg-[#0D1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] tnum"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#06B6D4] hover:bg-[#0891b2] text-[#0D1117] font-bold rounded-xl text-sm transition-all shadow-md shadow-[#06B6D4]/20"
                  >
                    기록
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'workout' && (
            <form onSubmit={handleAddWorkoutSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-[#8B949E] block mb-1">운동 종목</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'running', label: '런닝/조깅' },
                    { id: 'strength', label: '웨이트/근력' },
                    { id: 'cycling', label: '사이클링' },
                    { id: 'walking', label: '파워워킹' },
                    { id: 'swimming', label: '수영' },
                    { id: 'yoga', label: '요가/스트레칭' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        setWorkoutType(item.id as WorkoutLog['type']);
                        setWorkoutName(`${item.label} 세션`);
                      }}
                      className={`py-2 px-2 rounded-xl border text-center transition-all ${
                        workoutType === item.id
                          ? 'border-[#F97316] bg-[#F97316]/15 text-[#F97316] font-semibold'
                          : 'border-white/5 bg-[#0D1117] text-[#8B949E] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-[#8B949E] block mb-1">운동 세션 이름</label>
                <input
                  type="text"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#F97316]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-[#8B949E] block mb-1">시간(분)</label>
                  <input
                    type="number"
                    value={workoutDuration}
                    onChange={(e) => {
                      setWorkoutDuration(e.target.value);
                      const dur = parseInt(e.target.value, 10) || 0;
                      setWorkoutCalories(String(dur * 8));
                    }}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-3 py-2 text-sm tnum focus:outline-none focus:border-[#F97316]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#8B949E] block mb-1">칼로리(kcal)</label>
                  <input
                    type="number"
                    value={workoutCalories}
                    onChange={(e) => setWorkoutCalories(e.target.value)}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-3 py-2 text-sm tnum focus:outline-none focus:border-[#F97316]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#8B949E] block mb-1">심박수(BPM)</label>
                  <input
                    type="number"
                    value={workoutHeartRate}
                    onChange={(e) => setWorkoutHeartRate(e.target.value)}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-3 py-2 text-sm tnum focus:outline-none focus:border-[#F97316]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#F97316] hover:bg-[#ea580c] text-[#0D1117] font-bold rounded-xl text-sm transition-all shadow-md shadow-[#F97316]/20"
              >
                운동 기록 저장
              </button>
            </form>
          )}

          {activeTab === 'sleep' && (
            <form onSubmit={handleSleepUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#8B949E] block mb-1">취침 시각</label>
                  <input
                    type="time"
                    value={bedTime}
                    onChange={(e) => setBedTime(e.target.value)}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm tnum focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#8B949E] block mb-1">기상 시각</label>
                  <input
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm tnum focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#0D1117] rounded-xl border border-white/5 text-xs text-[#8B949E] space-y-1">
                <div className="flex justify-between">
                  <span>추정 총 수면 시간:</span>
                  <span className="font-semibold text-white">
                    {(() => {
                      const [bH, bM] = bedTime.split(':').map(Number);
                      const [wH, wM] = wakeTime.split(':').map(Number);
                      let diff = (wH * 60 + wM) - (bH * 60 + bM);
                      if (diff <= 0) diff += 24 * 60;
                      return `${Math.floor(diff / 60)}시간 ${diff % 60}분`;
                    })()}
                  </span>
                </div>
                <p className="text-[11px] text-[#6366F1]">
                  자동으로 렘 수면, 깊은 수면, 얕은 수면 구간이 재계산됩니다.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#6366F1] hover:bg-[#4f46e5] text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-[#6366F1]/20"
              >
                수면 데이터 동기화
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
