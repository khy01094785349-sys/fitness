import React from 'react';
import { useHealth } from '../context/HealthContext';
import { LayoutDashboard, Footprints, Moon, User } from 'lucide-react';
import { ScreenType } from '../types/health';

export const Navigation: React.FC = () => {
  const { currentScreen, navigateTo } = useHealth();

  const navItems: { path: ScreenType; label: string; icon: React.ReactNode; accent: string }[] = [
    {
      path: 'home',
      label: '홈 대시보드',
      icon: <LayoutDashboard className="w-5 h-5" />,
      accent: '#10B981'
    },
    {
      path: 'activity',
      label: '활동 관리',
      icon: <Footprints className="w-5 h-5" />,
      accent: '#10B981'
    },
    {
      path: 'sleep',
      label: '수면 분석',
      icon: <Moon className="w-5 h-5" />,
      accent: '#6366F1'
    },
    {
      path: 'profile',
      label: '내 프로필',
      icon: <User className="w-5 h-5" />,
      accent: '#06B6D4'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#161B22]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.path;
          return (
            <a
              key={item.path}
              href={`#${item.path}`}
              data-path={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(item.path);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 group focus:outline-none min-w-[72px] ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-[#8B949E] hover:text-[#dfe2eb] hover:bg-white/[0.04]'
              }`}
            >
              {/* Active glow pill */}
              {isActive && (
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                  style={{
                    backgroundColor: item.accent,
                    boxShadow: `0 0 12px ${item.accent}`
                  }}
                />
              )}

              {/* Icon Container with subtle active glow */}
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 scale-110 shadow-sm'
                    : 'group-hover:scale-105'
                }`}
                style={{
                  color: isActive ? item.accent : 'currentColor'
                }}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'text-white' : 'text-[#8B949E]'}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
