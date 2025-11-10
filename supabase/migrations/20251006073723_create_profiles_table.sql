/*
  # Create Profiles Table
  
  1. New Table
    - `profiles` table for user profiles
      - `id` (uuid, PK) - matches auth.users.id
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Public profiles are viewable by everyone
    - Users can only update their own profile
  
  3. Triggers
    - Auto-create profile on user signup
    - Auto-update updated_at timestamp
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_id ON public.profiles(id);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create RLS policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at_trigger ON public.profiles;
CREATE TRIGGER update_profiles_updated_at_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, created_at, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE(new.raw_user_meta_data->>'avatar_url', null),
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant permissions
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;

-- Create profiles for existing users who don't have one
INSERT INTO public.profiles (id, full_name, avatar_url, created_at, updated_at)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'full_name', email) as full_name,
  COALESCE(raw_user_meta_data->>'avatar_url', null) as avatar_url,
  created_at,
  updated_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;
