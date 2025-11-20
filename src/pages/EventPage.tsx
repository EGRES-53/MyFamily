import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import { Calendar, Edit, ArrowLeft, MapPin, Trash2, BookOpen, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import EventStoryLinks from '../components/story/EventStoryLinks';
import StoryLinkSelector from '../components/story/StoryLinkSelector';
import EventMediaLinks from '../components/media/EventMediaLinks';
import MediaLinkSelector from '../components/media/MediaLinkSelector';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  precise_date?: boolean;
}

const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStorySelector, setShowStorySelector] = useState(false);
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
      showToast('Erreur lors du chargement de l\'événement', 'error');
      navigate('/timeline');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!event?.id) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', event.id);

      if (error) throw error;

      showToast('Événement supprimé avec succès', 'success');
      navigate('/timeline');
    } catch (error) {
      console.error('Error deleting event:', error);
      showToast('Erreur lors de la suppression de l\'événement', 'error');
    }
  };

  const handleStoryLinkComplete = () => {
    setShowStorySelector(false);
    setRefreshKey(prev => prev + 1);
  };

  const handleMediaLinkComplete = () => {
    setShowMediaSelector(false);
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#f8f3e9] py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold font-serif text-primary-800 mb-4">
            Événement non trouvé
          </h1>
          <Link to="/timeline">
            <Button variant="primary" icon={<ArrowLeft size={18} />}>
              Retour à la chronologie
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/timeline" className="inline-flex items-center text-primary-600 hover:text-primary-800">
            <ArrowLeft size={18} className="mr-2" />
            Retour à la chronologie
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-vintage p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold font-serif text-primary-800">
              {event.title}
            </h1>
            <div className="flex gap-2">
              <Link to={`/event/${event.id}/edit`}>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit size={16} />}
                >
                  Modifier
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                icon={<Trash2 size={16} />}
                onClick={handleDelete}
                className="text-red-600 hover:bg-red-50"
              >
                Supprimer
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-neutral-600">
              <Calendar size={18} className="mr-2 text-primary-600" />
              <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
            </div>
            {event.location && (
              <div className="flex items-center text-neutral-600">
                <MapPin size={18} className="mr-2 text-primary-600" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <div className="text-neutral-700">
            {event.description}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-vintage p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <BookOpen className="mr-2 text-primary-600" size={24} />
              <h2 className="text-xl font-bold font-serif text-primary-800">
                Récits liés
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<LinkIcon size={16} />}
              onClick={() => setShowStorySelector(!showStorySelector)}
            >
              {showStorySelector ? 'Annuler' : 'Lier un récit'}
            </Button>
          </div>

          {showStorySelector && (
            <div className="mb-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Sélectionne un récit à lier :
              </h3>
              <StoryLinkSelector
                eventId={event.id}
                onLinkComplete={handleStoryLinkComplete}
              />
            </div>
          )}

          {event?.id && (
            <EventStoryLinks
              key={`stories-${refreshKey}`}
              eventId={event.id}
              onUnlink={() => setRefreshKey(prev => prev + 1)}
            />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-vintage p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <ImageIcon className="mr-2 text-primary-600" size={24} />
              <h2 className="text-xl font-bold font-serif text-primary-800">
                Médias liés
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<LinkIcon size={16} />}
              onClick={() => setShowMediaSelector(!showMediaSelector)}
            >
              {showMediaSelector ? 'Annuler' : 'Lier un média'}
            </Button>
          </div>

          {showMediaSelector && (
            <div className="mb-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Sélectionne un média à lier :
              </h3>
              <MediaLinkSelector
                eventId={event.id}
                onLinkComplete={handleMediaLinkComplete}
              />
            </div>
          )}

          {event?.id && (
            <EventMediaLinks
              key={`media-${refreshKey}`}
              eventId={event.id}
              onUnlink={() => setRefreshKey(prev => prev + 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;