import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, MapPin, Plus, Download, CreditCard as Edit, Trash2, Search, Filter, Grid, List } from 'lucide-react';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import TimelinePDF from '../components/timeline/TimelinePDF';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  user_id: string;
  created_at: string;
  precise_date?: boolean;
  profiles?: {
    full_name: string;
  };
}

const TimelinePage: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const loadEvents = async () => {
    try {
      setLoading(true);
      console.log('Début du chargement des événements...');

      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .order('date', { ascending: sortOrder === 'asc' });

      if (error) {
        console.error('Erreur Supabase détaillée:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Événements chargés:', data?.length || 0);
      setEvents(data || []);
    } catch (error: any) {
      console.error('Erreur complète lors du chargement:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      loadEvents();
    }
  }, [authLoading, sortOrder]);

  const availableYears = useMemo(() => {
    const years = events.map(e => new Date(e.date).getFullYear());
    return ['all', ...Array.from(new Set(years)).sort((a, b) => b - a)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const eventYear = new Date(event.date).getFullYear().toString();
      const matchesYear = selectedYear === 'all' || eventYear === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [events, searchTerm, selectedYear]);

  const handleDelete = async (eventId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      showToast('Événement supprimé avec succès', 'success');
      loadEvents();
    } catch (error: any) {
      console.error('Erreur suppression:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f8f3e9] flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-serif text-primary-800 mb-2">
              Chronologie Familiale
            </h1>
            <p className="text-neutral-600">
              {currentUser
                ? `L'histoire de votre famille`
                : 'Découvrez les événements marquants'
              }
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            {currentUser ? (
              <>
                {events.length > 0 && (
                  <TimelinePDF
                    events={filteredEvents.map(e => ({
                      id: e.id,
                      title: e.title,
                      date: e.date,
                      description: e.description,
                      location: e.location,
                      precise_date: e.precise_date ?? true,
                      media_count: 0
                    }))}
                    mode="download"
                    fileName={`chronologie-${new Date().toISOString().split('T')[0]}.pdf`}
                  />
                )}
                <Link to="/add-event">
                  <Button variant="primary" icon={<Plus size={18} />}>
                    Ajouter un événement
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="primary">
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

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-vintage p-4 mb-6 border border-primary-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Toutes les années</option>
              {availableYears.filter(y => y !== 'all').map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex-1 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-medium"
              >
                {sortOrder === 'desc' ? '↓ Plus récent' : '↑ Plus ancien'}
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'timeline' ? 'grid' : 'timeline')}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                title={viewMode === 'timeline' ? 'Vue grille' : 'Vue chronologique'}
              >
                {viewMode === 'timeline' ? <Grid size={18} /> : <List size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">{filteredEvents.length}</div>
            <div className="text-sm text-neutral-600">
              {filteredEvents.length !== events.length ? `Événements (${events.length} total)` : 'Événements'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {events.length > 0 ? new Date().getFullYear() - new Date(Math.min(...events.map(e => new Date(e.date).getTime()))).getFullYear() : 0}
            </div>
            <div className="text-sm text-neutral-600">Années d'Histoire</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {new Set(events.map(e => e.user_id)).size}
            </div>
            <div className="text-sm text-neutral-600">Contributeurs</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-vintage p-6 lg:p-8 border border-primary-100">
          <h2 className="text-2xl font-bold font-serif text-primary-800 mb-6">
            Événements
          </h2>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">
                {currentUser
                  ? 'Aucun événement pour le moment. Commencez par ajouter votre premier événement !'
                  : 'Aucun événement disponible. Créez un compte pour commencer votre chronologie.'
                }
              </p>
              {currentUser && (
                <Link to="/add-event">
                  <Button variant="primary" icon={<Plus size={18} />}>
                    Ajouter le premier événement
                  </Button>
                </Link>
              )}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">
                Aucun événement ne correspond à vos critères de recherche.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedYear('all');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : viewMode === 'timeline' ? (
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200"></div>
              <div className="space-y-8">
                {filteredEvents.map((event, index) => (
                  <div key={event.id} className="relative pl-20 group">
                    <div className="absolute left-4 w-8 h-8 bg-primary-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar size={14} className="text-white" />
                    </div>

                    <div className="bg-gradient-to-br from-primary-50 to-amber-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-all border border-primary-200 group-hover:border-primary-400">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                              {new Date(event.date).getFullYear()}
                            </span>
                            <h3 className="font-bold text-xl text-primary-900">{event.title}</h3>
                          </div>

                          <div className="flex items-center text-sm text-primary-700 mb-3 gap-4 flex-wrap">
                            <span className="flex items-center font-medium">
                              <Calendar size={14} className="mr-1" />
                              {new Date(event.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                            {event.location && (
                              <span className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                {event.location}
                              </span>
                            )}
                          </div>

                          <p className="text-neutral-700 leading-relaxed">{event.description}</p>

                          {event.profiles && (
                            <p className="text-xs text-neutral-500 mt-3 italic">
                              Ajouté par {event.profiles.full_name}
                            </p>
                          )}
                        </div>

                        {currentUser && currentUser.id === event.user_id && (
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => navigate(`/edit-event/${event.id}`)}
                              className="p-2 text-primary-600 hover:bg-primary-200 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-gradient-to-br from-primary-50 to-amber-50 rounded-lg p-5 shadow-md hover:shadow-xl transition-all border border-primary-200 hover:border-primary-400 group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                      {new Date(event.date).getFullYear()}
                    </span>
                    {currentUser && currentUser.id === event.user_id && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => navigate(`/edit-event/${event.id}`)}
                          className="p-1.5 text-primary-600 hover:bg-primary-200 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-primary-900 mb-2">{event.title}</h3>

                  <div className="space-y-1 mb-3 text-xs text-primary-700">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {event.location}
                      </div>
                    )}
                  </div>

                  <p className="text-neutral-700 text-sm line-clamp-3 leading-relaxed">{event.description}</p>

                  {event.profiles && (
                    <p className="text-xs text-neutral-500 mt-3 italic">
                      Par {event.profiles.full_name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        {!currentUser && (
          <div className="mt-8 bg-gradient-to-r from-primary-50 to-amber-50 border border-primary-200 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-xl font-serif font-bold text-primary-800 mb-2">
                Créez votre propre chronologie familiale
              </h3>
              <p className="text-neutral-700 mb-6">
                Préservez l'histoire de votre famille pour les générations futures
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelinePage;