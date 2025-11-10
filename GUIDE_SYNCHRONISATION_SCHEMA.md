# 🔄 Guide de Synchronisation du Schéma avec Bolt

## 📋 Changements Apportés

Ton application locale utilise maintenant **EXACTEMENT le même schéma** que l'application sur Bolt.

### ✅ Modifications Effectuées

#### 1. **Changement Principal : `created_by` → `user_id`**

Toutes les tables utilisent maintenant `user_id` au lieu de `created_by` :
- ✅ Table `events`
- ✅ Table `stories`
- ✅ Table `media`
- ✅ Table `persons`
- ✅ Table `relations`

#### 2. **Table `media` - Nouvelles Colonnes**
- ✅ `uploaded_at` (timestamptz) - Date d'upload
- ✅ `story_id` (uuid) - Pour lier aux récits
- ✅ `person_id` (uuid) - Pour lier aux personnes

#### 3. **Table `persons`**
- ✅ `bio` renommée en `notes`
- ✅ `photo_url` supprimée (utilise media à la place)

#### 4. **Table `relations`**
- ✅ `person1_id` → `person_id_a`
- ✅ `person2_id` → `person_id_b`
- ✅ `relation_type` → `type`
- ✅ Ajout de `user_id`
- ✅ Ajout de `note`

#### 5. **Code TypeScript**
- ✅ Tous les fichiers `.ts` et `.tsx` mis à jour
- ✅ Types mis à jour dans `src/types/index.ts`
- ✅ Toutes les requêtes SQL mises à jour

---

## 🚀 Comment Appliquer ces Changements

### Étape 1 : Exécuter le Script SQL

1. **Ouvre ton Dashboard Supabase** : https://app.supabase.com
2. Va dans **SQL Editor**
3. Clique sur **New Query**
4. **Copie-colle** le contenu du fichier `SCHEMA_SYNC_BOLT.sql`
5. Clique sur **Run** (ou `Ctrl + Enter`)

Le script va :
- ✅ Renommer toutes les colonnes `created_by` en `user_id`
- ✅ Ajouter les colonnes manquantes dans `media`
- ✅ Renommer les colonnes dans `persons` et `relations`
- ✅ Mettre à jour toutes les politiques RLS
- ✅ Afficher un résumé des colonnes

### Étape 2 : Vérifier que le Script a Fonctionné

Dans l'éditeur SQL, exécute :

```sql
-- Vérifie que user_id existe dans events
SELECT column_name FROM information_schema.columns
WHERE table_name = 'events' AND column_name = 'user_id';

-- Vérifie que created_by n'existe plus
SELECT column_name FROM information_schema.columns
WHERE table_name = 'events' AND column_name = 'created_by';
```

Résultat attendu :
- ✅ La première requête retourne `user_id`
- ✅ La deuxième requête ne retourne rien

### Étape 3 : Vider le Cache du Navigateur

**C'EST ESSENTIEL !**

#### Chrome/Edge/Brave :
1. `F12` pour ouvrir DevTools
2. **Clic droit** sur le bouton rafraîchir 🔄
3. **"Vider le cache et actualiser"**

#### Firefox :
1. `Ctrl + Shift + Delete`
2. Coche "Cache"
3. Clique "Effacer"

### Étape 4 : Supprimer le localStorage

Console du navigateur (F12) :

```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Étape 5 : Redémarrer le Serveur

```bash
# Dans le terminal, arrête avec Ctrl+C
# Puis relance :
npm run dev
```

---

## 🧪 Tester que Tout Fonctionne

### Test 1 : Page de Diagnostic

1. Va sur `http://localhost:5173/test`
2. Clique sur **"Tests Système"**
3. Tous les tests doivent passer ✅

### Test 2 : Créer un Événement

1. Va sur **"Chronologie"**
2. Clique **"Ajouter un événement"**
3. Remplis le formulaire
4. Clique **"Créer l'événement"**

**Ça doit fonctionner sans erreur !** 🎉

### Test 3 : Créer un Récit

1. Va sur **"Récits"**
2. Clique **"Ajouter un récit"**
3. Remplis le formulaire
4. Clique **"Créer le récit"**

**Ça doit fonctionner !** ✅

### Test 4 : Upload de Média

