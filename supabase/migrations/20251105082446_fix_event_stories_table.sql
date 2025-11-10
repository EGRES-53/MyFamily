/*
  # Fix event_stories table - Recreate with correct types
  
  1. Changes
    - Drop and recreate event_stories table to ensure correct UUID types
    - Recreate all indexes
    - Recreate all RLS policies
    
  2. Security
    - Same RLS policies as before
*/

-- Drop existing table (this will cascade and remove all policies and indexes)
DROP TABLE IF EXISTS event_stories CASCADE;

-- Recreate the table with explicit UUID types
CREATE TABLE event_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  story_id uuid NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, story_id)
);

-- Create indexes
CREATE INDEX idx_event_stories_event_id ON event_stories(event_id);
CREATE INDEX idx_event_stories_story_id ON event_stories(story_id);

-- Enable RLS
ALTER TABLE event_stories ENABLE ROW LEVEL SECURITY;

-- Recreate RLS policies
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
