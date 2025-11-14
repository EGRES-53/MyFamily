import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Calendar, MapPin, Plus, Download, CreditCard as Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import TimelinePDF from '../components/timeline/TimelinePDF';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string | null;
  precise_date: boolean;
  created_at: string;
  user_id: string;
  media?: Array<{
    id: string;
    file_url: string;
    file_type: string;
  }>;
}

const TimelinePagePublic: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    yearsOfHistory: 0,
    generations: 0,
    totalPhotos: 0
  });

  useEffect(() => {
    fetchEvents();
  }, [currentUser]);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      if (currentUser) {
        const { data, error } = await supabase
          .from('events')
          .select(`
            *,
            media!media_event_id_fkey (
              id,
              file_url,
              file_type
            )
          `)
          .eq('user_id', currentUser.id)
          .order('date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
        calculateStats(data || []);
      } else {
        setEvents([]);
        setStats({
          totalEvents: 6,
          yearsOfHistory: 74,
          generations: 3,
          totalPhotos: 12
        });
      }
    } catch (error: any) {
      console.error('Error fetching events:', error);
      showToast('Erreur lors du chargement des événements', 'error');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (eventsList: Event[]) => {
    if (eventsList.length === 0) {
      setStats({
        totalEvents: 0,
        yearsOfHistory: 0,
        generations: 0,
        totalPhotos: 0
      });
      return;
    }

    const dates = eventsList.map(e => new Date(e.date).getFullYear());
    const minYear = Math.min(...dates);
    const maxYear = Math.max(...dates);
    const yearsOfHistory = maxYear - minYear;

    const totalPhotos = eventsList.reduce((sum, event) => sum + (event.media?.length || 0), 0);

    setStats({
      totalEvents: eventsList.length,
      yearsOfHistory: yearsOfHistory,
      generations: Math.ceil(yearsOfHistory / 25),
      totalPhotos: totalPhotos
    });
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEvents(events.filter(e => e.id !== id));
      showToast('Événement supprimé avec succès', 'success');
    } catch (error: any) {
      console.error('Error deleting event:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f8f3e9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const demoEvents = [
    {
      id: 'demo-1',
      title: 'Naissance de Grand-père Pierre',
      date: '1950-03-15',
      description: 'Naissance de Pierre Dupont, qui deviendra le patriarche de notre famille.',
      location: 'Lyon, France',
      precise_date: true,
      created_at: new Date().toISOString(),
      user_id: 'demo'
    },
    {
      id: 'demo-2',
      title: 'Mariage de Pierre et Marie',
      date: '1975-06-20',
      description: 'Union de Pierre Dupont et Marie Martin, marquant le début de notre lignée.',
      location: 'Église Saint-Jean, Lyon',
      precise_date: true,
      created_at: new Date().toISOString(),
      user_id: 'demo'
    },
    {
      id: 'demo-3',
      title: 'Ma naissance',
      date: '2008-04-22',
      description: 'Ma naissance à l\'hôpital Saint-Antoine, nouvelle génération de la famille.',
      location: 'Paris, France',
      precise_date: true,
      created_at: new Date().toISOString(),
      user_id: 'demo'
    }
  ];

  const displayEvents = currentUser && events.length > 0 ? events : demoEvents;

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-bold font-serif text-primary-800 mb-2">
              {currentUser ? 'Ma Chronologie Familiale' : 'Chronologie Familiale'}
            </h1>
            <p className="text-neutral-600">
              {currentUser
                ? `Bienvenue ${currentUser.email?.split('@')[0]} ! Voici l'histoire de ta famille.`
                : 'Découvre comment SOUVIENS_TOI préserve l\'histoire familiale.'
              }
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            {currentUser ? (
              <>
                <Link to="/timeline/add">
                  <Button variant="primary" icon={<Plus size={18} />}>
                    Ajouter un événement
                  </Button>
                </Link>
                {events.length > 0 && (
                  <TimelinePDF
                    events={events.map(e => ({
                      id: e.id,
                      title: e.title,
                      date: e.date,
                      description: e.description,
                      location: e.location || '',
                      precise_date: e.precise_date ?? true,
                      media_count: e.media?.length || 0
                    }))}
                    mode="download"
                    fileName={`chronologie-${new Date().toISOString().split('T')[0]}.pdf`}
                  />
                )}
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="primary" icon={<Plus size={18} />}>
                    Créer mon compte
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">
                    Se connecter
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">{stats.totalEvents}</div>
            <div className="text-sm text-neutral-600">Événements</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">{stats.yearsOfHistory}</div>
            <div className="text-sm text-neutral-600">Années d'Histoire</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">{stats.generations}</div>
            <div className="text-sm text-neutral-600">Générations</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">{stats.totalPhotos}</div>
            <div className="text-sm text-neutral-600">Photos</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-vintage p-6 lg:p-8 border border-primary-100 animate-fade-in-up">
          {displayEvents.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold mb-2">Commence ta chronologie</h3>
              <p className="text-neutral-600 mb-6">
                Ajoute ton premier événement pour commencer à construire l'histoire de ta famille
              </p>
              <Link to="/timeline/add">
                <Button variant="primary" icon={<Plus size={18} />}>
                  Ajouter un Événement
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {displayEvents.map((event, index) => (
                <div key={event.id} className="relative pl-8 pb-8 border-l-2 border-primary-300 last:border-0">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>

                  <div className="bg-primary-50 rounded-lg p-6 hover:bg-primary-100 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-serif font-bold text-primary-800">
                        {event.title}
                      </h3>
                      {currentUser && event.user_id !== 'demo' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/event/${event.id}/edit`)}
                            className="text-primary-600 hover:text-primary-800 p-2"
                            title="Modifier"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-primary-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      )}
                      {event.media && event.media.length > 0 && (
                        <div className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          {event.media.length} photo{event.media.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    <p className="text-neutral-700 leading-relaxed">
                      {event.description}
                    </p>

                    {event.media && event.media.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {event.media.slice(0, 3).map((media) => (
                          <img
                            key={media.id}
                            src={media.url}
                            alt="Event media"
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    {currentUser && event.user_id !== 'demo' && (
                      <Link to={`/event/${event.id}`} className="inline-block mt-4">
                        <Button variant="outline" size="sm">
                          Voir les détails
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-gradient-to-r from-primary-50 to-amber-50 border border-primary-200 rounded-lg p-6 animate-fade-in-up">
          <div className="text-center">
            <h3 className="text-xl font-serif font-bold text-primary-800 mb-2">
              {currentUser ? 'Enrichis ton histoire familiale' : 'Prêt à créer ta propre chronologie ?'}
            </h3>
            <p className="text-neutral-700 mb-6">
              {currentUser
                ? 'Ajoute tes propres événements, photos et récits !'
                : 'Crée ton compte gratuit et commence à préserver l\'histoire de ta famille !'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentUser ? (
                <>
                  <Link to="/timeline/add">
                    <Button variant="primary" icon={<Plus size={18} />}>
                      Ajouter un Événement
                    </Button>
                  </Link>
                  <Link to="/gallery">
                    <Button variant="outline">
                      Ajouter des Photos
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="primary" icon={<Plus size={18} />}>
                      Commencer Gratuitement
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline">
                      J'ai déjà un compte
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePagePublic;
