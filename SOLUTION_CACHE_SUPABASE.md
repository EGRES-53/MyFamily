# 🔧 Solution : Problème de Cache Supabase

## 🚨 Problème Identifié

L'erreur "Could not find the 'created_by' column" apparaît parce que **le cache du schéma de Supabase dans le navigateur** n'est pas synchronisé avec la base de données actuelle.

---

## ✅ Solutions (à essayer dans l'ordre)

### Solution 1 : Vider le Cache du Navigateur (RECOMMANDÉ)

#### Chrome / Edge / Brave :
1. Ouvre les **DevTools** (F12)
2. **Clic droit** sur le bouton de rafraîchissement 🔄
3. Choisis **"Vider le cache et effectuer une actualisation forcée"**
4. OU utilise : `Ctrl + Shift + Delete` → Vide tout le cache

#### Firefox :
1. `Ctrl + Shift + Delete`
2. Coche "Cache"
3. Clique sur "Effacer maintenant"
4. Recharge la page avec `Ctrl + F5`

#### Safari :
1. Préférences → Avancées → Cocher "Afficher le menu Développement"
2. Menu Développement → Vider les caches
3. `Cmd + Option + E`

---

### Solution 2 : Supprimer les Données du Site

#### Chrome / Edge :
1. Va dans `chrome://settings/content/all`
2. Cherche `localhost:5173`
3. Clique sur l'icône de la corbeille pour **tout supprimer**
4. Recharge l'application

---

### Solution 3 : Mode Navigation Privée / Incognito

1. Ouvre une **fenêtre de navigation privée**
2. Va sur `http://localhost:5173`
3. Teste l'inscription et la création d'événement
4. Si ça fonctionne → Le problème vient bien du cache

---

### Solution 4 : Supprimer le localStorage

Ouvre la console du navigateur (F12) et exécute :

```javascript
// Supprime toutes les données Supabase en cache
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

### Solution 5 : Redémarrer le Serveur de Développement

```bash
# Arrête le serveur (Ctrl+C)
# Puis relance
npm run dev
```

Et vide le cache du navigateur après.

---

## 🔍 Vérification que tes Clés Supabase Fonctionnent

### Étape 1 : Vérifie ton fichier `.env`

```env
VITE_SUPABASE_URL=https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY=ta-cle-anon
```

**Important** :
- Les variables DOIVENT commencer par `VITE_`
- Pas d'espaces autour du `=`
- Pas de guillemets

### Étape 2 : Vérifie que les variables sont bien chargées

Ajoute ceci dans la console du navigateur :

```javascript
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
```

Si l'une des deux est `undefined` → Le fichier `.env` n'est pas bien configuré.

---

## 🧪 Test de Connexion à la Base de Données

### Dans la console du navigateur (F12) :

```javascript
// Test de connexion
const { data, error } = await supabase.from('events').select('*').limit(1);
console.log('Data:', data);
console.log('Error:', error);
```

Si tu vois une erreur → Vérifie :
1. Que l'URL Supabase est correcte
2. Que la clé ANON est correcte
3. Que tu es bien connecté à Internet

---

## 📋 Checklist de Débogage

- [ ] J'ai vidé le cache du navigateur
- [ ] J'ai supprimé localStorage/sessionStorage
- [ ] J'ai redémarré le serveur dev
- [ ] Mon fichier `.env` est à la racine du projet
- [ ] Les variables commencent par `VITE_`
- [ ] J'ai vérifié que les clés sont bien chargées
- [ ] J'ai testé en mode navigation privée
- [ ] J'ai vérifié que je peux me connecter à Supabase directement

---

## 🎯 Si Rien ne Fonctionne

### Essaye cette manipulation complète :

```bash
# 1. Arrête le serveur
# Ctrl+C

# 2. Supprime le dossier node_modules/.vite (cache Vite)
rm -rf node_modules/.vite

# 3. Supprime le dossier dist
rm -rf dist

# 4. Relance le serveur
npm run dev
```

Puis dans le navigateur :
1. Vide le cache complet
2. Ferme tous les onglets localhost
3. Rouvre l'application
4. Essaye de t'inscrire et créer un événement

---

## 🔐 Vérification des Permissions RLS (Row Level Security)

Si tu peux t'inscrire mais pas créer d'événements, vérifie les politiques RLS dans Supabase :

### Dans le Dashboard Supabase :

1. Va dans **Authentication** → Vérifie que ton utilisateur existe
2. Va dans **Database** → **Tables** → `events`
3. Clique sur **RLS Policies**
4. Vérifie qu'il y a une politique **INSERT** qui permet aux utilisateurs authentifiés de créer des événements

La politique devrait ressembler à :
```sql
CREATE POLICY "Authenticated users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);
```

---

## 💡 Astuce : Force le Rechargement

Ajoute `?nocache=` + timestamp dans l'URL :

```
http://localhost:5173/?nocache=1234567890
```

Change le nombre à chaque fois pour forcer un nouveau chargement.

---

## 🆘 Si le Problème Persiste

1. **Exporte tes données** avec le script de backup :
   ```bash
   npm run backup
   ```

2. **Vérifie la console du navigateur** pour voir les erreurs exactes

3. **Copie-colle l'erreur complète** pour qu'on puisse mieux diagnostiquer

4. **Vérifie que ta base Supabase est bien accessible** en allant sur ton dashboard Supabase

---

## ✅ Confirmation que Tout Fonctionne

Après avoir appliqué ces solutions, tu devrais pouvoir :

1. ✅ T'inscrire
2. ✅ Te connecter
3. ✅ Créer des événements
4. ✅ Créer des récits
5. ✅ Uploader des médias
6. ✅ Lier récits et médias aux événements

Si tout fonctionne : **Félicitations !** 🎉

Si ça ne fonctionne toujours pas : Partage l'erreur exacte que tu vois dans la console.
