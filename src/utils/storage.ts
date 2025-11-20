import { supabase } from '../lib/supabase';

export const BUCKET_NAME = 'myfamily';

// Générer une URL signée pour contourner les problèmes CORS
export const getSignedUrl = async (filePath: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 3600); // URL valide pour 1 heure

    if (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Error in getSignedUrl:', error);
    return null;
  }
};

// Extraire le chemin du fichier depuis une URL complète
export const extractFilePathFromUrl = (url: string): string | null => {
  try {
    // Format: https://xxx.supabase.co/storage/v1/object/public/myfamily/path/to/file.jpg
    const match = url.match(/\/object\/public\/myfamily\/(.+)$/);
    if (match && match[1]) {
      return match[1];
    }

    // Format alternatif: path direct
    const parts = url.split(`/${BUCKET_NAME}/`);
    if (parts.length > 1) {
      return parts[1];
    }

    return null;
  } catch (error) {
    console.error('Error extracting file path:', error);
    return null;
  }
};

export const downloadMediaLocally = async (fileUrl: string, fileName: string): Promise<void> => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement du fichier');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

export const getFilePathFromUrl = (fileUrl: string): string => {
  const parts = fileUrl.split(`/storage/v1/object/public/${BUCKET_NAME}/`);
  return parts.length > 1 ? parts[1] : '';
};

export const uploadToStorage = async (
  file: File,
  path: string
): Promise<{ publicUrl: string; error: Error | null }> => {
  try {
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file);

    if (uploadError) {
      return { publicUrl: '', error: uploadError };
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return { publicUrl, error: null };
  } catch (error) {
    return { publicUrl: '', error: error as Error };
  }
};

export const deleteFromStorage = async (path: string): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    return { error };
  } catch (error) {
    return { error: error as Error };
  }
};

