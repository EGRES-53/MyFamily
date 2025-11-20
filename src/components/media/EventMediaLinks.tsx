import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Image as ImageIcon, ExternalLink, Unlink, Download } from 'lucide-react';
import { downloadMediaLocally } from '../../utils/storage';
import { useToast } from '../../contexts/ToastContext';

interface Media {
  id: string;
  title: string;
  file_url: string;
  file_type: 'image' | 'document';
  created_at: string;
}

interface EventMediaLinksProps {
  eventId: string;
  onUnlink?: () => void;
}

// Fonction pour corriger l'URL du bucket et le domaine Supabase
const fixBucketUrl = (url: string): string => {
  let fixedUrl = url;

  // Corriger le nom du bucket
  fixedUrl = fixedUrl.replace('/object/public/media/', '/object/public/myfamily/');

  // Corriger l'ancien domaine Supabase si présent
  const currentSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (currentSupabaseUrl) {
    const currentDomain = currentSupabaseUrl.replace('https://', '').replace('.supabase.co', '');
    fixedUrl = fixedUrl.replace(/https:\/\/[a-z]+\.supabase\.co/, `https://${currentDomain}.supabase.co`);
  }

  return fixedUrl;
};

const EventMediaLinks: React.FC<EventMediaLinksProps> = ({ eventId, onUnlink }) => {
  const [linkedMedia, setLinkedMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchLinkedMedia = async () => {
    try {
      // Vérifier que eventId est valide
      if (!eventId || eventId === 'undefined' || eventId === 'null') {
        console.warn('Invalid eventId:', eventId);
        setLinkedMedia([]);
        setLoading(false);
        return;
      }

      console.log('Fetching media for event ID:', eventId);

      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('event_id', eventId);

      if (error) {
        console.error('Error fetching media:', error);
        throw error;
      }
      
      console.log('Fetched media data:', data);
      setLinkedMedia(data || []);
    } catch (error) {
      console.error('Error fetching linked media:', error);
      showToast('Erreur lors du chargement des médias liés', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ne charger que si eventId est valide
    if (eventId && eventId !== 'undefined' && eventId !== 'null') {
      fetchLinkedMedia();
    } else {
      setLoading(false);
    }
  }, [eventId]);

  const handleDownload = async (file_url: string, title: string) => {
    try {
      await downloadMediaLocally(file_url, title);
      showToast('Fichier téléchargé avec succès', 'success');
    } catch (error) {
      console.error('Error downloading media:', error);
      showToast('Erreur lors du téléchargement', 'error');
    }
  };

  const handleUnlink = async (mediaId: string) => {
    try {
      const { error } = await supabase
        .from('media')
        .update({ event_id: null })
        .eq('id', mediaId);

      if (error) throw error;

      setLinkedMedia(linkedMedia.filter(media => media.id !== mediaId));
      showToast('Média délié avec succès', 'success');
      if (onUnlink) onUnlink();
    } catch (error) {
      console.error('Error unlinking media:', error);
      showToast('Erreur lors du déliaison du média', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (linkedMedia.length === 0) {
    return (
      <p className="text-neutral-500 text-center py-4">
        Aucun média lié à cet événement
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {linkedMedia.map((media) => (
        <div key={media.id} className="flex items-center p-4 border rounded-lg bg-white hover:shadow-vintage transition-shadow">
          <div className="flex-shrink-0 mr-4">
            {media.file_type === 'image' ? (
              <div className="w-16 h-16 rounded overflow-hidden">
                <img src={fixBucketUrl(media.file_url)} alt={media.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-primary-50 rounded">
                <FileText className="h-8 w-8 text-primary-600" />
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-medium mb-1">{media.title}</h3>
            <p className="text-xs text-neutral-500 mb-2">
              Ajouté le {new Date(media.created_at).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={fixBucketUrl(media.file_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
              >
                Ouvrir <ExternalLink size={14} className="ml-1" />
              </a>
              <button
                onClick={() => handleDownload(fixBucketUrl(media.file_url), media.title)}
                className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
              >
                Télécharger <Download size={14} className="ml-1" />
              </button>
              <button
                onClick={() => handleUnlink(media.id)}
                className="text-sm text-red-500 hover:text-red-700 flex items-center"
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

export default EventMediaLinks;