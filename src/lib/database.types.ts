// Auto-generated Supabase database types for Planora
// Re-generate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          handle: string;
          avatar_url: string | null;
          bio: string | null;
          city: string | null;
          profession: string | null;
          rating: number;
          interests: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          category: string;
          image_url: string;
          date: string;
          time: string;
          venue: string;
          city: string;
          price: number;
          total_capacity: number;
          attending_count: number;
          host_id: string;
          vibe_description: string;
          vibe_tags: string[];
          rules: string[];
          is_curated: boolean;
          has_host_approval: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      communities: {
        Row: {
          id: string;
          name: string;
          category: string;
          image_url: string;
          members_count: number;
          gatherings_count: number;
          rating: number;
          description: string;
          tags: string[];
          upcoming_events: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['communities']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['communities']['Insert']>;
      };
      rsvps: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          status: 'pending' | 'approved' | 'declined';
          note: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['rsvps']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['rsvps']['Insert']>;
      };
      chat_messages: {
        Row: {
          id: string;
          event_id: string;
          sender_id: string;
          text: string;
          image_attachment: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['chat_messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['chat_messages']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'approval' | 'invite' | 'community' | 'safety';
          title: string;
          description: string;
          read: boolean;
          action_screen: string | null;
          avatar: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
      community_members: {
        Row: {
          community_id: string;
          user_id: string;
          role: 'member' | 'curator' | 'admin';
          joined_at: string;
        };
        Insert: Omit<Database['public']['Tables']['community_members']['Row'], 'joined_at'>;
        Update: Partial<Database['public']['Tables']['community_members']['Insert']>;
      };
    };
  };
}
