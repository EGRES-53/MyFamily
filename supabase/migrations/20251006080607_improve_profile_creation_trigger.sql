/*
  # Improve Profile Creation Trigger
  
  1. Changes
    - Add better error handling
    - Use ON CONFLICT to avoid duplicate errors
    - Add logging for debugging
  
  2. Security
    - Maintains SECURITY DEFINER
    - Safe error handling
*/

-- Recreate the trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Try to insert the profile, ignore if already exists
  INSERT INTO public.profiles (id, full_name, avatar_url, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'Utilisateur'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', null),
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    updated_at = now();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create profiles for any existing users who don't have one
INSERT INTO public.profiles (id, full_name, avatar_url, created_at, updated_at)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email, 'Utilisateur') as full_name,
  COALESCE(au.raw_user_meta_data->>'avatar_url', null) as avatar_url,
  COALESCE(au.created_at, now()) as created_at,
  COALESCE(au.updated_at, now()) as updated_at
FROM auth.users au
WHERE au.id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;
