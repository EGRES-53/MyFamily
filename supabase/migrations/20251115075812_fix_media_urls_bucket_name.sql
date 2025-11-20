/*
  # Fix media URLs - Replace incorrect bucket name
  
  1. Changes
    - Update all file_url values in media table
    - Replace /public/media/ with /public/myfamily/
    - This fixes the 404 errors for images
    
  2. Why
    - Old URLs were using wrong bucket name 'media' instead of 'myfamily'
    - This causes images to not load (404 errors)
*/

-- Update all media URLs to use correct bucket name
UPDATE media
SET file_url = REPLACE(file_url, '/object/public/media/', '/object/public/myfamily/')
WHERE file_url LIKE '%/object/public/media/%';

-- Add a comment to track this fix
COMMENT ON TABLE media IS 'Media files - URLs corrected to use myfamily bucket';
