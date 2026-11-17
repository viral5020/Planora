import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { NotificationItem, GuestRequest } from '../types';

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const fetch = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[useNotifications] fetch error:', error);
      } else {
        setNotifications(
          (data ?? []).map((n: any) => ({
            id: n.id,
            type: n.type,
            title: n.title,
            description: n.description,
            timeAgo: formatTimeAgo(n.created_at),
            avatar: n.avatar ?? undefined,
            read: n.read,
            actionScreen: n.action_screen ?? undefined,
          }))
        );
      }
      setLoading(false);
    };

    fetch();

    // Real-time
    const channel = supabase
      .channel(`notifications_${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        (payload) => {
          const n = payload.new as any;
          setNotifications(prev => [{
            id: n.id,
            type: n.type,
            title: n.title,
            description: n.description,
            timeAgo: 'Just now',
            avatar: n.avatar ?? undefined,
            read: false,
            actionScreen: n.action_screen ?? undefined,
          }, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const markRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return { notifications, loading, markRead, setNotifications };
}

export function useGuestRequests(hostId?: string) {
  const [guestRequests, setGuestRequests] = useState<GuestRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hostId) { setLoading(false); return; }

    const fetch = async () => {
      const { data, error } = await supabase
        .from('rsvps')
        .select(`
          id,
          status,
          note,
          created_at,
          user:profiles!user_id(name, avatar_url, profession),
          event:events!event_id(host_id)
        `)
        .eq('status', 'pending')
        .eq('event.host_id', hostId);

      if (error) {
        console.error('[useGuestRequests] fetch error:', error);
      } else {
        setGuestRequests(
          (data ?? []).map((r: any) => ({
            id: r.id,
            name: r.user?.name ?? 'Guest',
            avatar: r.user?.avatar_url ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            profession: r.user?.profession ?? 'Professional',
            timeAgo: formatTimeAgo(r.created_at),
            mutualCount: 0,
            note: r.note ?? 'Hey! Would love to attend.',
            status: r.status,
          }))
        );
      }
      setLoading(false);
    };

    fetch();
  }, [hostId]);

  const approveGuest = async (id: string) => {
    const { error } = await supabase
      .from('rsvps')
      .update({ status: 'approved' })
      .eq('id', id);

    if (!error) {
      setGuestRequests(prev => prev.map(g => g.id === id ? { ...g, status: 'approved' as const } : g));
    }
  };

  const declineGuest = async (id: string) => {
    const { error } = await supabase
      .from('rsvps')
      .update({ status: 'declined' })
      .eq('id', id);

    if (!error) {
      setGuestRequests(prev => prev.map(g => g.id === id ? { ...g, status: 'declined' as const } : g));
    }
  };

  return { guestRequests, loading, approveGuest, declineGuest };
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
