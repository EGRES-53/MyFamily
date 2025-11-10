import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../contexts/ToastContext';
import { Link, BookOpen } from 'lucide-react';
import Button from '../ui/Button';

interface Story {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface StoryLinkSelectorProps {
  eventId: string;
  onLinkComplete: () => void;
}

const StoryLinkSelector: React.FC<StoryLinkSelectorProps> = ({ eventId, onLinkComplete }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchAvailableStories();
  }, [eventId]);

  const fetchAvailableStories = async () => {
    try {
      const { data: allStories, error: storiesError } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (storiesError) throw storiesError;

      const { data: linkedStories, error: linkedError } = await supabase
        .from('event_stories')
        .select('story_id')
        .eq('event_id', eventId);

      if (linkedError) throw linkedError;

      const linkedStoryIds = linkedStories?.map(ls => ls.story_id) || [];
      const availableStories = allStories?.filter(s => !linkedStoryIds.includes(s.id)) || [];

      setStories(availableStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      showToast('Erreur lors du chargement des récits', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkStory = async (storyId: string) => {
    try {
      const { error } = await supabase
        .from('event_stories')
        .insert({ event_id: eventId, story_id: storyId });

      if (error) throw error;

      showToast('Récit lié avec succès', 'success');
      onLinkComplete();
    } catch (error) {
      console.error('Error linking story:', error);
      showToast('Erreur lors de la liaison du récit', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <p className="text-neutral-500 text-center py-4">
        Aucun récit disponible à lier
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {stories.map((story) => (
        <div key={story.id} className="flex items-start p-4 border rounded-lg hover:bg-primary-50 transition-colors">
          <div className="flex-shrink-0 mr-4 mt-1">
            <BookOpen className="h-6 w-6 text-primary-600" />
          </div>
          <div className="flex-grow">
            <h3 className="text-base font-semibold mb-1">{story.title}</h3>
            <p className="text-sm text-neutral-600 line-clamp-2 mb-2">
              {story.content.substring(0, 150)}...
            </p>
            <p className="text-xs text-neutral-500">
              Créé le {new Date(story.created_at).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleLinkStory(story.id)}
            icon={<Link size={16} />}
          >
            Lier
          </Button>
        </div>
      ))}
    </div>
  );
};

export default StoryLinkSelector;
