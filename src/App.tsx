/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import { HomeScreen } from './screens/HomeScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { SleepScreen } from './screens/SleepScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { QuickLogModal } from './components/QuickLogModal';

const AppContent: React.FC = () => {
  const { currentScreen } = useHealth();

  return (
    <div className="relative min-h-screen bg-[#0D1117] text-[#dfe2eb]">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'activity' && <ActivityScreen />}
      {currentScreen === 'sleep' && <SleepScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}

      {/* Global Quick Log Modal */}
      <QuickLogModal />
    </div>
  );
};

export default function App() {
  return (
    <HealthProvider>
      <AppContent />
    </HealthProvider>
  );
}
