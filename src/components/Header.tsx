import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Bell, Flame, Activity, Moon } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { currentScreen, navigateTo, userProfile, todayVitals } = useHealth();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D1117]/85 backdrop-blur-xl border-b border-white/5 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Branding & Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            title="홈 대시보드로 이동"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#10B981] to-[#06B6D4] p-0.5 flex items-center justify-center shadow-lg shadow-[#10B981]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0D1117] rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#10B981]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#10B981] transition-colors">
                  KINETIC
                </span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] tracking-wider">
                  HEALTH
                </span>
              </div>
              <p className="text-xs text-[#8B949E] line-clamp-1">
                {title || '스마트 바이오메트릭 대시보드'}
              </p>
            </div>
          </button>
        </div>

        {/* Center: Quick Live Status */}
        <div className="hidden sm:flex items-center gap-4 bg-[#161B22]/80 border border-white/5 rounded-full px-3.5 py-1 text-xs text-[#8B949E]">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            라이브 동기화됨
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="tnum font-medium text-white">{todayVitals.totalCalories.toLocaleString()}</span> kcal
          </span>
        </div>

        {/* Right: Notification & Profile Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden xs:flex items-center gap-1 text-[11px] text-[#8B949E] px-2.5 py-1 rounded-lg bg-[#161B22]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"></span>
            <span>{userProfile.tier}</span>
          </div>

          {/* Profile Trigger: XPath //header//img[@alt='Profile']/parent::* */}
          <button
            onClick={() => navigateTo('profile')}
            type="button"
            className={`relative p-0.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
              currentScreen === 'profile'
                ? 'ring-2 ring-[#10B981] shadow-lg shadow-[#10B981]/30'
                : 'hover:ring-2 hover:ring-white/20'
            }`}
            title="내 프로필 보기"
            aria-label="내 프로필 이동"
          >
            <img
              alt="Profile"
              src={userProfile.avatarUrl}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-white/10"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#0D1117]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
