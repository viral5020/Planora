import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ScreenId, EventItem, CommunityItem, PersonItem, GuestRequest, ChatMessage, NotificationItem } from '../types';
import {
  INITIAL_EVENTS,
  INITIAL_COMMUNITIES,
  INITIAL_PEOPLE,
  INITIAL_GUEST_REQUESTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { supabase } from '../lib/supabase';

// ─── Check if Supabase is configured ───────────────────────────────────────────
const SUPABASE_CONFIGURED =
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'placeholder-key';

interface AppContextType {
  currentScreen: ScreenId;
  screenHistory: ScreenId[];
  navigateTo: (screen: ScreenId) => void;
  goBack: () => void;
  deviceViewMode: 'mobile' | 'expanded';
  setDeviceViewMode: (mode: 'mobile' | 'expanded') => void;
  viewMode: 'desktop' | 'mobile_sim' | 'responsive';
  setViewMode: (mode: 'desktop' | 'mobile_sim' | 'responsive') => void;

  // Auth
  userId: string | null;
  userProfile: { name: string; handle: string; avatar: string } | null;

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
  eventsLoading: boolean;
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

  // Auth state
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{ name: string; handle: string; avatar: string } | null>(null);

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
  const [eventsLoading, setEventsLoading] = useState(false);
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

  // ─── Supabase: Auth listener ────────────────────────────────────────────────
  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadUserProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadUserProfile(session.user.id);
      } else {
        setUserId(null);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (uid: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('name, handle, avatar_url')
      .eq('id', uid)
      .single();

    if (data) {
      setUserProfile({
        name: data.name,
        handle: data.handle ?? '@user',
        avatar: data.avatar_url ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      });
    }
  };

  // ─── Supabase: Fetch events ─────────────────────────────────────────────────
  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;

    const fetchEvents = async () => {
      setEventsLoading(true);
      try {
        const { data, error } = await supabase
          .from('events')
          .select(`
            *,
            host:profiles!host_id(name, handle, avatar_url, rating)
          `)
          .eq('city', selectedCity)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: EventItem[] = data.map((e: any) => ({
            id: e.id,
            title: e.title,
            subtitle: e.subtitle ?? undefined,
            category: e.category,
            image: e.image_url,
            date: e.date,
            time: e.time,
            venue: e.venue,
            city: e.city,
            price: e.price,
            totalCapacity: e.total_capacity,
            attendingCount: e.attending_count,
            host: {
              name: e.host?.name ?? 'Host',
              handle: e.host?.handle ?? '@host',
              avatar: e.host?.avatar_url ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              rating: e.host?.rating ?? 4.5,
              badge: 'Verified Host',
            },
            vibeDescription: e.vibe_description,
            vibeTags: e.vibe_tags ?? [],
            rules: e.rules ?? [],
            status: 'none' as const,
            isCurated: e.is_curated,
            hasHostApproval: e.has_host_approval,
          }));
          setEvents(mapped);
          setSelectedEvent(mapped[0]);
        }
      } catch (err) {
        console.warn('[Planora] Events fetch failed, using mock data:', err);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCity]);

  // ─── Supabase: Fetch notifications ─────────────────────────────────────────
  useEffect(() => {
    if (!SUPABASE_CONFIGURED || !userId) return;

    const fetchNotifs = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setNotifications(data.map((n: any) => ({
          id: n.id,
          type: n.type,
          title: n.title,
          description: n.description,
          timeAgo: formatTimeAgo(n.created_at),
          avatar: n.avatar ?? undefined,
          read: n.read,
          actionScreen: n.action_screen ?? undefined,
        })));
      }
    };

    fetchNotifs();

    // Real-time notifications
    const channel = supabase
      .channel(`notifs_${userId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, (payload) => {
        const n = payload.new as any;
        setNotifications(prev => [{
          id: n.id, type: n.type, title: n.title,
          description: n.description, timeAgo: 'Just now',
          read: false, actionScreen: n.action_screen ?? undefined,
        }, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  // ─── Supabase: Real-time chat ───────────────────────────────────────────────
  useEffect(() => {
    if (!SUPABASE_CONFIGURED || !selectedEvent?.id) return;

    const channel = supabase
      .channel(`chat_${selectedEvent.id}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'chat_messages',
        filter: `event_id=eq.${selectedEvent.id}`
      }, async (payload) => {
        const { data: sender } = await supabase
          .from('profiles')
          .select('name, avatar_url')
          .eq('id', payload.new.sender_id)
          .single();

        setChatMessages(prev => [...prev, {
          id: payload.new.id,
          senderName: sender?.name ?? 'User',
          senderAvatar: sender?.avatar_url ?? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
          text: payload.new.text,
          timestamp: 'Just now',
          isCurrentUser: payload.new.sender_id === userId,
        }]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [selectedEvent?.id, userId]);

  // ─── Navigation ─────────────────────────────────────────────────────────────
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

  const requestRSVP = async (eventId: string) => {
    if (SUPABASE_CONFIGURED && userId) {
      // Check existing
      const { data: existing } = await supabase
        .from('rsvps')
        .select('id, status')
        .eq('event_id', eventId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        await supabase.from('rsvps').delete().eq('id', existing.id);
        setEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: 'none' as const } : e));
      } else {
        const event = events.find(e => e.id === eventId);
        const newStatus = event?.hasHostApproval ? 'pending' : 'approved';
        await supabase.from('rsvps').insert({ event_id: eventId, user_id: userId, status: newStatus });
        setEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: newStatus as 'pending' | 'approved' } : e));
      }
    } else {
      // Local mock toggle
      setEvents((prev) =>
        prev.map((e) => {
          if (e.id === eventId) {
            const nextStatus: 'none' | 'pending' | 'approved' =
              e.status === 'none' ? 'pending' : e.status === 'pending' ? 'approved' : 'none';
            const updated = {
              ...e,
              status: nextStatus,
              attendingCount: nextStatus === 'approved' ? e.attendingCount + 1 : e.attendingCount
            };
            if (selectedEvent.id === eventId) setSelectedEvent(updated);
            return updated;
          }
          return e;
        })
      );
    }
  };

  const approveGuest = async (id: string) => {
    if (SUPABASE_CONFIGURED) {
      await supabase.from('rsvps').update({ status: 'approved' }).eq('id', id);
    }
    setGuestRequests((prev) => prev.map((g) => (g.id === id ? { ...g, status: 'approved' as const } : g)));
  };

  const declineGuest = async (id: string) => {
    if (SUPABASE_CONFIGURED) {
      await supabase.from('rsvps').update({ status: 'declined' }).eq('id', id);
    }
    setGuestRequests((prev) => prev.map((g) => (g.id === id ? { ...g, status: 'declined' as const } : g)));
  };

  const sendChatMessage = async (text: string) => {
    if (!text.trim()) return;

    if (SUPABASE_CONFIGURED && userId) {
      await supabase.from('chat_messages').insert({
        event_id: selectedEvent.id,
        sender_id: userId,
        text: text.trim(),
      });
      // Real-time subscription adds message to state
    } else {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderName: userProfile?.name ?? 'Aarav Mehta',
        senderAvatar: userProfile?.avatar ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text,
        timestamp: 'Just now',
        isCurrentUser: true
      };
      setChatMessages((prev) => [...prev, newMsg]);
    }
  };

  const markNotificationRead = async (id: string) => {
    if (SUPABASE_CONFIGURED) {
      await supabase.from('notifications').update({ read: true }).eq('id', id);
    }
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const togglePrivacySetting = (key: string) => {
    setPrivacySettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const publishGatheringDraft = async () => {
    if (SUPABASE_CONFIGURED) {
      try {
        const { data, error } = await supabase.from('events').insert({
          title: gatheringDraft.title || 'New Gathering',
          category: gatheringDraft.category || 'Public Social Experience',
          image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
          date: gatheringDraft.date || 'Upcoming',
          time: gatheringDraft.time || 'TBD',
          venue: gatheringDraft.venue || 'Local Venue',
          city: selectedCity,
          price: Number(gatheringDraft.price) || 0,
          total_capacity: Number(gatheringDraft.capacity) || 50,
          attending_count: 1,
          host_id: userId || null,
          vibe_description: 'A newly created gathering on Planora.',
          vibe_tags: ['Community', 'Curated', gatheringDraft.category || 'Social'],
          rules: ['Respect fellow guests', 'Arrive on time'],
          is_curated: true,
          has_host_approval: gatheringDraft.approvalMode === 'approval',
        }).select().single();

        if (error) {
          console.error('[Planora] Error publishing to Supabase:', error);
        } else if (data) {
          const newEvent: EventItem = {
            id: data.id,
            title: data.title,
            category: data.category,
            image: data.image_url,
            date: data.date,
            time: data.time,
            venue: data.venue,
            city: data.city,
            price: data.price,
            totalCapacity: data.total_capacity,
            attendingCount: data.attending_count,
            host: {
              name: userProfile?.name ?? 'Aarav Mehta',
              handle: userProfile?.handle ?? '@aarav_surat',
              avatar: userProfile?.avatar ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              rating: 4.9,
              badge: 'Top Host',
            },
            vibeDescription: data.vibe_description,
            vibeTags: data.vibe_tags ?? ['Community', 'Curated'],
            rules: data.rules ?? ['Respect fellow guests'],
            status: 'approved',
            isCurated: data.is_curated,
            hasHostApproval: data.has_host_approval,
          };
          setEvents(prev => [newEvent, ...prev]);
          setSelectedEvent(newEvent);
          navigateTo('create_step4_success');
          return;
        }
      } catch (err) {
        console.error('[Planora] Unexpected error publishing gathering:', err);
      }
    }

    // Local fallback
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
        userId,
        userProfile,
        userPhone,
        setUserPhone,
        otpCode,
        setOtpCode,
        selectedInterests,
        toggleInterest,
        selectedCity,
        setSelectedCity,
        events,
        eventsLoading,
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

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
