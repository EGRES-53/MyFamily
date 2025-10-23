# 🚀 Guide de Déploiement Web - SOUVIENS_TOI

Ce guide te permet de déployer ton application sur le web en quelques minutes.

---

## 📋 Prérequis

✅ Un compte **GitHub** (gratuit)
✅ Un compte **Vercel** ou **Netlify** (gratuit)
✅ Ton projet **Supabase** déjà configuré

---

## 🎯 MÉTHODE 1 : Déploiement sur Vercel (RECOMMANDÉ)

### Étape 1 : Préparer ton code sur GitHub

1. **Va sur GitHub** : https://github.com
2. **Crée un nouveau repository** :
   - Clique sur le `+` en haut à droite → "New repository"
   - Nom : `souviens-toi` (ou le nom de ton choix)
   - Visibilité : **Private** (recommandé)
   - ❌ **NE coche PAS** "Initialize this repository with a README"
   - Clique sur **"Create repository"**

3. **Upload tes fichiers** :
   - Sur la page du repository vide, clique sur **"uploading an existing file"**
   - **IMPORTANT** : Sélectionne TOUS les fichiers de ton projet **SAUF** :
     - ❌ Le dossier `node_modules/`
     - ❌ Le dossier `dist/`
     - ❌ Le fichier `.env` (ne jamais publier ce fichier !)

   **Fichiers à inclure absolument** :
   - ✅ Tout le dossier `src/`
   - ✅ Tout le dossier `supabase/`
   - ✅ Tout le dossier `public/`
   - ✅ `package.json`
   - ✅ `package-lock.json`
   - ✅ `vite.config.ts`
   - ✅ `tsconfig.json`
   - ✅ `tailwind.config.js`
   - ✅ `postcss.config.js`
   - ✅ `index.html`
   - ✅ `vercel.json`
   - ✅ `.env.example`
   - ✅ `.gitignore`

4. **Commit** :
   - Écris un message : "Initial commit"
   - Clique sur **"Commit changes"**

---

### Étape 2 : Déployer sur Vercel

1. **Va sur Vercel** : https://vercel.com
2. **Connecte-toi** avec ton compte GitHub
3. **Importe ton projet** :
   - Clique sur **"Add New..."** → **"Project"**
   - Sélectionne ton repository `souviens-toi`
   - Clique sur **"Import"**

4. **Configure ton projet** :
   - **Framework Preset** : Vite (détecté automatiquement)
   - **Build Command** : `npm run build` (déjà configuré)
   - **Output Directory** : `dist` (déjà configuré)

5. **⚠️ ÉTAPE CRUCIALE : Configure les variables d'environnement** :
   - Avant de cliquer sur "Deploy", déplie **"Environment Variables"**
   - Ajoute ces 2 variables :

   ```
   Nom : VITE_SUPABASE_URL
   Valeur : https://npsyrtmjjfrmxsxxarye.supabase.co
   ```

   ```
   Nom : VITE_SUPABASE_ANON_KEY
   Valeur : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wc3lydG1qamZybXhzeHhhcnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MjgzMTgsImV4cCI6MjA3NTMwNDMxOH0.OA_wcctctqHtcflFQquldvffOsXIxEGWiFfYw--iC8g
   ```

6. **Déploie** :
   - Clique sur **"Deploy"**
   - Attends 1-2 minutes (Vercel va installer les dépendances et construire ton app)

7. **Teste ton site** :
   - Une fois le déploiement terminé, clique sur **"Visit"**
   - Tu verras ton app en ligne ! 🎉
   - L'URL sera du type : `https://souviens-toi.vercel.app`

---

## 🎯 MÉTHODE 2 : Déploiement sur Netlify (ALTERNATIVE)

### Étape 1 : Préparer ton code sur GitHub

**Suis les mêmes étapes que pour Vercel** (voir ci-dessus)

---

### Étape 2 : Déployer sur Netlify

1. **Va sur Netlify** : https://netlify.com
2. **Connecte-toi** avec ton compte GitHub
3. **Importe ton projet** :
   - Clique sur **"Add new site"** → **"Import an existing project"**
   - Sélectionne **"GitHub"**
   - Autorise Netlify à accéder à tes repositories
   - Sélectionne ton repository `souviens-toi`

4. **Configure ton projet** :
   - **Build command** : `npm run build` (déjà configuré dans netlify.toml)
   - **Publish directory** : `dist` (déjà configuré dans netlify.toml)

