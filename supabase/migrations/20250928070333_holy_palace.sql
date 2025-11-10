/*
  # Fix stories-profiles relationship

  1. Changes
    - Drop existing foreign key constraint on stories.created_by that references auth.users
    - Add new foreign key constraint that references public.profiles(id)
    - This allows PostgREST to infer the relationship for joins

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity with proper foreign key constraints
*/

-- Drop the existing foreign key constraint
ALTER TABLE public.stories 
DROP CONSTRAINT IF EXISTS stories_created_by_fkey;

-- Add new foreign key constraint to profiles table
ALTER TABLE public.stories 
ADD CONSTRAINT stories_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE CASCADE;