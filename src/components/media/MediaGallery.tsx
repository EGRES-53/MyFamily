import React, { useState } from 'react';
import { Trash2, FileText, Image as ImageIcon, ExternalLink, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { downloadMediaLocally } from '../../utils/storage';

interface Media {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'document';
  uploaded_at?: string;
  created_at?: string;
}

interface MediaGalleryProps {
  media: Media[];
  onDelete: (id: string) => void;
  onDownloadError?: (message: string) => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, onDelete, onDownloadError }) => {
  const handleDownload = async (url: string, title: string) => {
    try {
      await downloadMediaLocally(url, title);
    } catch (error) {
      if (onDownloadError) {
        onDownloadError('Erreur lors du téléchargement du fichier');
      }
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {media.map((item) => (
        <div key={item.id} className="relative group">
          <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100">
            {item.type === 'image' ? (
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <FileText className="h-12 w-12 mb-2 text-neutral-400" />
                <p className="text-sm text-neutral-600 text-center">{item.title}</p>
              </div>
            )}
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral-600 truncate flex-1">{item.title}</p>
              <div className="flex gap-1">
                <button
                  onClick={() => handleDownload(item.url, item.title)}
                  className="p-1.5 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                  title="Télécharger"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {item.uploaded_at && (
              <p className="text-xs text-neutral-500 mt-1">
                Ajouté le {new Date(item.uploaded_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;