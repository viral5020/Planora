import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { ChatMessage } from '../types';

function mapDbMessage(db: any): ChatMessage {
  return {
    id: db.id,
    senderName: db.sender?.name ?? 'Unknown',
    senderAvatar: db.sender?.avatar_url ?? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    text: db.text,
    timestamp: new Date(db.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    imageAttachment: db.image_attachment ?? undefined,
    isCurrentUser: false, // Set by caller based on current user id
    isHost: false,
  };
}

export function useChat(eventId: string, currentUserId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    if (!eventId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          sender:profiles!sender_id(name, avatar_url)
        `)
        .eq('event_id', eventId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('[useChat] fetch error:', error);
      } else {
        setMessages(
          (data ?? []).map((m: any) => ({
            ...mapDbMessage(m),
            isCurrentUser: m.sender_id === currentUserId,
          }))
        );
      }
      setLoading(false);
    };

    fetchMessages();

    // Real-time subscription
    const channel = supabase
      .channel(`event_chat_${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `event_id=eq.${eventId}`,
        },
        async (payload) => {
          // Fetch sender profile for new message
          const { data: sender } = await supabase
            .from('profiles')
            .select('name, avatar_url')
            .eq('id', payload.new.sender_id)
            .single();

          const newMsg: ChatMessage = {
            id: payload.new.id,
            senderName: sender?.name ?? 'Unknown',
            senderAvatar: sender?.avatar_url ?? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
            text: payload.new.text,
            timestamp: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            imageAttachment: payload.new.image_attachment ?? undefined,
            isCurrentUser: payload.new.sender_id === currentUserId,
          };

          setMessages(prev => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId, currentUserId]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !currentUserId) return;

    const { error } = await supabase.from('chat_messages').insert({
      event_id: eventId,
      sender_id: currentUserId,
      text: text.trim(),
    });

    if (error) {
      console.error('[useChat] send error:', error);
    }
  }, [eventId, currentUserId]);

  return { messages, loading, sendMessage };
}
