# Guide de Configuration du Stockage de Médias

## Résumé des Modifications

Le système de gestion des médias a été entièrement configuré pour utiliser le bucket **"myfamily"** de Supabase Storage, permettant le téléchargement et le stockage sécurisés des images et documents.

## Fonctionnalités Implémentées

### 1. Upload de Médias
- **Composant**: `MediaUpload.tsx`
- **Bucket**: `myfamily`
- Les fichiers sont uploadés depuis l'ordinateur local vers Supabase Storage
- Types supportés: Images (PNG, JPG, GIF) et Documents (PDF)
- Les métadonnées sont stockées dans la table `media` de la base de données

### 2. Téléchargement Local
- **Nouveau module**: `src/utils/storage.ts`
- Fonction `downloadMediaLocally()` pour télécharger les fichiers sur l'ordinateur
- Disponible dans:
  - Page Galerie (`GalleryPage.tsx`)
  - Composant `EventMediaLinks.tsx`
  - Composant `MediaGallery.tsx`

### 3. Gestion du Bucket
- **Nom du bucket**: `myfamily`
- **Accès public**: Oui (pour permettre le partage)
- **Politiques RLS**: Configurées pour sécuriser l'accès

## Structure de Stockage

### Base de Données
Table `media`:
- `id`: Identifiant unique (UUID)
- `title`: Nom du fichier
- `description`: Description optionnelle
- `file_url`: URL publique du fichier dans le storage
- `file_type`: Type (image ou document)
- `file_size`: Taille en octets (nouveau)
- `event_id`: Lien vers un événement (optionnel)
- `user_id`: Identifiant de l'utilisateur propriétaire
- `created_at`: Date de création
- `updated_at`: Date de modification

### Supabase Storage
Bucket: `myfamily`
Structure des chemins:
```
myfamily/
  ├── general/             # Médias non liés à un événement
  │   ├── timestamp-file1.jpg
  │   └── timestamp-file2.pdf
  ├── event-id-1/         # Médias liés à l'événement 1
  │   ├── timestamp-file3.jpg
  │   └── timestamp-file4.jpg
  └── event-id-2/         # Médias liés à l'événement 2
      └── timestamp-file5.pdf
```

## Politiques de Sécurité (RLS)

### Bucket Storage
1. **Upload**: Tous les utilisateurs authentifiés peuvent uploader
2. **Lecture**: Accès public (pour permettre le partage)
3. **Mise à jour**: Seuls les propriétaires peuvent modifier leurs fichiers
4. **Suppression**: Seuls les propriétaires peuvent supprimer leurs fichiers

### Table Media
Les politiques existantes s'appliquent:
- Les utilisateurs peuvent voir et gérer leurs propres médias
- Les médias peuvent être liés à des événements

## Utilisation

### 1. Upload de Fichiers
1. Naviguez vers la page **Galerie** ou un **Événement**
2. Cliquez sur **"Ajouter des médias"**
3. Glissez-déposez des fichiers ou cliquez pour sélectionner
4. Les fichiers sont automatiquement uploadés vers le bucket `myfamily`

### 2. Téléchargement Local
1. Survolez un média dans la galerie
2. Cliquez sur l'icône **"Télécharger"** (flèche vers le bas)
3. Le fichier est téléchargé dans votre dossier Téléchargements

### 3. Suppression
1. Survolez un média
2. Cliquez sur l'icône **"Supprimer"** (poubelle)
3. Confirmez la suppression
4. Le fichier est supprimé du storage ET de la base de données

## Fichiers Modifiés

### Composants
- `src/components/media/MediaUpload.tsx` - Upload vers bucket myfamily
- `src/components/media/MediaGallery.tsx` - Ajout du bouton télécharger
- `src/components/media/EventMediaLinks.tsx` - Ajout du bouton télécharger
- `src/pages/GalleryPage.tsx` - Gestion upload/download/delete

### Utilitaires
- `src/utils/storage.ts` - **NOUVEAU** - Fonctions de gestion du storage

### Migrations
- `add_file_size_to_media` - Ajout de la colonne file_size
- `create_myfamily_bucket_policies_fixed` - Politiques RLS du bucket

## Avantages

1. **Stockage Sécurisé**: Tous les fichiers sont dans Supabase Storage
2. **Traçabilité**: Chaque fichier est lié à son propriétaire
3. **Performance**: URLs publiques pour un chargement rapide
4. **Flexibilité**: Téléchargement local à la demande
5. **Scalabilité**: Supabase Storage gère automatiquement la mise à l'échelle

## Statistiques

Les statistiques administrateur (`AdminStatsPage.tsx`) incluent:
- Nombre total de médias
- Espace de stockage utilisé (en MB/GB)
- Nouveaux médias uploadés aujourd'hui
- Moyenne de médias par utilisateur

## Notes Importantes

1. **Limite de taille**: Supabase Storage a une limite de 50MB par fichier par défaut
2. **Types de fichiers**: Seuls les images et PDF sont acceptés
3. **Nettoyage**: La suppression d'un média supprime aussi le fichier du storage
4. **Bucket public**: Les fichiers sont accessibles via URL publique pour faciliter le partage
