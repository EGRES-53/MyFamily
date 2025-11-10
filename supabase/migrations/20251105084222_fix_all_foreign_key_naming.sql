/*
  # Fix all foreign key naming to match column names
  
  1. Changes
    - Rename media_created_by_fkey to media_user_id_fkey
    - Rename persons_created_by_fkey to persons_user_id_fkey
    
  2. Reason
    - Standard naming convention is: table_column_fkey
    - Prevents confusion in Supabase's schema cache
    - Ensures consistency across all tables
*/

-- Fix media table foreign key
ALTER TABLE media 
DROP CONSTRAINT IF EXISTS media_created_by_fkey;

ALTER TABLE media
ADD CONSTRAINT media_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;

-- Fix persons table foreign key
ALTER TABLE persons 
DROP CONSTRAINT IF EXISTS persons_created_by_fkey;

ALTER TABLE persons
ADD CONSTRAINT persons_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;
