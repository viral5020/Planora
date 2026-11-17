import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { CommunityItem } from '../types';

function mapDbCommunity(db: any): CommunityItem {
  return {
    id: db.id,
    name: db.name,
    category: db.category,
    image: db.image_url,
    membersCount: db.members_count,
    gatheringsCount: db.gatherings_count,
    rating: db.rating,
    description: db.description,
    tags: db.tags ?? [],
    upcomingEvents: db.upcoming_events ?? [],
    members: db.members ?? [],
  };
}

export function useCommunities() {
  const [communities, setCommunities] = useState<CommunityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, error: err } = await supabase
          .from('communities')
          .select('*')
          .order('members_count', { ascending: false });

        if (err) throw err;
        setCommunities((data ?? []).map(mapDbCommunity));
      } catch (e: any) {
        setError(e.message);
        console.error('[useCommunities] fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { communities, loading, error };
}
