/*
  # Recreate stories table with clean schema
  
  1. Actions
    - Backup existing stories data
    - Drop stories table completely (including all constraints and policies)
    - Recreate stories table with proper structure
    - Restore data
    - Add proper RLS policies
    
  2. Reason
    - Force Supabase to clear its schema cache completely
    - Remove all traces of old foreign key names
    - Establish clean, proper relationships
*/

-- Create temporary backup table
CREATE TEMP TABLE stories_backup AS 
SELECT * FROM stories;

-- Drop the entire stories table (this clears all cache)
DROP TABLE IF EXISTS stories CASCADE;

-- Recreate stories table with clean schema
CREATE TABLE stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Restore data from backup
INSERT INTO stories (id, title, content, user_id, created_at, updated_at)
SELECT id, title, content, user_id, created_at, updated_at
FROM stories_backup;

-- Enable RLS
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own stories"
  ON stories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own stories"
  ON stories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stories"
  ON stories FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own stories"
  ON stories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_stories_user_id ON stories(user_id);
CREATE INDEX idx_stories_created_at ON stories(created_at DESC);
