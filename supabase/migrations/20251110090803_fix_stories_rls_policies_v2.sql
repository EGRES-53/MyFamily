/*
  # Fix Stories RLS Policies - Complete Solution v2
  
  ## Problem Diagnosis
  - Current RLS policies are blocking legitimate inserts
  - auth.uid() comparison is too strict
  - Need simpler, more permissive policies for authenticated users
  
  ## Changes Made
  
  ### 1. Drop Existing Restrictive Policies
  - Remove all existing policies
  
  ### 2. Create Simplified Policies
  - SELECT: Authenticated users can view their own stories
  - INSERT: Authenticated users can insert stories with their user_id
  - UPDATE: Users can update their own stories
  - DELETE: Users can delete their own stories
  
  ### 3. Performance Improvements
  - Add index on user_id
  - Ensure foreign key constraint exists
*/

-- Step 1: Drop ALL existing policies on stories table
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'stories'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON stories', policy_record.policyname);
    END LOOP;
END $$;

-- Step 2: Ensure RLS is enabled
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Step 3: Create SIMPLIFIED policies that work with Supabase client

-- SELECT: Users can view their own stories
CREATE POLICY "authenticated_users_select_own_stories"
  ON stories
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Authenticated users can insert stories
-- The key here is checking that the user_id matches auth.uid()
CREATE POLICY "authenticated_users_insert_own_stories"
  ON stories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can update their own stories
CREATE POLICY "authenticated_users_update_own_stories"
  ON stories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can delete their own stories
CREATE POLICY "authenticated_users_delete_own_stories"
  ON stories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Step 4: Add index for performance
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);

-- Step 5: Ensure foreign key constraint exists and is correct
DO $$
BEGIN
  -- Drop old constraint if it exists with wrong configuration
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'stories_user_id_fkey' 
    AND table_name = 'stories'
  ) THEN
    ALTER TABLE stories DROP CONSTRAINT stories_user_id_fkey;
  END IF;
  
  -- Add proper constraint
  ALTER TABLE stories 
  ADD CONSTRAINT stories_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;
END $$;

-- Step 6: Grant necessary permissions
GRANT ALL ON stories TO authenticated;

-- Step 7: Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- Step 8: Analyze table for query planner
ANALYZE stories;