1. Va sur **"Galerie"**
2. Clique **"Ajouter des médias"**
3. Upload une image
4. L'image doit apparaître dans la galerie

---

## 📊 Différences Principales avec l'Ancien Schéma

| Avant | Après | Raison |
|-------|-------|--------|
| `created_by` | `user_id` | Cohérence avec Bolt |
| `persons.bio` | `persons.notes` | Nom plus approprié |
| `person1_id` | `person_id_a` | Clarté des relations |
| `relation_type` | `type` | Simplicité |

---

## 🔐 Politiques RLS Mises à Jour

Toutes les politiques ont été recréées avec `user_id` :

```sql
-- Exemple pour events
CREATE POLICY "Users can view own events"
  ON events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```

Les politiques garantissent que :
- ✅ Chaque utilisateur voit **seulement** ses propres données
- ✅ Personne ne peut modifier les données d'un autre utilisateur
- ✅ La sécurité est maximale

---

## ⚠️ Points d'Attention

### 1. Données Existantes

Si tu as déjà des données dans ta base :
- ✅ Elles sont **préservées**
- ✅ Les colonnes sont juste **renommées**
- ✅ **Aucune perte de données**

### 2. Compatibilité

Après cette migration :
- ✅ Ton app locale = Exactement comme Bolt
- ✅ Tu peux déployer sur Vercel/Netlify sans problème
- ✅ Le code fonctionne partout pareil

### 3. Si tu as des Erreurs

Si après la migration tu vois encore des erreurs :

1. **Vérifie que le script SQL s'est bien exécuté**
   ```sql
   SELECT column_name FROM information_schema.columns
   WHERE table_name = 'events';
   ```

2. **Vide VRAIMENT le cache**
   - Navigation privée pour tester
   - Ou change de navigateur

3. **Redémarre le serveur**
   - Arrête complètement (Ctrl+C)
   - Relance `npm run dev`

---

## 💡 Pourquoi cette Migration ?

### Problème Avant

- Ton app locale utilisait `created_by`
- Bolt utilise `user_id`
- → **Incompatibilité** de schéma
- → Erreurs en production

### Solution Maintenant

- ✅ Même schéma partout
- ✅ Code identique Bolt/Local
- ✅ Pas de surprise en production

---

## 🎯 Checklist de Migration

- [ ] Script SQL exécuté dans Supabase Dashboard
- [ ] Vérification que `user_id` existe
- [ ] Cache navigateur vidé
- [ ] localStorage supprimé
- [ ] Serveur redémarré
- [ ] Page `/test` vérifiée (tous verts ✅)
- [ ] Création d'événement testée
- [ ] Création de récit testée
- [ ] Upload de média testé

---

## 🆘 Besoin d'Aide ?

### Le script SQL ne s'exécute pas

- Vérifie que tu es dans le bon projet Supabase
- Vérifie que tu as les droits d'administration
- Essaye de copier-coller le script par parties

### Toujours des erreurs après migration

1. Ouvre la console (F12)
2. Va sur `/test`
3. Fais une capture des résultats
4. Copie les erreurs exactes

### Le cache ne se vide pas

Solution radicale :
1. Utilise le mode **Navigation Privée**
2. Ou change de navigateur temporairement
3. Ou désinstalle/réinstalle le navigateur (extrême)

---

## ✅ Confirmation Finale

Après avoir suivi tous les steps :

Tu devrais pouvoir :
1. ✅ T'inscrire
2. ✅ Te connecter
3. ✅ Créer des événements
4. ✅ Créer des récits
5. ✅ Uploader des médias
6. ✅ Lier récits et médias aux événements

**Si tout ça marche : FÉLICITATIONS !** 🎉

Ton app locale est maintenant **100% synchronisée** avec le schéma de Bolt !

---

## 📚 Fichiers Importants

- `SCHEMA_SYNC_BOLT.sql` - Script de migration SQL
- `QUICKFIX.md` - Solution rapide cache
- `FIX_PROBLEME_LOCAL.md` - Guide complet dé bogage
- `GUIDE_LIAISON_RECITS_MEDIAS.md` - Guide des nouvelles fonctionnalités

---

**Note** : Cette migration est **safe** et **réversible**. En cas de problème, tu peux toujours revenir en arrière en restaurant un backup de ta base de données.
