import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { BookOpen, ExternalLink, Unlink } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { Link } from 'react-router-dom';

interface Story {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface EventStoryLinksProps {
  eventId: string;
  onUnlink?: () => void;
}

const EventStoryLinks: React.FC<EventStoryLinksProps> = ({ eventId, onUnlink }) => {
  const [linkedStories, setLinkedStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchLinkedStories = async () => {
    try {
      // Vérifier que eventId est valide
      if (!eventId || eventId === 'undefined' || eventId === 'null') {
        console.warn('Invalid eventId:', eventId);
        setLinkedStories([]);
        setLoading(false);
        return;
      }

      const { data: eventStories, error: linkError } = await supabase
        .from('event_stories')
        .select('story_id')
        .eq('event_id', eventId);

      if (linkError) {
        console.error('Error fetching event_stories:', linkError);
        throw linkError;
      }

      if (!eventStories || eventStories.length === 0) {
        setLinkedStories([]);
        setLoading(false);
        return;
      }

      const storyIds = eventStories.map(es => es.story_id);

      const { data: stories, error: storiesError } = await supabase
        .from('stories')
        .select('*')
        .in('id', storyIds);

      if (storiesError) throw storiesError;

      setLinkedStories(stories || []);
    } catch (error) {
      console.error('Error fetching linked stories:', error);
      showToast('Erreur lors du chargement des récits liés', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ne charger que si eventId est valide
    if (eventId && eventId !== 'undefined' && eventId !== 'null') {
      fetchLinkedStories();
    } else {
      setLoading(false);
    }
  }, [eventId]);

  const handleUnlink = async (storyId: string) => {
    try {
      const { error } = await supabase
        .from('event_stories')
        .delete()
        .eq('event_id', eventId)
        .eq('story_id', storyId);

      if (error) throw error;

      setLinkedStories(linkedStories.filter(story => story.id !== storyId));
      showToast('Récit délié avec succès', 'success');
      if (onUnlink) onUnlink();
    } catch (error) {
      console.error('Error unlinking story:', error);
      showToast('Erreur lors du déliaison du récit', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (linkedStories.length === 0) {
    return (
      <p className="text-neutral-500 text-center py-4">
        Aucun récit lié à cet événement
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {linkedStories.map((story) => (
        <div key={story.id} className="flex items-start p-4 border rounded-lg bg-white hover:shadow-vintage transition-shadow">
          <div className="flex-shrink-0 mr-4 mt-1">
            <div className="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-base font-semibold mb-1">{story.title}</h3>
            <p className="text-sm text-neutral-600 line-clamp-3 mb-2">
              {story.content}
            </p>
            <p className="text-xs text-neutral-500 mb-3">
              Créé le {new Date(story.created_at).toLocaleDateString('fr-FR')}
            </p>
            <div className="flex items-center gap-3">
              <Link
                to={`/stories/${story.id}`}
                className="text-sm text-primary-600 hover:text-primary-800 flex items-center font-medium"
              >
                Lire le récit complet <ExternalLink size={14} className="ml-1" />
              </Link>
              <button
                onClick={() => handleUnlink(story.id)}
                className="text-sm text-red-500 hover:text-red-700 flex items-center font-medium"
              >
                Délier <Unlink size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventStoryLinks;

