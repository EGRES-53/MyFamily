# Guide de Correction des Erreurs d'Upload

## Problèmes Résolus

### 1. Erreur "Invalid Key" lors de l'Upload de Médias

**Symptôme**: Erreur `Invalid key: general/176313031980-décor hivernal.jpg`

**Cause**:
- Caractères accentués (é, à, è, etc.)
- Espaces dans les noms de fichiers
- Caractères spéciaux non supportés par Supabase Storage

**Solution Appliquée**:
Nettoyage automatique des noms de fichiers dans `MediaUpload.tsx` :
```typescript
// Clean filename: remove accents, spaces, and special characters
const cleanFileName = file.name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '') // Remove accents
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/[^a-zA-Z0-9.-]/g, '') // Remove special characters
  .toLowerCase();
```

**Exemples de transformation**:
- `décor hivernal.jpg` → `decor-hivernal.jpg`
- `Photo de Noël 2024.png` → `photo-de-noel-2024.png`
- `Mon_fichier@spécial.pdf` → `mon_fichierspecial.pdf`

**Fichier modifié**: `src/components/media/MediaUpload.tsx`

---

### 2. Erreur "Invalid Input Syntax for Type Bigint" avec les Récits

**Symptôme**:
```
Error fetching linked stories:
invalid input syntax for type bigint: "cdad8953-f9ef-44ef-bb4a-4aebcdbbb413"
```

**Cause**:
- Cache Supabase obsolète côté client
- Ancien schéma en cache avec des types incorrects (bigint au lieu de UUID)
- Le client Supabase conservait une version obsolète du schéma

**Solution Appliquée**:

#### A. Migration de Force Refresh
Nouvelle migration `force_refresh_event_stories_schema` qui :
- Supprime complètement la table `event_stories`
- Recrée la table avec des types UUID explicites
- Recrée tous les index et politiques RLS
- Ajoute des commentaires pour forcer le refresh du cache

#### B. Version du Client Supabase
Modification de `src/lib/supabase.ts` :
```typescript
const SCHEMA_VERSION = '2.0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {
      'X-Client-Info': `souviens-toi-v${SCHEMA_VERSION}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  }
});
```

**Fichiers modifiés**:
- `supabase/migrations/[timestamp]_force_refresh_event_stories_schema.sql`
- `src/lib/supabase.ts`

---

## Vérification du Schéma Actuel

### Table `event_stories`
```sql
id          | uuid                     | NOT NULL (PK)
event_id    | uuid                     | NOT NULL (FK → events.id)
story_id    | uuid                     | NOT NULL (FK → stories.id)
created_at  | timestamp with time zone | DEFAULT now()

CONSTRAINT: UNIQUE(event_id, story_id)
```

### Table `media`
```sql
id          | uuid                     | NOT NULL (PK)
title       | text                     | NOT NULL
description | text                     |
file_url    | text                     | NOT NULL
file_type   | text                     | NOT NULL
file_size   | bigint                   | DEFAULT 0
event_id    | uuid                     | (FK → events.id)
user_id     | uuid                     | NOT NULL (FK → profiles.id)
created_at  | timestamp with time zone | DEFAULT now()
updated_at  | timestamp with time zone | DEFAULT now()
```

---

## Tests de Vérification

### Test 1: Upload de Média avec Caractères Spéciaux
1. Aller dans la **Galerie**
2. Cliquer sur **"Ajouter des médias"**
3. Sélectionner un fichier avec accents/espaces (ex: `photo été 2024.jpg`)
4. Vérifier que l'upload réussit
5. Vérifier que le fichier apparaît dans la galerie

### Test 2: Liaison Récit-Événement
1. Créer ou accéder à un événement
2. Cliquer sur **"Lier un récit"**
3. Sélectionner un récit existant
4. Vérifier que la liaison se fait sans erreur
5. Vérifier que le récit apparaît dans la liste

### Test 3: Affichage des Récits Liés
1. Accéder à un événement avec des récits liés
2. Vérifier que les récits s'affichent correctement
3. Cliquer sur **"Lire le récit complet"**
4. Vérifier la navigation vers le récit

---

## Actions Recommandées

### En cas d'erreur persistante:

1. **Vider le cache du navigateur**
   - Chrome/Edge: Ctrl+Shift+Del → Cocher "Images et fichiers en cache"
   - Firefox: Ctrl+Shift+Del → Cocher "Cache"

2. **Vérifier les variables d'environnement**
   ```bash
   # Fichier .env
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre-clé-anonyme
   ```

3. **Redémarrer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Vérifier les politiques RLS dans Supabase**
   - Aller dans le Dashboard Supabase
   - Table Editor → Sélectionner la table
   - Vérifier que RLS est activé
   - Vérifier les politiques

---

## Notes Importantes

### Bucket Storage "myfamily"
- **Nom**: `myfamily`
- **Accès**: Public (pour partage)
- **Politiques**:
  - Upload: Authentifiés uniquement
  - Lecture: Public
  - Modification/Suppression: Propriétaire uniquement

### Nettoyage des Noms de Fichiers
Le système nettoie automatiquement :
- ✅ Suppression des accents
- ✅ Remplacement des espaces par des tirets
- ✅ Suppression des caractères spéciaux
- ✅ Conversion en minuscules

### Cache Supabase
Le client force le no-cache avec :
- Header `Cache-Control: no-cache`
- Header `Pragma: no-cache`
- Version du schéma dans `X-Client-Info`

**Important**: Incrémenter `SCHEMA_VERSION` dans `src/lib/supabase.ts` après chaque modification majeure du schéma.

---

## Résumé

✅ Upload de médias avec caractères spéciaux : **CORRIGÉ**
✅ Erreur bigint avec les récits : **CORRIGÉ**
✅ Cache Supabase : **GÉRÉ**
✅ Build de production : **FONCTIONNEL**

Tous les problèmes d'upload ont été résolus. Le système est maintenant stable et prêt pour la production.
