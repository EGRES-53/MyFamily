import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Save, ArrowLeft, BookOpen } from 'lucide-react';

interface StoryFormData {
  title: string;
  content: string;
}

const AddStoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<StoryFormData>({
    title: '',
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      showToast('Vous devez être connecté pour écrire un récit', 'error');
      navigate('/login');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      showToast('Veuillez remplir tous les champs', 'error');
      return;
    }

    if (formData.content.trim().length < 50) {
      showToast('Le récit doit contenir au moins 50 caractères', 'error');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('stories')
        .insert([{
          title: formData.title.trim(),
          content: formData.content.trim(),
          user_id: currentUser.id
        }]);

      if (error) throw error;

      showToast('Récit créé avec succès!', 'success');
      navigate('/stories');
    } catch (error: any) {
      console.error('Erreur:', error);
      showToast(`Erreur lors de la création du récit: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const wordCount = formData.content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = formData.content.length;

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/stories')}
          className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Retour aux récits
        </button>

        <div className="bg-white rounded-lg shadow-vintage p-6 sm:p-8 border border-primary-100">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold font-serif text-primary-800">
              Écrire un Nouveau Récit
            </h1>
          </div>

          <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <h3 className="font-semibold text-primary-800 mb-2">💡 Idées de récits :</h3>
            <ul className="text-sm text-primary-700 space-y-1">
              <li>• Les recettes secrètes de grand-mère</li>
              <li>• L'histoire de l'objet familial le plus précieux</li>
              <li>• Les traditions de Noël de votre famille</li>
              <li>• Le jour où vos parents se sont rencontrés</li>
              <li>• Les vacances d'été inoubliables</li>
              <li>• L'histoire de la maison familiale</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Titre du récit"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Ex: Les recettes secrètes de Grand-mère Marie"
                maxLength={100}
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.title.length}/100 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Ton récit <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 resize-y"
                required
                placeholder="Raconte ton histoire... Prends ton temps pour décrire les détails, les émotions, les personnages. Chaque mot compte pour préserver ces précieux souvenirs."
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>{wordCount} mots • {charCount} caractères</span>
                <span className={charCount < 50 ? 'text-red-500' : 'text-green-600'}>
                  {charCount < 50 ? `${50 - charCount} caractères minimum requis` : '✓ Longueur suffisante'}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">📝 Conseils d'écriture :</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Écris comme si tu racontais à un ami proche</li>
                <li>• N'hésite pas à inclure des détails sensoriels (odeurs, sons, textures)</li>
                <li>• Mentionne les dates, lieux et personnes importantes</li>
                <li>• Explique le contexte historique si nécessaire</li>
                <li>• Termine par ce que cette histoire signifie pour toi</li>
              </ul>
            </div>

            <div className="flex justify-end pt-4 space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/stories')}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                icon={<Save size={18} />}
                disabled={!formData.title.trim() || !formData.content.trim() || formData.content.length < 50}
              >
                Publier le Récit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStoryPage;