import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Image, Upload, Trash2, Download, Search } from 'lucide-react';
import MediaUpload from '../components/media/MediaUpload';
import Button from '../components/ui/Button';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'document';
  created_at: string;
  user_id: string;
  event_id: string | null;
}

const GalleryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'document'>('all');
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchMedia();
    }
  }, [currentUser]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('created_by', currentUser?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error: any) {
      console.error('Error fetching media:', error);
      showToast('Erreur lors du chargement des médias', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedia = async (id: string, url: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) return;

    try {
      const filePath = url.split('/').slice(-2).join('/');

      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filePath]);

      if (storageError) {
        console.error('Storage error:', storageError);
      }

      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      setMedia(media.filter(m => m.id !== id));
      showToast('Média supprimé avec succès', 'success');
    } catch (error: any) {
      console.error('Error deleting media:', error);
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const handleUploadComplete = () => {
    setShowUpload(false);
    fetchMedia();
    showToast('Médias uploadés avec succès !', 'success');
  };

  const handleUploadError = (message: string) => {
    showToast(message, 'error');
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const images = filteredMedia.filter(m => m.type === 'image');
  const documents = filteredMedia.filter(m => m.type === 'document');

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600">Chargement de la galerie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif text-primary-800 mb-2">
              Galerie multimédia
            </h1>
            <p className="text-neutral-600">
              Explore les documents et photos de ton histoire familiale
            </p>
          </div>
          <Button
            variant="primary"
            icon={<Upload size={18} />}
            onClick={() => setShowUpload(!showUpload)}
          >
            {showUpload ? 'Annuler' : 'Ajouter des médias'}
          </Button>
        </div>

        {showUpload && (
          <div className="mb-8 bg-white rounded-lg shadow-vintage p-6 border border-neutral-200">
            <h3 className="text-lg font-semibold mb-4">Upload de médias</h3>
            <MediaUpload
              eventId="gallery"
              onUploadComplete={handleUploadComplete}
              onError={handleUploadError}
            />
          </div>
        )}

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher dans tes médias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              Tout
            </button>
            <button
              onClick={() => setFilterType('image')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'image'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setFilterType('document')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'document'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              Documents
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">{media.length}</div>
            <div className="text-sm text-neutral-600">Médias Total</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">{images.length}</div>
            <div className="text-sm text-neutral-600">Photos</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-vintage border border-primary-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">{documents.length}</div>
            <div className="text-sm text-neutral-600">Documents</div>
          </div>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="bg-white rounded-lg shadow-vintage p-6 border border-neutral-200">
            <div className="text-center my-16">
              <Image className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold mb-2">
                {searchTerm ? 'Aucun média trouvé' : 'Galerie Multimédia'}
              </h3>
              <p className="text-neutral-600 mb-6">
                {searchTerm
                  ? 'Essaie avec d\'autres mots-clés'
                  : 'Tes photos et documents familiaux seront bientôt disponibles ici'
                }
              </p>
              {!searchTerm && !showUpload && (
                <Button
                  variant="primary"
                  icon={<Upload size={18} />}
                  onClick={() => setShowUpload(true)}
                >
                  Ajouter tes premiers médias
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-vintage p-6 border border-neutral-200">
            <Gallery>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.map((item) => (
                  <div key={item.id} className="group relative">
                    {item.type === 'image' ? (
                      <Item
                        original={item.url}
                        thumbnail={item.url}
                        width="1024"
                        height="768"
                      >
                        {({ ref, open }) => (
                          <div
                            ref={ref as React.Ref<HTMLDivElement>}
                            onClick={open}
                            className="aspect-square bg-neutral-100 rounded-lg overflow-hidden cursor-pointer"
                          >
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                          </div>
                        )}
                      </Item>
                    ) : (
                      <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <div className="text-center">
                          <Download className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                          <p className="text-xs text-neutral-600 px-2 truncate">{item.title}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteMedia(item.id, item.url)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-neutral-800 truncate">{item.title}</p>
                      <p className="text-xs text-neutral-500">
                        {new Date(item.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Gallery>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
