/*
  # Create Stories Table
  
  1. New Table
    - `stories` table for family stories and anecdotes
      - `id` (uuid, PK)
      - `title` (text)
      - `content` (text)
      - `created_by` (uuid, FK -> auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Users can only access their own stories
    - Policies for SELECT, INSERT, UPDATE, DELETE
*/

-- Create stories table
CREATE TABLE IF NOT EXISTS public.stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_stories_created_by ON public.stories(created_by);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON public.stories(created_at DESC);

-- Enable RLS
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own stories" ON public.stories;
DROP POLICY IF EXISTS "Users can insert their own stories" ON public.stories;
DROP POLICY IF EXISTS "Users can update their own stories" ON public.stories;
DROP POLICY IF EXISTS "Users can delete their own stories" ON public.stories;

-- Create RLS policies
CREATE POLICY "Users can view their own stories"
  ON public.stories
  FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can insert their own stories"
  ON public.stories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own stories"
  ON public.stories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own stories"
  ON public.stories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_stories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_stories_updated_at_trigger ON public.stories;
CREATE TRIGGER update_stories_updated_at_trigger
  BEFORE UPDATE ON public.stories
  FOR EACH ROW
  EXECUTE FUNCTION update_stories_updated_at();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stories TO authenticated;
