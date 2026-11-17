import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { EventItem } from '../types';

function mapDbEventToEventItem(dbEvent: any, rsvpStatus: 'none' | 'pending' | 'approved' = 'none', hostProfile?: any): EventItem {
  return {
    id: dbEvent.id,
    title: dbEvent.title,
    subtitle: dbEvent.subtitle ?? undefined,
    category: dbEvent.category,
    image: dbEvent.image_url,
    date: dbEvent.date,
    time: dbEvent.time,
    venue: dbEvent.venue,
    city: dbEvent.city,
    price: dbEvent.price,
    totalCapacity: dbEvent.total_capacity,
    attendingCount: dbEvent.attending_count,
    host: {
      name: hostProfile?.name ?? 'Host',
      handle: hostProfile?.handle ?? '@host',
      avatar: hostProfile?.avatar_url ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: hostProfile?.rating ?? 4.5,
      badge: 'Verified Host',
    },
    vibeDescription: dbEvent.vibe_description,
    vibeTags: dbEvent.vibe_tags ?? [],
    rules: dbEvent.rules ?? [],
    status: rsvpStatus,
    isCurated: dbEvent.is_curated,
    hasHostApproval: dbEvent.has_host_approval,
  };
}

export function useEvents(city?: string) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('events')
        .select(`
          *,
          host:profiles!host_id(name, handle, avatar_url, rating)
        `)
        .order('created_at', { ascending: false });

      if (city) {
        query = query.eq('city', city);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      const mapped = (data ?? []).map((e: any) =>
        mapDbEventToEventItem(e, 'none', e.host)
      );
      setEvents(mapped);
    } catch (err: any) {
      setError(err.message);
      console.error('[useEvents] fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [city]);

  const requestRSVP = async (eventId: string, userId: string) => {
    try {
      // Check existing RSVP
      const { data: existing } = await supabase
        .from('rsvps')
        .select('id, status')
        .eq('event_id', eventId)
        .eq('user_id', userId)
        .single();

      if (existing) {
        // Toggle: cancel RSVP
        await supabase.from('rsvps').delete().eq('id', existing.id);
        setEvents(prev =>
          prev.map(e => e.id === eventId ? { ...e, status: 'none' as const } : e)
        );
      } else {
        // Create RSVP
        const { data: event } = await supabase
          .from('events')
          .select('has_host_approval')
          .eq('id', eventId)
          .single();

        const newStatus = event?.has_host_approval ? 'pending' : 'approved';

        await supabase.from('rsvps').insert({
          event_id: eventId,
          user_id: userId,
          status: newStatus,
        });

        if (newStatus === 'approved') {
          await supabase
            .from('events')
            .update({ attending_count: supabase.rpc as any })
            .eq('id', eventId);
        }

        setEvents(prev =>
          prev.map(e => e.id === eventId ? { ...e, status: newStatus as 'pending' | 'approved' } : e)
        );
      }
    } catch (err: any) {
      console.error('[useEvents] RSVP error:', err);
    }
  };

  const publishEvent = async (eventData: Omit<EventItem, 'id' | 'host' | 'status'>, hostId: string) => {
    try {
      const { data, error: insertError } = await supabase
        .from('events')
        .insert({
          title: eventData.title,
          subtitle: eventData.subtitle,
          category: eventData.category,
          image_url: eventData.image,
          date: eventData.date,
          time: eventData.time,
          venue: eventData.venue,
          city: eventData.city,
          price: eventData.price,
          total_capacity: eventData.totalCapacity,
          attending_count: 1,
          host_id: hostId,
          vibe_description: eventData.vibeDescription,
          vibe_tags: eventData.vibeTags,
          rules: eventData.rules,
          is_curated: eventData.isCurated ?? false,
          has_host_approval: eventData.hasHostApproval ?? false,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      return data;
    } catch (err: any) {
      console.error('[useEvents] publish error:', err);
      throw err;
    }
  };

  return { events, loading, error, fetchEvents, requestRSVP, publishEvent, setEvents };
}
