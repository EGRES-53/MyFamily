/*
  # Add foreign key for event_stories.story_id
  
  1. Changes
    - Add foreign key constraint from event_stories.story_id to stories.id
    - Use ON DELETE CASCADE to maintain referential integrity
    
  2. Reason
    - The foreign key was lost when stories table was recreated
    - Need to restore proper relationship between events and stories
*/

-- Add foreign key constraint
ALTER TABLE event_stories
ADD CONSTRAINT event_stories_story_id_fkey 
FOREIGN KEY (story_id) 
REFERENCES stories(id) 
ON DELETE CASCADE;