5. **⚠️ ÉTAPE CRUCIALE : Configure les variables d'environnement** :
   - Avant de cliquer sur "Deploy", va dans **"Site settings"** → **"Environment variables"**
   - Clique sur **"Add a variable"**
   - Ajoute ces 2 variables :

   ```
   Key : VITE_SUPABASE_URL
   Value : https://npsyrtmjjfrmxsxxarye.supabase.co
   ```

   ```
   Key : VITE_SUPABASE_ANON_KEY
   Value : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wc3lydG1qamZybXhzeHhhcnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MjgzMTgsImV4cCI6MjA3NTMwNDMxOH0.OA_wcctctqHtcflFQquldvffOsXIxEGWiFfYw--iC8g
   ```

6. **Déploie** :
   - Retourne à l'onglet **"Deploys"**
   - Clique sur **"Deploy site"**
   - Attends 1-2 minutes

7. **Teste ton site** :
   - Une fois le déploiement terminé, clique sur le lien du site
   - L'URL sera du type : `https://random-name-123.netlify.app`
   - Tu peux changer ce nom dans **"Site settings"** → **"Change site name"**

---

## 🔒 Configurer Supabase pour ton site web

**IMPORTANT** : Tu dois autoriser ton domaine web dans Supabase.

1. **Va sur ton dashboard Supabase** : https://supabase.com/dashboard
2. **Sélectionne ton projet** : `npsyrtmjjfrmxsxxarye`
3. **Va dans "Authentication"** → **"URL Configuration"**
4. **Ajoute ton URL de déploiement** dans **"Site URL"** :
   - Pour Vercel : `https://souviens-toi.vercel.app`
   - Pour Netlify : `https://ton-nom-de-site.netlify.app`

5. **Ajoute aussi dans "Redirect URLs"** :
   - `https://ton-site.vercel.app/**`
   - `https://ton-site.netlify.app/**`

6. **Clique sur "Save"**

---

## 🔧 Mises à jour futures

### Pour mettre à jour ton site après avoir fait des modifications :

**Méthode simple (via GitHub)** :

1. Va sur ton repository GitHub
2. Navigue vers le fichier que tu veux modifier
3. Clique sur l'icône crayon (Edit)
4. Fais tes modifications
5. Clique sur "Commit changes"
6. **Vercel/Netlify redéploiera automatiquement** en 1-2 minutes ! 🚀

**Méthode avancée (via Git en local)** :

Si tu utilises Git en local :
```bash
git add .
git commit -m "Description de tes modifications"
git push origin main
```

Le site se mettra à jour automatiquement !

---

## ✅ Checklist finale

- [ ] Repository GitHub créé
- [ ] Tous les fichiers uploadés (sauf node_modules, dist, .env)
- [ ] Compte Vercel ou Netlify créé
- [ ] Projet importé depuis GitHub
- [ ] Variables d'environnement VITE_SUPABASE_URL ajoutée
- [ ] Variable d'environnement VITE_SUPABASE_ANON_KEY ajoutée
- [ ] Site déployé avec succès
- [ ] URL de production ajoutée dans Supabase Auth
- [ ] Test de connexion réussi sur le site en ligne
- [ ] Test de création d'événement réussi
- [ ] Test de la galerie réussi
- [ ] Test des récits réussi

---

## 🆘 Problèmes courants

### 1. "Failed to compile" pendant le déploiement
**Solution** : Vérifie que tu as bien uploadé tous les fichiers nécessaires (package.json, tsconfig.json, etc.)

### 2. Page blanche après déploiement
**Solution** : Vérifie que les variables d'environnement sont bien configurées dans Vercel/Netlify

### 3. Erreur de connexion Supabase
**Solution** : Vérifie que ton URL de production est bien ajoutée dans Supabase → Authentication → URL Configuration

### 4. Les images ne s'affichent pas
**Solution** : Vérifie que le dossier `public/` a bien été uploadé sur GitHub

### 5. Erreur 404 sur les routes
**Solution** : Le fichier `vercel.json` ou `netlify.toml` doit être présent à la racine du projet

---

## 🎉 Félicitations !

Ton application **SOUVIENS_TOI** est maintenant en ligne et accessible depuis n'importe où dans le monde ! 🌍

Tu peux partager le lien avec ta famille pour qu'ils créent leur compte et commencent à ajouter des souvenirs.

---

## 📞 Support

Si tu rencontres des problèmes, vérifie :
1. Les logs de déploiement sur Vercel/Netlify
2. La console du navigateur (F12) pour voir les erreurs
3. Que toutes les variables d'environnement sont correctement configurées
