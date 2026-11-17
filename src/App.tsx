import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ProductionTopNavbar } from './components/layout/ProductionTopNavbar';
import { DesktopSidebar } from './components/layout/DesktopSidebar';
import { DesktopRightPanel } from './components/layout/DesktopRightPanel';

import { SplashScreen } from './components/screens/SplashScreen';
import { LandingScreen } from './components/screens/LandingScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { InterestsScreen } from './components/screens/InterestsScreen';
import { LocationScreen } from './components/screens/LocationScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { EventDetailScreen } from './components/screens/EventDetailScreen';
import { PeopleScreen } from './components/screens/PeopleScreen';
import { CommunitiesScreen } from './components/screens/CommunitiesScreen';
import { CommunityDetailScreen } from './components/screens/CommunityDetailScreen';
import { CreateGatheringTypeScreen } from './components/screens/CreateGatheringTypeScreen';
import { CreateGatheringDetailsScreen } from './components/screens/CreateGatheringDetailsScreen';
import { CreateGatheringCurateScreen } from './components/screens/CreateGatheringCurateScreen';
import { CreateGatheringSuccessScreen } from './components/screens/CreateGatheringSuccessScreen';
import { HostManagementScreen } from './components/screens/HostManagementScreen';
import { InboxScreen } from './components/screens/InboxScreen';
import { EventChatScreen } from './components/screens/EventChatScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { MyEventsScreen } from './components/screens/MyEventsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SettingsSafetyScreen } from './components/screens/SettingsSafetyScreen';
import { BecomeHostScreen } from './components/screens/BecomeHostScreen';
import { HostLoginScreen } from './components/screens/HostLoginScreen';
import { AdminLoginScreen } from './components/screens/AdminLoginScreen';
import { AdminScreen } from './components/screens/AdminScreen';

import { Compass, Users, PlusCircle, MessageSquare, User, Crown } from 'lucide-react';
import type { ScreenId } from './types';

const MainScreenRouter: React.FC = () => {
  const { currentScreen, navigateTo, isAdminLoggedIn, isHostVerified } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'landing':
        return <LandingScreen />;
      case 'auth_phone':
        return <AuthScreen />;
      case 'onboarding_interests':
        return <InterestsScreen />;
      case 'onboarding_location':
        return <LocationScreen />;
      case 'home':
        return <HomeScreen />;
      case 'event_detail':
        return <EventDetailScreen />;
      case 'people':
        return <PeopleScreen />;
      case 'communities':
        return <CommunitiesScreen />;
      case 'community_detail':
        return <CommunityDetailScreen />;
      case 'create_step1_type':
        return <CreateGatheringTypeScreen />;
      case 'create_step2_details':
        return <CreateGatheringDetailsScreen />;
      case 'create_step3_curate':
        return <CreateGatheringCurateScreen />;
      case 'create_step4_success':
        return <CreateGatheringSuccessScreen />;
      case 'host_management':
        return <HostManagementScreen />;
      case 'inbox':
        return <InboxScreen />;
      case 'event_chat':
        return <EventChatScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'my_events':
        return <MyEventsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings_safety':
        return <SettingsSafetyScreen />;
      case 'become_host':
        return <BecomeHostScreen />;
      case 'host_login':
        return <HostLoginScreen />;
      case 'admin_login':
        return <AdminLoginScreen />;
      case 'admin':
        return isAdminLoggedIn ? <AdminScreen /> : <AdminLoginScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Full-bleed authentication & onboarding pages
  const isFullBleedScreen = [
    'splash',
    'landing',
    'auth_phone',
    'onboarding_interests',
    'onboarding_location',
    'host_login',
    'admin_login'
  ].includes(currentScreen);

  // If viewing admin route (and logged in), give full wide console
  if (currentScreen === 'admin' && isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0e0f15] text-white flex flex-col font-sans">
        <ProductionTopNavbar />
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto">
          <AdminScreen />
        </main>
      </div>
    );
  }

  // If on full bleed screens, render centered without sidebar clutter
  if (isFullBleedScreen) {
    return (
      <div className="min-h-screen bg-[#0e0f15] text-white flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-[#13141b] rounded-3xl border border-[#20222f] shadow-2xl overflow-hidden min-h-[680px] flex flex-col">
          {renderScreen()}
        </div>
      </div>
    );
  }

  const showBottomNavOnMobile = [
    'home',
    'people',
    'communities',
    'inbox',
    'profile',
    'my_events',
    'notifications'
  ].includes(currentScreen);

  const mobileNavItems: Array<{ id: ScreenId; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { id: 'people', label: 'People', icon: <Users className="w-5 h-5" /> },
    {
      id: isHostVerified ? 'create_step1_type' : 'become_host',
      label: isHostVerified ? 'Host' : 'Be Host',
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/40 transform -translate-y-2">
          {isHostVerified ? (
            <PlusCircle className="w-5 h-5 stroke-[2.4]" />
          ) : (
            <Crown className="w-5 h-5 text-amber-300" />
          )}
        </div>
      )
    },
    { id: 'inbox', label: 'Inbox', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0e0f15] text-white flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Real Production Top Bar (User only, no admin button) */}
      <ProductionTopNavbar />

      {/* Main Full-App Layout */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto relative">
        {/* Desktop Left Navigation Sidebar */}
        <div className="hidden lg:block shrink-0">
          <DesktopSidebar />
        </div>

        {/* Center Responsive Main Workspace */}
        <main className="flex-1 min-h-[calc(100vh-61px)] border-x border-[#1c1e2a] bg-[#13141b] flex flex-col pb-20 lg:pb-8 overflow-y-auto">
          <div className="max-w-4xl w-full mx-auto p-3 sm:p-6 flex-1 flex flex-col">
            {renderScreen()}
          </div>
        </main>

        {/* Desktop Right Context Sidebar (Live Radar & Top Curators) */}
        <DesktopRightPanel />

        {/* Mobile Native-Style Bottom Navigation Bar */}
        {showBottomNavOnMobile && (
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#141520]/95 backdrop-blur-2xl border-t border-[#232535] px-4 py-2 flex justify-around items-center z-40 shadow-2xl">
            {mobileNavItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex flex-col items-center gap-0.5 transition ${
                    isActive ? 'text-purple-400 font-bold' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {item.icon}
                  <span className="text-[10px]">{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainScreenRouter />
    </AppProvider>
  );
};

export default App;
