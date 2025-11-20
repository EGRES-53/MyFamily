/*
  # Add file_size column to media table
  
  1. Changes
    - Add file_size column to store file sizes in bytes
    - Default value is 0 for existing records
    
  2. Notes
    - Uses IF NOT EXISTS to prevent errors if column already exists
    - file_size allows tracking storage usage per user
*/

DO $$ 
BEGIN
  -- Add file_size column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'media' AND column_name = 'file_size'
  ) THEN
    ALTER TABLE public.media ADD COLUMN file_size bigint DEFAULT 0;
  END IF;
END $$;

-- Create index on user_id for better performance if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_media_user_id ON public.media(user_id);
