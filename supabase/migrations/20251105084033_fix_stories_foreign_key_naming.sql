/*
  # Fix stories table foreign key naming
  
  1. Changes
    - Rename foreign key constraint from stories_created_by_fkey to stories_user_id_fkey
    - This fixes the mismatch between the foreign key name and the actual column name
    
  2. Reason
    - The foreign key was named 'stories_created_by_fkey' but points to 'user_id' column
    - This causes confusion in Supabase's schema cache
    - Standard naming convention is: table_column_fkey
*/

-- Drop old foreign key constraint
ALTER TABLE stories 
DROP CONSTRAINT IF EXISTS stories_created_by_fkey;

-- Add new foreign key constraint with correct name
ALTER TABLE stories
ADD CONSTRAINT stories_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;
