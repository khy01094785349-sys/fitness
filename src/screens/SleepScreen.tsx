import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import {
  Moon,
  Sparkles,
  Heart,
  Wind,
  ShieldCheck,
  TrendingDown,
  Clock,
  Volume2,
  VolumeX,
  Edit3,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';

export const SleepScreen: React.FC = () => {
  const { sleepRecord, goals, setQuickLogOpen, updateSleep } = useHealth();
  const [ambientSoundPlaying, setAmbientSoundPlaying] = useState(false);
  const [selectedStage, setSelectedStage] = useState<'all' | 'deep' | 'rem' | 'light' | 'awake'>('all');

  const totalHours = Math.floor(sleepRecord.totalMinutes / 60);
  const totalMins = sleepRecord.totalMinutes % 60;
  const targetDiffMins = goals.dailySleepHours * 60 - sleepRecord.totalMinutes;

  const stages = [
    {
      id: 'deep',
      name: '깊은 수면 (Deep)',
      color: '#4338ca',
      accent: '#818cf8',
      minutes: sleepRecord.deepMinutes,
      percent: Math.round((sleepRecord.deepMinutes / sleepRecord.totalMinutes) * 100),
      desc: '신체 조직 회복, 근육 재생 및 면역 체계 강화'
    },
    {
      id: 'rem',
      name: '렘 수면 (REM)',
      color: '#6366f1',
      accent: '#c0c1ff',
      minutes: sleepRecord.remMinutes,
      percent: Math.round((sleepRecord.remMinutes / sleepRecord.totalMinutes) * 100),
      desc: '두뇌 인지 피로 회복, 꿈 생성 및 기억 저장'
    },
    {
      id: 'light',
      name: '얕은 수면 (Light)',
      color: '#06b6d4',
      accent: '#67e8f9',
      minutes: sleepRecord.lightMinutes,
      percent: Math.round((sleepRecord.lightMinutes / sleepRecord.totalMinutes) * 100),
      desc: '신체 이완 및 수면 사이클의 기초 완충 구간'
    },
    {
      id: 'awake',
      name: '깬 시간 (Awake)',
      color: '#f97316',
      accent: '#fdba74',
      minutes: sleepRecord.awakeMinutes,
      percent: Math.round((sleepRecord.awakeMinutes / sleepRecord.totalMinutes) * 100),
      desc: '체위 변경 및 무의식적 미세 각성 상태'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#dfe2eb] pb-28">
      {/* Header */}
      <Header title="수면 분석" subtitle="서캐디언 리듬 & 수면 주기 telemetry" />

      <main className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6 space-y-6">
        {/* Hero Sleep Score Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#161B22] via-[#1e1b4b]/40 to-[#12161d] border border-white/10 p-5 sm:p-7 shadow-2xl">
          {/* Indigo ambient glow */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#6366F1]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6366F1]/20 text-[#c0c1ff] text-xs font-semibold">
                  <Moon className="w-3.5 h-3.5 text-[#6366F1]" />
                  수면 효율 지수
                </span>
                <span className="text-xs text-[#8B949E]">오늘 밤 수면 평가</span>
              </div>

              <div className="flex items-baseline gap-3">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight tnum">
                  {sleepRecord.sleepScore}
                  <span className="text-xl font-normal text-[#8B949E] ml-1">/ 100</span>
                </h1>
                <span className="text-sm font-semibold text-[#6366F1] flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  매우 우수한 수면 품질
                </span>
              </div>

              <p className="text-sm text-[#8B949E] max-w-lg leading-relaxed">
                깊은 수면과 렘 수면 비율이 이상적이며, 취침 일관성 지수가 지난주 대비 14% 향상되었습니다.
              </p>
            </div>

            {/* Quick Actions: Edit Sleep & White Noise Toggle */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-2.5">
              <button
                onClick={() => setQuickLogOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#6366F1] hover:bg-[#4f46e5] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#6366F1]/30 active:scale-98"
              >
                <Edit3 className="w-4 h-4" />
                <span>수면 기록 수정/동기화</span>
              </button>

              <button
                onClick={() => setAmbientSoundPlaying(!ambientSoundPlaying)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  ambientSoundPlaying
                    ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                    : 'bg-white/5 border-white/10 text-[#8B949E] hover:text-white'
                }`}
              >
                {ambientSoundPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span>힐링 수면 사운드 재생 중</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>취침 백색소음 켜기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Sleep Timeline Details & Bed/Wake Times */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-[#161B22] border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs text-[#8B949E] flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#6366F1]" />
                총 수면 시간
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tnum">
                {totalHours}시간 {totalMins}분
              </div>
              <div className="text-[11px] text-[#8B949E] mt-1">
                목표 {goals.dailySleepHours}시간
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/15 text-[#6366F1] flex items-center justify-center font-bold text-sm">
              {Math.round((sleepRecord.totalMinutes / (goals.dailySleepHours * 60)) * 100)}%
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#161B22] border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs text-[#8B949E] mb-1">취침 시각</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tnum">
                {sleepRecord.bedTime}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 규칙적 취침
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#8B949E] flex items-center justify-center font-bold text-xs">
              입면
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#161B22] border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs text-[#8B949E] mb-1">기상 시각</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tnum">
                {sleepRecord.wakeTime}
              </div>
              <div className="text-[11px] text-[#8B949E] mt-1">
                {targetDiffMins > 0 ? (
                  <span className="text-amber-400">수면 부채 {targetDiffMins}분</span>
                ) : (
                  <span className="text-emerald-400">목표 초과 달성 (+{Math.abs(targetDiffMins)}분)</span>
                )}
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#8B949E] flex items-center justify-center font-bold text-xs">
              기상
            </div>
          </div>
        </section>

        {/* Hypnogram / Sleep Stages Visual Breakdown */}
        <section className="rounded-3xl bg-[#161B22] border border-white/10 p-5 sm:p-7 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-[#6366F1]" />
                수면 단계 분석 (Sleep Stages)
              </h2>
              <p className="text-xs text-[#8B949E]">
                스마트 센서가 분석한 밤사이 수면 단계별 비율 및 소요 시간
              </p>
            </div>
            <div className="flex gap-1.5 bg-[#0D1117] p-1 rounded-xl text-xs">
              <button
                onClick={() => setSelectedStage('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedStage === 'all' ? 'bg-[#21262D] text-white font-bold' : 'text-[#8B949E]'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedStage('deep')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedStage === 'deep' ? 'bg-[#21262D] text-[#818cf8] font-bold' : 'text-[#8B949E]'
                }`}
              >
                깊은 수면
              </button>
              <button
                onClick={() => setSelectedStage('rem')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedStage === 'rem' ? 'bg-[#21262D] text-[#c0c1ff] font-bold' : 'text-[#8B949E]'
                }`}
              >
                렘 수면
              </button>
            </div>
          </div>

          {/* Continuous Multi-stage Bar Graphic */}
          <div className="space-y-2">
            <div className="w-full h-8 bg-[#0D1117] rounded-2xl overflow-hidden flex p-1 gap-1 border border-white/5">
              <div
                className="h-full rounded-xl bg-[#4338ca] transition-all hover:brightness-125"
                style={{ width: `${stages[0].percent}%` }}
                title={`깊은 수면: ${stages[0].percent}%`}
              />
              <div
                className="h-full rounded-xl bg-[#6366f1] transition-all hover:brightness-125"
                style={{ width: `${stages[1].percent}%` }}
                title={`렘 수면: ${stages[1].percent}%`}
              />
              <div
                className="h-full rounded-xl bg-[#06b6d4] transition-all hover:brightness-125"
                style={{ width: `${stages[2].percent}%` }}
                title={`얕은 수면: ${stages[2].percent}%`}
              />
              <div
                className="h-full rounded-xl bg-[#f97316] transition-all hover:brightness-125"
                style={{ width: `${stages[3].percent}%` }}
                title={`깬 시간: ${stages[3].percent}%`}
              />
            </div>

            <div className="flex justify-between text-[11px] text-[#8B949E] px-1 tnum">
              <span>{sleepRecord.bedTime} 취침</span>
              <span>수면 사이클 5회 통과</span>
              <span>{sleepRecord.wakeTime} 기상</span>
            </div>
          </div>

          {/* Stages Detail Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {stages.map((stage) => {
              const h = Math.floor(stage.minutes / 60);
              const m = stage.minutes % 60;
              const isHighlighted = selectedStage === 'all' || selectedStage === stage.id;

              return (
                <div
                  key={stage.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isHighlighted
                      ? 'bg-[#0D1117] border-white/10'
                      : 'bg-[#0D1117]/40 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      {stage.name}
                    </span>
                    <span className="text-xs font-bold tnum" style={{ color: stage.accent }}>
                      {stage.percent}%
                    </span>
                  </div>

                  <div className="text-xl font-black text-white tnum mb-1">
                    {h > 0 ? `${h}시간 ` : ''}{m}분
                  </div>
                  <p className="text-[11px] text-[#8B949E] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Biometrics during Sleep (HRV, Respiratory, Resting HR) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#8B949E] flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            야간 생체 바이오 텔레메트리
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#161B22] border border-white/5">
              <div className="flex items-center justify-between text-xs text-[#8B949E] mb-2">
                <span>심박 변이도 (HRV)</span>
                <span className="text-emerald-400 font-semibold">회복 최적</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tnum">{sleepRecord.hrv}</span>
                <span className="text-xs text-[#8B949E]">ms</span>
              </div>
              <p className="text-[11px] text-[#8B949E] mt-1">자율신경계 피로도 매우 낮음</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#161B22] border border-white/5">
              <div className="flex items-center justify-between text-xs text-[#8B949E] mb-2">
                <span>평균 수면 호흡수</span>
                <span className="text-cyan-400 font-semibold">안정</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tnum">{sleepRecord.respiratoryRate}</span>
                <span className="text-xs text-[#8B949E]">회/분</span>
              </div>
              <p className="text-[11px] text-[#8B949E] mt-1">규칙적인 호흡 리듬 유지</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#161B22] border border-white/5">
              <div className="flex items-center justify-between text-xs text-[#8B949E] mb-2">
                <span>혈중 산소포화도 (SpO2)</span>
                <span className="text-emerald-400 font-semibold">정상</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tnum">98</span>
                <span className="text-xs text-[#8B949E]">%</span>
              </div>
              <p className="text-[11px] text-[#8B949E] mt-1">최저 96% / 수면 무호흡 없음</p>
            </div>
          </div>
        </section>

        {/* Circadian Coaching Tip */}
        <section className="p-5 rounded-3xl bg-gradient-to-r from-[#161B22] to-[#1e1b4b]/30 border border-white/10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#6366F1]/20 text-[#6366F1] flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white mb-1">
              오늘 밤을 위한 서캐디언 닥터 조언
            </h4>
            <p className="text-xs text-[#8B949E] leading-relaxed">
              오후 9시 이후 스마트폰의 블루라이트를 차단하고 침실 온도를 19~21도로 유지하면 깊은 수면 시간을 약 20% 늘릴 수 있습니다. 오늘 목표 기상 시각은 06:45입니다.
            </p>
          </div>
        </section>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};
