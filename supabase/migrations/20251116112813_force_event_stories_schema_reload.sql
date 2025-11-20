/*
  # Force reload of event_stories schema in PostgREST
  
  This migration forces PostgREST to reload the schema for event_stories table
  by adding and removing a temporary column.
  
  1. Changes
    - Add a temporary column
    - Remove the temporary column
  
  This operation forces PostgREST to invalidate its cache and reload the table schema.
*/

-- Add a temporary column to force schema reload
ALTER TABLE event_stories ADD COLUMN IF NOT EXISTS temp_reload_trigger boolean DEFAULT false;

-- Remove the temporary column
ALTER TABLE event_stories DROP COLUMN IF EXISTS temp_reload_trigger;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
