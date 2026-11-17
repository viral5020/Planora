import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { ScreenId, EventItem, CommunityItem, PersonItem, GuestRequest, ChatMessage, NotificationItem } from '../types';
import {
  INITIAL_EVENTS,
  INITIAL_COMMUNITIES,
  INITIAL_PEOPLE,
  INITIAL_GUEST_REQUESTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface AppContextType {
  currentScreen: ScreenId;
  screenHistory: ScreenId[];
  navigateTo: (screen: ScreenId) => void;
  goBack: () => void;
  deviceViewMode: 'mobile' | 'expanded';
  setDeviceViewMode: (mode: 'mobile' | 'expanded') => void;
  viewMode: 'desktop' | 'mobile_sim' | 'responsive';
  setViewMode: (mode: 'desktop' | 'mobile_sim' | 'responsive') => void;

  // Onboarding state
  userPhone: string;
  setUserPhone: (phone: string) => void;
  otpCode: string[];
  setOtpCode: (otp: string[]) => void;
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  // Events & Communities
  events: EventItem[];
  selectedEvent: EventItem;
  setSelectedEvent: (event: EventItem) => void;
  requestRSVP: (eventId: string) => void;
  communities: CommunityItem[];
  selectedCommunity: CommunityItem;
  setSelectedCommunity: (comm: CommunityItem) => void;
  people: PersonItem[];

  // Create Gathering flow
  gatheringDraft: {
    type: string;
    title: string;
    category: string;
    date: string;
    time: string;
    venue: string;
    approvalMode: 'approval' | 'instant';
    capacity: number;
    price: number;
    icebreakers: boolean;
  };
  setGatheringDraft: React.Dispatch<React.SetStateAction<any>>;
  publishGatheringDraft: () => void;

  // Host Management
  guestRequests: GuestRequest[];
  approveGuest: (id: string) => void;
  declineGuest: (id: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  // Settings
  privacySettings: {
    radarMode: boolean;
    peopleMatching: boolean;
    ghostMode: boolean;
    incognito: boolean;
    pushNotifs: boolean;
    whatsappUpdates: boolean;
  };
  togglePrivacySetting: (key: string) => void;

  resetDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>(['home']);
  const [deviceViewMode, setDeviceViewMode] = useState<'mobile' | 'expanded'>('expanded');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile_sim' | 'responsive'>('desktop');

  // Onboarding
  const [userPhone, setUserPhone] = useState('+91 94026 12345');
  const [otpCode, setOtpCode] = useState(['7', '2', '9', '4']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Nightlife & Clubs',
    'Food & Rooftops',
    'Music & Mix'
  ]);
  const [selectedCity, setSelectedCity] = useState('Surat');

  // Events & Communities
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(INITIAL_EVENTS[0]);
  const [communities] = useState<CommunityItem[]>(INITIAL_COMMUNITIES);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityItem>(INITIAL_COMMUNITIES[0]);
  const [people] = useState<PersonItem[]>(INITIAL_PEOPLE);

  // Gathering draft
  const [gatheringDraft, setGatheringDraft] = useState({
    type: 'Public Social Experience',
    title: 'Midnight Vinyl & Tapas Social',
    category: 'Music & Nightlife',
    date: 'Saturday, 21 Oct 2026',
    time: '8:00 PM - 1:00 AM',
    venue: 'Skyline Terrace Lounge, Vesu, Surat',
    approvalMode: 'approval' as 'approval' | 'instant',
    capacity: 45,
    price: 499,
    icebreakers: true
  });

  // Host Guest requests
  const [guestRequests, setGuestRequests] = useState<GuestRequest[]>(INITIAL_GUEST_REQUESTS);

  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    radarMode: true,
    peopleMatching: true,
    ghostMode: false,
    incognito: false,
    pushNotifs: true,
    whatsappUpdates: true
  });

  const navigateTo = (screen: ScreenId) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const requestRSVP = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const nextStatus = e.status === 'none' ? 'pending' : e.status === 'pending' ? 'approved' : 'none';
          const updated = {
            ...e,
            status: nextStatus,
            attendingCount: nextStatus === 'approved' ? e.attendingCount + 1 : e.attendingCount
          };
          if (selectedEvent.id === eventId) {
            setSelectedEvent(updated);
          }
          return updated;
        }
        return e;
      })
    );
  };

  const approveGuest = (id: string) => {
    setGuestRequests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: 'approved' } : g))
    );
  };

  const declineGuest = (id: string) => {
    setGuestRequests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: 'declined' } : g))
    );
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: 'Aarav Mehta',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text,
      timestamp: 'Just now',
      isCurrentUser: true
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const togglePrivacySetting = (key: string) => {
    setPrivacySettings((prev: any) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const publishGatheringDraft = () => {
    const newEvent: EventItem = {
      id: `gathering-${Date.now()}`,
      title: gatheringDraft.title || 'New Gathering',
      category: gatheringDraft.category,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      date: gatheringDraft.date,
      time: gatheringDraft.time,
      venue: gatheringDraft.venue,
      city: selectedCity,
      price: gatheringDraft.price,
      totalCapacity: gatheringDraft.capacity,
      attendingCount: 1,
      host: {
        name: 'Aarav Mehta',
        handle: '@aarav_surat',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 4.9,
        badge: 'Top Host'
      },
      vibeDescription: 'A newly created gathering on Planora.',
      vibeTags: ['Community', 'Curated', gatheringDraft.category],
      rules: ['Respect fellow guests', 'Arrive on time'],
      status: 'approved',
      isCurated: true,
      hasHostApproval: gatheringDraft.approvalMode === 'approval'
    };

    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEvent(newEvent);
    navigateTo('create_step4_success');
  };

  const resetDemo = () => {
    setEvents(INITIAL_EVENTS);
    setSelectedEvent(INITIAL_EVENTS[0]);
    setGuestRequests(INITIAL_GUEST_REQUESTS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentScreen('home');
    setScreenHistory(['home']);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        screenHistory,
        navigateTo,
        goBack,
        deviceViewMode,
        setDeviceViewMode,
        viewMode,
        setViewMode,
        userPhone,
        setUserPhone,
        otpCode,
        setOtpCode,
        selectedInterests,
        toggleInterest,
        selectedCity,
        setSelectedCity,
        events,
        selectedEvent,
        setSelectedEvent,
        requestRSVP,
        communities,
        selectedCommunity,
        setSelectedCommunity,
        people,
        gatheringDraft,
        setGatheringDraft,
        publishGatheringDraft,
        guestRequests,
        approveGuest,
        declineGuest,
        chatMessages,
        sendChatMessage,
        notifications,
        markNotificationRead,
        privacySettings,
        togglePrivacySetting,
        resetDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
