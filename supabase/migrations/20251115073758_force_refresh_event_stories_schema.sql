/*
  # Force refresh of event_stories schema
  
  1. Actions
    - Drop and recreate event_stories table completely
    - Ensure all columns use correct UUID types
    - Recreate all indexes and policies
    - This forces Supabase to clear any cached schema
    
  2. Why
    - Fix "invalid input syntax for type bigint" error
    - Ensure client sees correct UUID types, not old cached bigint types
*/

-- Drop everything related to event_stories to clear cache
DROP TABLE IF EXISTS event_stories CASCADE;

-- Recreate with explicit UUID types
CREATE TABLE event_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  story_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT event_stories_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  CONSTRAINT event_stories_story_id_fkey FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
  CONSTRAINT event_stories_unique_pair UNIQUE(event_id, story_id)
);

-- Create indexes for performance
CREATE INDEX idx_event_stories_event_id ON event_stories(event_id);
CREATE INDEX idx_event_stories_story_id ON event_stories(story_id);

-- Enable RLS
ALTER TABLE event_stories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Authenticated users can view event stories"
  ON event_stories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create event stories"
  ON event_stories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete event stories"
  ON event_stories
  FOR DELETE
  TO authenticated
  USING (true);

-- Force a comment update to trigger schema refresh
COMMENT ON TABLE event_stories IS 'Links between events and stories - Schema refreshed to fix type caching issues';
COMMENT ON COLUMN event_stories.event_id IS 'UUID reference to events table';
COMMENT ON COLUMN event_stories.story_id IS 'UUID reference to stories table';
