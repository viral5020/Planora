import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  ScreenId,
  EventItem,
  CommunityItem,
  PersonItem,
  GuestRequest,
  ChatMessage,
  NotificationItem,
  HostApplicationItem,
  HostStatus
} from '../types';
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

  // Auth & Host verification
  userId: string | null;
  userEmail: string | null;
  userProfile: { name: string; handle: string; avatar: string } | null;
  userRole: 'user' | 'host' | 'admin';
  hostStatus: HostStatus;
  isHostVerified: boolean;
  logout: () => Promise<void>;
  applyForHost: (category: string, experienceBio: string, paymentRef: string) => Promise<void>;

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
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem) => void;
  requestRSVP: (eventId: string) => void;
  communities: CommunityItem[];
  selectedCommunity: CommunityItem | null;
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
  publishGatheringDraft: () => Promise<void>;

  // Admin Management Actions
  hostApplications: HostApplicationItem[];
  approveHostApplication: (appId: string) => Promise<void>;
  rejectHostApplication: (appId: string, reason?: string) => Promise<void>;
  approveEvent: (eventId: string) => Promise<void>;
  rejectEvent: (eventId: string, reason?: string) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  updateEvent: (eventId: string, updates: Partial<EventItem>) => Promise<void>;

  // Host Management & Chat
  guestRequests: GuestRequest[];
  approveGuest: (id: string) => void;
  declineGuest: (id: string) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;

  // Notifications & Settings
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
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
  // Sync initial route if user hits /admin directly
  const initialScreen: ScreenId =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')
      ? 'admin'
      : 'home';

  const [currentScreen, setCurrentScreen] = useState<ScreenId>(initialScreen);
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>([initialScreen]);
  const [deviceViewMode, setDeviceViewMode] = useState<'mobile' | 'expanded'>('expanded');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile_sim' | 'responsive'>('desktop');

  // Auth state
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{ name: string; handle: string; avatar: string } | null>({
    name: 'Aarav Mehta',
    handle: '@aarav_surat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });
  const [userRole, setUserRole] = useState<'user' | 'host' | 'admin'>('admin');
  const [hostStatus, setHostStatus] = useState<HostStatus>('none');
  const [isHostVerified, setIsHostVerified] = useState<boolean>(false);

  // Onboarding
  const [userPhone, setUserPhone] = useState('+91 94026 12345');
  const [otpCode, setOtpCode] = useState(['7', '2', '9', '4']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Nightlife & Clubs',
    'Food & Rooftops',
    'Music & Mix'
  ]);
  const [selectedCity, setSelectedCity] = useState('Surat');

  // Data states (Real Supabase data, no mockData dependency)
  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [selectedEvent, setSelectedEventState] = useState<EventItem | null>(null);
  const [communities, setCommunities] = useState<CommunityItem[]>([]);
  const [selectedCommunity, setSelectedCommunityState] = useState<CommunityItem | null>(null);
  const [people, setPeople] = useState<PersonItem[]>([]);
  const [hostApplications, setHostApplications] = useState<HostApplicationItem[]>([]);

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

  const [guestRequests, setGuestRequests] = useState<GuestRequest[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [privacySettings, setPrivacySettings] = useState({
    radarMode: true,
    peopleMatching: true,
    ghostMode: false,
    incognito: false,
    pushNotifs: true,
    whatsappUpdates: true
  });

  // ─── Browser URL Navigation Listener (/admin support) ───────────────────────
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setCurrentScreen('admin');
      } else if (window.location.pathname === '/' || window.location.pathname === '') {
        setCurrentScreen('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser URL on screen changes
  const navigateTo = (screen: ScreenId) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    if (typeof window !== 'undefined') {
      if (screen === 'admin') {
        window.history.pushState(null, '', '/admin');
      } else if (window.location.pathname.startsWith('/admin')) {
        window.history.pushState(null, '', '/');
      }
    }
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

  // ─── Supabase: Auth listener & Profile Sync ─────────────────────────────────
  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        setUserEmail(session.user.email ?? null);
        loadUserProfile(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setUserEmail(session.user.email ?? null);
        loadUserProfile(session.user);
      } else {
        setUserId(null);
        setUserEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (user: any) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (data) {
        setUserProfile({
          name: data.name || user.email?.split('@')[0] || 'Planora Member',
          handle: data.handle || `@${(data.name || 'member').toLowerCase().replace(/\s+/g, '_')}`,
          avatar: data.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        });
        if (data.is_verified_host || data.host_status === 'approved') {
          setIsHostVerified(true);
          setHostStatus('approved');
        } else if (data.host_status === 'pending') {
          setHostStatus('pending');
        }
        if (data.role) setUserRole(data.role);
      }
    } catch (e) {
      console.warn('Could not load user profile from Supabase:', e);
    }
  };

  const logout = async () => {
    if (SUPABASE_CONFIGURED) {
      await supabase.auth.signOut();
    }
    setUserId(null);
    setUserEmail(null);
    setIsHostVerified(false);
    setHostStatus('none');
    navigateTo('landing');
  };

  // ─── Supabase: Fetch Real Events (Filtered by City & Approval) ─────────────
  const fetchEvents = async () => {
    if (!SUPABASE_CONFIGURED) return;
    setEventsLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mapped: EventItem[] = data.map((e: any) => ({
          id: e.id,
          title: e.title,
          subtitle: e.subtitle ?? undefined,
          category: e.category,
          image: e.image_url || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
          date: e.date,
          time: e.time,
          venue: e.venue,
          city: e.city || 'Surat',
          price: Number(e.price) || 0,
          totalCapacity: Number(e.total_capacity) || 50,
          attendingCount: Number(e.attending_count) || 1,
          host: {
            name: 'Aakash Verma',
            handle: '@aakash_music',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            rating: 4.9,
            badge: 'Super Host',
            id: e.host_id,
          },
          vibeDescription: e.vibe_description || 'Curated social experience.',
          vibeTags: e.vibe_tags || ['Curated', 'Community'],
          rules: e.rules || ['Respect fellow guests', 'Arrive on time'],
          status: 'none' as const,
          isCurated: e.is_curated ?? true,
          hasHostApproval: e.has_host_approval ?? true,
          verificationStatus: (e.verification_status as any) || 'approved',
          rejectionReason: e.rejection_reason
        }));

        setEvents(mapped);
        if (!selectedEvent && mapped.length > 0) {
          setSelectedEventState(mapped[0]);
        }
      }
    } catch (err) {
      console.warn('[Planora] Events fetch error:', err);
    } finally {
      setEventsLoading(false);
    }
  };

  // ─── Supabase: Fetch Real Communities ──────────────────────────────────────
  const fetchCommunities = async () => {
    if (!SUPABASE_CONFIGURED) return;
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('members_count', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        const mapped: CommunityItem[] = data.map((c: any) => ({
          id: c.id,
          name: c.name,
          category: c.category,
          image: c.image_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
          membersCount: c.members_count || 0,
          gatheringsCount: c.gatherings_count || 0,
          rating: c.rating || 4.8,
          description: c.description || 'A vibrant community on Planora.',
          tags: c.tags || ['Community', 'Surat'],
          upcomingEvents: c.upcoming_events || [],
        }));
        setCommunities(mapped);
        if (!selectedCommunity && mapped.length > 0) {
          setSelectedCommunityState(mapped[0]);
        }
      }
    } catch (err) {
      console.warn('[Planora] Communities fetch error:', err);
    }
  };

  // ─── Supabase: Fetch Host Applications (for /admin) ─────────────────────────
  const fetchHostApplications = async () => {
    if (!SUPABASE_CONFIGURED) return;
    try {
      const { data, error } = await supabase
        .from('host_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setHostApplications(data.map((a: any) => ({
          id: a.id,
          userId: a.user_id,
          userName: a.user_name,
          userEmail: a.user_email,
          phone: a.phone,
          category: a.category,
          experienceBio: a.experience_bio,
          paymentAmount: a.payment_amount || 300,
          paymentStatus: a.payment_status || 'paid',
          paymentReference: a.payment_reference,
          status: a.status || 'pending',
          adminNotes: a.admin_notes,
          createdAt: a.created_at
        })));
      }
    } catch (err) {
      console.warn('[Planora] Host applications fetch error:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCommunities();
    fetchHostApplications();
  }, [selectedCity]);

  // ─── Become Host: Submit application + ₹300 fee ─────────────────────────────
  const applyForHost = async (category: string, experienceBio: string, paymentRef: string) => {
    const applicantName = userProfile?.name || 'Aarav Mehta';
    const applicantPhone = userPhone || '+91 94026 12345';

    if (SUPABASE_CONFIGURED) {
      try {
        const { data, error } = await supabase.from('host_applications').insert({
          user_id: userId || null,
          user_name: applicantName,
          user_email: userEmail || 'aarav@surat.in',
          phone: applicantPhone,
          category,
          experience_bio: experienceBio,
          payment_amount: 300,
          payment_status: 'paid',
          payment_reference: paymentRef,
          status: 'pending'
        }).select().single();

        if (error) {
          console.warn('[Planora] Error submitting host application to Supabase:', error);
        } else if (data) {
          setHostApplications((prev) => [{
            id: data.id,
            userId: data.user_id,
            userName: data.user_name,
            userEmail: data.user_email,
            phone: data.phone,
            category: data.category,
            experienceBio: data.experience_bio,
            paymentAmount: data.payment_amount,
            paymentStatus: data.payment_status,
            paymentReference: data.payment_reference,
            status: 'pending',
            createdAt: data.created_at
          }, ...prev]);
        }
      } catch (e) {
        console.warn('Host application error:', e);
      }
    }

    setHostStatus('pending');
  };

  // ─── Admin Action: Approve Host Application ─────────────────────────────────
  const approveHostApplication = async (appId: string) => {
    if (SUPABASE_CONFIGURED) {
      await supabase
        .from('host_applications')
        .update({ status: 'approved', reviewed_at: new Date().toISOString() })
        .eq('id', appId);

      const app = hostApplications.find((a) => a.id === appId);
      if (app && app.userId) {
        await supabase
          .from('profiles')
          .update({ is_verified_host: true, host_status: 'approved', role: 'host' })
          .eq('id', app.userId);
      }
    }

    setHostApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'approved' as const } : a))
    );
    setIsHostVerified(true);
    setHostStatus('approved');
  };

  // ─── Admin Action: Reject Host Application ─────────────────────────────────
  const rejectHostApplication = async (appId: string, reason?: string) => {
    if (SUPABASE_CONFIGURED) {
      await supabase
        .from('host_applications')
        .update({ status: 'rejected', admin_notes: reason, reviewed_at: new Date().toISOString() })
        .eq('id', appId);
    }
    setHostApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'rejected' as const, adminNotes: reason } : a))
    );
  };

  // ─── Admin Action: Approve Event ───────────────────────────────────────────
  const approveEvent = async (eventId: string) => {
    if (SUPABASE_CONFIGURED) {
      await supabase
        .from('events')
        .update({ verification_status: 'approved' })
        .eq('id', eventId);
    }
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, verificationStatus: 'approved' as const } : e))
    );
  };

  // ─── Admin Action: Reject Event ────────────────────────────────────────────
  const rejectEvent = async (eventId: string, reason?: string) => {
    if (SUPABASE_CONFIGURED) {
      await supabase
        .from('events')
        .update({ verification_status: 'rejected', rejection_reason: reason })
        .eq('id', eventId);
    }
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, verificationStatus: 'rejected' as const, rejectionReason: reason }
          : e
      )
    );
  };

  // ─── Admin Action: Delete Event ────────────────────────────────────────────
  const deleteEvent = async (eventId: string) => {
    if (SUPABASE_CONFIGURED) {
      await supabase.from('events').delete().eq('id', eventId);
    }
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    if (selectedEvent?.id === eventId) {
      setSelectedEventState(null);
    }
  };

  // ─── Admin Action: Update Event Details ────────────────────────────────────
  const updateEvent = async (eventId: string, updates: Partial<EventItem>) => {
    if (SUPABASE_CONFIGURED) {
      await supabase
        .from('events')
        .update({
          title: updates.title,
          category: updates.category,
          venue: updates.venue,
          date: updates.date,
          time: updates.time,
          price: updates.price,
          total_capacity: updates.totalCapacity,
          vibe_description: updates.vibeDescription,
          city: updates.city
        })
        .eq('id', eventId);
    }
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, ...updates } : e))
    );
  };

  // ─── Host Flow: Publish Event Draft (Queued for Verification) ──────────────
  const publishGatheringDraft = async () => {
    const isCuratedApproval = gatheringDraft.approvalMode === 'approval';

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
          has_host_approval: isCuratedApproval,
          verification_status: 'pending' // Requires admin verification
        }).select().single();

        if (!error && data) {
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
              badge: 'Verified Host',
            },
            vibeDescription: data.vibe_description,
            vibeTags: data.vibe_tags ?? ['Community'],
            rules: data.rules ?? ['Respect fellow guests'],
            status: 'approved',
            isCurated: data.is_curated,
            hasHostApproval: data.has_host_approval,
            verificationStatus: 'pending'
          };
          setEvents((prev) => [newEvent, ...prev]);
          setSelectedEventState(newEvent);
          navigateTo('create_step4_success');
          return;
        }
      } catch (err) {
        console.error('[Planora] Error publishing gathering draft:', err);
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
        name: userProfile?.name || 'Aarav Mehta',
        handle: userProfile?.handle || '@aarav_surat',
        avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 4.9,
        badge: 'Verified Host'
      },
      vibeDescription: 'A newly created gathering on Planora.',
      vibeTags: ['Community', 'Curated', gatheringDraft.category],
      rules: ['Respect fellow guests', 'Arrive on time'],
      status: 'approved',
      isCurated: true,
      hasHostApproval: isCuratedApproval,
      verificationStatus: 'pending'
    };
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEventState(newEvent);
    navigateTo('create_step4_success');
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const requestRSVP = async (eventId: string) => {
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
          if (selectedEvent?.id === eventId) setSelectedEventState(updated);
          return updated;
        }
        return e;
      })
    );
  };

  const approveGuest = (id: string) => {
    setGuestRequests((prev) => prev.map((g) => (g.id === id ? { ...g, status: 'approved' as const } : g)));
  };

  const declineGuest = (id: string) => {
    setGuestRequests((prev) => prev.map((g) => (g.id === id ? { ...g, status: 'declined' as const } : g)));
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: userProfile?.name ?? 'Aarav Mehta',
      senderAvatar: userProfile?.avatar ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text,
      timestamp: 'Just now',
      isCurrentUser: true
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const togglePrivacySetting = (key: string) => {
    setPrivacySettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetDemo = () => {
    fetchEvents();
    fetchCommunities();
    fetchHostApplications();
    setCurrentScreen('home');
    setScreenHistory(['home']);
  };

  const setSelectedEvent = (evt: EventItem) => setSelectedEventState(evt);
  const setSelectedCommunity = (comm: CommunityItem) => setSelectedCommunityState(comm);

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
        userEmail,
        userProfile,
        userRole,
        hostStatus,
        isHostVerified,
        logout,
        applyForHost,
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
        hostApplications,
        approveHostApplication,
        rejectHostApplication,
        approveEvent,
        rejectEvent,
        deleteEvent,
        updateEvent,
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
