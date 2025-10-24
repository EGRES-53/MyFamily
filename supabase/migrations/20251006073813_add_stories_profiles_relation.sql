/*
  # Add Foreign Key Relationship between Stories and Profiles
  
  1. Changes
    - Drop existing FK to auth.users if any
    - Add FK from stories.created_by to profiles.id
    - This allows Supabase to do automatic joins
  
  2. Security
    - Maintains existing RLS policies
*/

-- Drop the foreign key to auth.users if it exists
ALTER TABLE public.stories 
  DROP CONSTRAINT IF EXISTS stories_created_by_fkey;

-- Add foreign key to profiles instead
ALTER TABLE public.stories
  ADD CONSTRAINT stories_created_by_fkey
  FOREIGN KEY (created_by)
  REFERENCES public.profiles(id)
  ON DELETE CASCADE;

-- Verify the relationship
COMMENT ON CONSTRAINT stories_created_by_fkey ON public.stories IS 
  'Links story to user profile for automatic joins';
