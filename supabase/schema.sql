-- ============================================================
-- PLANORA — Supabase Database Schema
-- Run this in your Supabase project SQL editor
-- https://app.supabase.com → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL DEFAULT 'Planora User',
  handle      TEXT UNIQUE,
  avatar_url  TEXT,
  bio         TEXT,
  city        TEXT DEFAULT 'Mumbai',
  profession  TEXT,
  rating      NUMERIC(3,2) DEFAULT 4.5,
  interests   TEXT[] DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (TRUE);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, handle)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Planora User'),
    '@user_' || SUBSTRING(NEW.id::TEXT, 1, 8)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.events (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title             TEXT NOT NULL,
  subtitle          TEXT,
  category          TEXT NOT NULL DEFAULT 'Social',
  image_url         TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  date              TEXT NOT NULL,
  time              TEXT NOT NULL,
  venue             TEXT NOT NULL,
  city              TEXT NOT NULL DEFAULT 'Mumbai',
  price             INTEGER NOT NULL DEFAULT 0,
  total_capacity    INTEGER NOT NULL DEFAULT 50,
  attending_count   INTEGER NOT NULL DEFAULT 0,
  host_id           UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  vibe_description  TEXT NOT NULL DEFAULT 'An amazing gathering.',
  vibe_tags         TEXT[] DEFAULT '{}',
  rules             TEXT[] DEFAULT '{}',
  is_curated        BOOLEAN DEFAULT FALSE,
  has_host_approval BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON public.events FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create events"
  ON public.events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Hosts can update their events"
  ON public.events FOR UPDATE USING (auth.uid() = host_id);

-- ============================================================
-- COMMUNITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.communities (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  category          TEXT NOT NULL DEFAULT 'Social',
  image_url         TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  members_count     INTEGER DEFAULT 0,
  gatherings_count  INTEGER DEFAULT 0,
  rating            NUMERIC(3,2) DEFAULT 4.5,
  description       TEXT NOT NULL DEFAULT 'A vibrant community on Planora.',
  tags              TEXT[] DEFAULT '{}',
  upcoming_events   TEXT[] DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Communities are viewable by everyone"
  ON public.communities FOR SELECT USING (TRUE);

-- ============================================================
-- COMMUNITY MEMBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.community_members (
  community_id  UUID REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role          TEXT DEFAULT 'member' CHECK (role IN ('member', 'curator', 'admin')),
  joined_at     TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (community_id, user_id)
);

ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Community members are viewable by everyone"
  ON public.community_members FOR SELECT USING (TRUE);

CREATE POLICY "Users can join communities"
  ON public.community_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- RSVPs (Guest Requests)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.rsvps (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id    UUID REFERENCES public.events(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status      TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (event_id, user_id)
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own RSVPs"
  ON public.rsvps FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Event hosts can view RSVPs for their events"
  ON public.rsvps FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND host_id = auth.uid())
  );

CREATE POLICY "Authenticated users can create RSVPs"
  ON public.rsvps FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own RSVPs; hosts can approve/decline"
  ON public.rsvps FOR UPDATE USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND host_id = auth.uid())
  );

-- ============================================================
-- CHAT MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id          UUID REFERENCES public.events(id) ON DELETE CASCADE,
  sender_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  text              TEXT NOT NULL,
  image_attachment  TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Only approved RSVPs can read/write chat
CREATE POLICY "Approved attendees can view chat"
  ON public.chat_messages FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.rsvps
      WHERE event_id = chat_messages.event_id
        AND user_id = auth.uid()
        AND status = 'approved'
    ) OR
    EXISTS (
      SELECT 1 FROM public.events
      WHERE id = chat_messages.event_id AND host_id = auth.uid()
    )
  );

CREATE POLICY "Approved attendees can send messages"
  ON public.chat_messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND (
      EXISTS (
        SELECT 1 FROM public.rsvps
        WHERE event_id = chat_messages.event_id
          AND user_id = auth.uid()
          AND status = 'approved'
      ) OR
      EXISTS (
        SELECT 1 FROM public.events
        WHERE id = chat_messages.event_id AND host_id = auth.uid()
      )
    )
  );

-- Enable real-time for chat
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type          TEXT NOT NULL CHECK (type IN ('approval', 'invite', 'community', 'safety')),
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  read          BOOLEAN DEFAULT FALSE,
  action_screen TEXT,
  avatar        TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can mark their notifications as read"
  ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Enable real-time for notifications
ALTER TABLE public.notifications REPLICA IDENTITY FULL;

-- ============================================================
-- Enable Realtime on key tables
-- (Run in Supabase Dashboard → Database → Replication)
-- ============================================================
-- Or add via SQL:
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE
    public.chat_messages,
    public.notifications,
    public.rsvps;
COMMIT;
