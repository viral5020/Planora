-- ============================================================
-- PLANORA — Admin, Host Verification & Event Approval Schema
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ezobcuvfmpzwpnacujas/sql
-- ============================================================

-- 1. Ensure uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Update profiles table with host & admin fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user',
  ADD COLUMN IF NOT EXISTS host_status TEXT DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS is_verified_host BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS host_applied_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS host_bio TEXT,
  ADD COLUMN IF NOT EXISTS host_category TEXT,
  ADD COLUMN IF NOT EXISTS host_experience TEXT;

-- 3. Update events table with verification status
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- For existing events, default to approved so they stay visible
UPDATE public.events
SET verification_status = 'approved'
WHERE verification_status IS NULL OR verification_status = 'pending';

-- 4. Host Applications Table (Tracks ₹300 payments & verification requests)
CREATE TABLE IF NOT EXISTS public.host_applications (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name           TEXT NOT NULL,
  user_email          TEXT,
  phone               TEXT,
  category            TEXT NOT NULL DEFAULT 'Social & Nightlife',
  experience_bio      TEXT,
  payment_amount      INTEGER DEFAULT 300,
  payment_status      TEXT DEFAULT 'paid', -- 'paid' | 'pending' | 'failed'
  payment_reference   TEXT,
  status              TEXT DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  admin_notes         TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at         TIMESTAMPTZ
);

ALTER TABLE public.host_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view applications" ON public.host_applications;
CREATE POLICY "Public can view applications" ON public.host_applications FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Anyone can apply" ON public.host_applications;
CREATE POLICY "Anyone can apply" ON public.host_applications FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Anyone can update application status" ON public.host_applications;
CREATE POLICY "Anyone can update application status" ON public.host_applications FOR UPDATE USING (TRUE);

DROP POLICY IF EXISTS "Anyone can delete application" ON public.host_applications;
CREATE POLICY "Anyone can delete application" ON public.host_applications FOR DELETE USING (TRUE);

-- 5. Open RLS on events for admin and host management
DROP POLICY IF EXISTS "Enable insert for all users" ON public.events;
CREATE POLICY "Enable insert for all users" ON public.events FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Enable update for all users" ON public.events;
CREATE POLICY "Enable update for all users" ON public.events FOR UPDATE USING (TRUE);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.events;
CREATE POLICY "Enable delete for all users" ON public.events FOR DELETE USING (TRUE);

DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (TRUE);

-- 6. Open RLS on profiles for updating host verification status
DROP POLICY IF EXISTS "Profiles can be updated by all" ON public.profiles;
CREATE POLICY "Profiles can be updated by all" ON public.profiles FOR UPDATE USING (TRUE);

DROP POLICY IF EXISTS "Profiles can be inserted by all" ON public.profiles;
CREATE POLICY "Profiles can be inserted by all" ON public.profiles FOR INSERT WITH CHECK (TRUE);

-- 7. Seed Real Surat Communities & Real Sample Events into Supabase
INSERT INTO public.communities (name, category, image_url, members_count, gatherings_count, rating, description, tags, upcoming_events)
VALUES
  (
    'Surat Vinyl & Indie Music Circle',
    'Music & Arts',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    438,
    18,
    4.9,
    'A dedicated collective of vinyl collectors, rotary sound purists, and bedroom DJ selectors across Surat.',
    ARRAY['Analog Vinyl', 'Audiophile', 'Deep House', 'Indie Rock'],
    ARRAY['Midnight Vinyl & Tapas', 'Lo-Fi Sunset Jam']
  ),
  (
    'Foodies of Surat & Late Night Crawls',
    'Food & Rooftops',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    612,
    29,
    4.8,
    'Exploring secret kitchen suppers, authentic Gujarati culinary evolutions, and 2 AM street food gems.',
    ARRAY['Secret Suppers', 'Gujarati Fusion', 'Late Night', 'Food Walks'],
    ARRAY['Dumas Road Midnight Dhaba Tour', 'Sunday Pour-Over Masterclass']
  ),
  (
    'Surat Turf Football & Sports League',
    'Sports & Turf',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    284,
    34,
    4.9,
    'Weekly 5v5 turf football, badminton mixers, and marathon runners. All fitness levels welcomed.',
    ARRAY['Turf Football', 'Badminton', 'Night Matches', 'Fitness'],
    ARRAY['Weekend Turf Clash (Vesu)', 'Morning 5K Riverside Run']
  ),
  (
    'Surat Founders & Creative Tech Salon',
    'Tech & Networking',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    345,
    12,
    4.7,
    'Casual weekend meetups for indie makers, textile tech founders, and designers sharing side-projects.',
    ARRAY['Startups', 'Side Projects', 'Design', 'AI Builders'],
    ARRAY['Sunday Coffee & Build Club', 'Founders Rooftop Mixer']
  )
ON CONFLICT DO NOTHING;

-- Seed verified sample gatherings in Surat
INSERT INTO public.events (
  title, subtitle, category, image_url, date, time, venue, city, price, total_capacity, attending_count,
  vibe_description, vibe_tags, rules, is_curated, has_host_approval, verification_status
)
VALUES
  (
    'Midnight Vinyl & Tapas Social',
    'Rooftop Acoustic Sessions & Tapas',
    'Music & Nightlife',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    'Saturday, Oct 21',
    '8:00 PM - 1:00 AM',
    'Skyline Terrace Lounge, 7th Floor, Vesu, Surat',
    'Surat',
    499,
    45,
    37,
    'A relaxed rooftop soiree for vinyl lovers, audiophiles, and tapas cravers with rotary mixers and Spanish small bites.',
    ARRAY['Analog Vinyl', 'Spanish Tapas', 'Terrace Views', 'Strict 21+'],
    ARRAY['Age restriction: 21+ (ID checked)', 'Zero tolerance for harassment', 'Smart casual dress code'],
    TRUE,
    TRUE,
    'approved'
  ),
  (
    'Rooftop Social & Sunset Beats',
    'Golden hour deep house and curated mocktails',
    'Nightlife & Clubs',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    'Tonight',
    '6:30 PM - 11:30 PM',
    'Amber Rooftop Lounge, Dumas Road, Surat',
    'Surat',
    350,
    50,
    42,
    'Curated rooftop sunset beats with analog lighting and chill lounge vibes over the city.',
    ARRAY['Sunset', 'Deep House', 'Rooftop', 'Mocktails'],
    ARRAY['Entry by approved RSVP only', 'Arrive by 7:30 PM for sunset drinks'],
    TRUE,
    TRUE,
    'approved'
  ),
  (
    'Weekend Turf Football Clash',
    '5v5 competitive friendly with refreshments',
    'Sports & Turf',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    'Sunday, 7:00 AM',
    '7:00 AM - 9:30 AM',
    'Arena 9 Turf, VIP Road, Vesu, Surat',
    'Surat',
    150,
    16,
    14,
    'High energy Sunday morning turf football match with post-game electrolyte coconut water.',
    ARRAY['Football', 'Morning Workout', 'Sports', 'Competitive'],
    ARRAY['Wear turf studs or sneakers', 'Bring a water bottle'],
    FALSE,
    FALSE,
    'approved'
  )
ON CONFLICT DO NOTHING;
