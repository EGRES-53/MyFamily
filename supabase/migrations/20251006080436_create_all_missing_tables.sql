/*
  # Create All Missing Tables for Timeline App
  
  1. New Tables
    - `events` - Timeline events
    - `persons` - People in family tree
    - `media` - Photos and documents
    - `relations` - Family relationships
  
  2. Security
    - Enable RLS on all tables
    - Authenticated users can manage their own data
    - Public can view events (for shared timelines)
  
  3. Storage
    - Create media bucket for uploads
*/

-- ============================================
-- TABLE: events
-- ============================================
CREATE TABLE IF NOT EXISTS public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  precise_date boolean DEFAULT true NOT NULL,
  location text,
  category text,
  created_by uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON public.events(created_by);
CREATE INDEX IF NOT EXISTS idx_events_category ON public.events(category);

-- ============================================
-- TABLE: persons
-- ============================================
CREATE TABLE IF NOT EXISTS public.persons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  birth_date date,
  death_date date,
  bio text,
  photo_url text,
  created_by uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_persons_created_by ON public.persons(created_by);
CREATE INDEX IF NOT EXISTS idx_persons_name ON public.persons(last_name, first_name);

-- ============================================
-- TABLE: media
-- ============================================
CREATE TABLE IF NOT EXISTS public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_type text NOT NULL,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  created_by uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_media_event_id ON public.media(event_id);
CREATE INDEX IF NOT EXISTS idx_media_created_by ON public.media(created_by);

-- ============================================
-- TABLE: relations
-- ============================================
CREATE TABLE IF NOT EXISTS public.relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person1_id uuid REFERENCES public.persons(id) ON DELETE CASCADE NOT NULL,
  person2_id uuid REFERENCES public.persons(id) ON DELETE CASCADE NOT NULL,
  relation_type text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_relations_person1 ON public.relations(person1_id);
CREATE INDEX IF NOT EXISTS idx_relations_person2 ON public.relations(person2_id);

-- ============================================
-- ENABLE RLS
-- ============================================
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES: events
-- ============================================
DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Users can update their own events" ON public.events;
DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;

CREATE POLICY "Events are viewable by everyone"
  ON public.events
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON public.events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events"
  ON public.events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own events"
  ON public.events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- ============================================
-- RLS POLICIES: persons
-- ============================================
DROP POLICY IF EXISTS "Persons are viewable by authenticated users" ON public.persons;
DROP POLICY IF EXISTS "Authenticated users can insert persons" ON public.persons;
DROP POLICY IF EXISTS "Users can update their own persons" ON public.persons;
DROP POLICY IF EXISTS "Users can delete their own persons" ON public.persons;

CREATE POLICY "Persons are viewable by authenticated users"
  ON public.persons
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert persons"
  ON public.persons
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own persons"
  ON public.persons
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own persons"
  ON public.persons
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- ============================================
-- RLS POLICIES: media
-- ============================================
DROP POLICY IF EXISTS "Media are viewable by everyone" ON public.media;
DROP POLICY IF EXISTS "Authenticated users can insert media" ON public.media;
DROP POLICY IF EXISTS "Users can update their own media" ON public.media;
DROP POLICY IF EXISTS "Users can delete their own media" ON public.media;

CREATE POLICY "Media are viewable by everyone"
  ON public.media
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert media"
  ON public.media
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own media"
  ON public.media
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own media"
  ON public.media
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- ============================================
-- RLS POLICIES: relations
-- ============================================
DROP POLICY IF EXISTS "Relations are viewable by authenticated users" ON public.relations;
DROP POLICY IF EXISTS "Authenticated users can manage relations" ON public.relations;

CREATE POLICY "Relations are viewable by authenticated users"
  ON public.relations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage relations"
  ON public.relations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- TRIGGERS: updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_persons_updated_at ON public.persons;
CREATE TRIGGER update_persons_updated_at
  BEFORE UPDATE ON public.persons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_media_updated_at ON public.media;
CREATE TRIGGER update_media_updated_at
  BEFORE UPDATE ON public.media
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_relations_updated_at ON public.relations;
CREATE TRIGGER update_relations_updated_at
  BEFORE UPDATE ON public.relations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- PERMISSIONS
-- ============================================
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.persons TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.relations TO authenticated;

-- ============================================
-- STORAGE BUCKET
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Media bucket is viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own media" ON storage.objects;

CREATE POLICY "Media bucket is viewable by everyone"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Users can update their own media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);
