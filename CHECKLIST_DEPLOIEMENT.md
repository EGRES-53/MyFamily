# ✅ Checklist de Déploiement Vercel

Suivez cette checklist étape par étape pour ne rien oublier.

---

## 📦 Phase 1 : Préparation (5 minutes)

### ☐ 1.1 Compte GitHub
- [ ] Créé un compte sur [github.com](https://github.com)
- [ ] Confirmé mon email
- [ ] Connecté

### ☐ 1.2 Compte Vercel
- [ ] Créé un compte sur [vercel.com](https://vercel.com)
- [ ] Connecté avec GitHub
- [ ] Autorisé l'accès à GitHub

### ☐ 1.3 Identifiants Supabase
- [ ] Connecté à [supabase.com](https://supabase.com)
- [ ] Ouvert mon projet
- [ ] Allé dans **Settings** → **API**
- [ ] Copié la **Project URL** dans un fichier texte
- [ ] Copié la **anon public key** dans un fichier texte

**Exemple de ce que vous devez avoir :**
```
Project URL: https://abcdefghijklmnop.supabase.co
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzAwMDAwMCwiZXhwIjoxOTYyNTc2MDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🚀 Phase 2 : Pousser le Code sur GitHub (3 minutes)

### ☐ 2.1 Créer un Dépôt GitHub

- [ ] Allé sur [github.com/new](https://github.com/new)
- [ ] Nommé le dépôt : `souviens-toi`
- [ ] Choisi **Private**
- [ ] **IMPORTANT :** Ne coché AUCUNE option (pas de README, pas de .gitignore)
- [ ] Cliqué sur **Create repository**
- [ ] Laissé la page ouverte (vous aurez besoin de l'URL)

### ☐ 2.2 Initialiser Git Localement

Ouvrez votre terminal dans le dossier du projet et exécutez :

```bash
# Vérifier si Git est déjà initialisé
ls -la | grep .git
```

**Si vous ne voyez PAS de .git :**
- [ ] Exécuté `git init`
- [ ] Exécuté `git add .`
- [ ] Exécuté `git commit -m "Initial commit"`

**Si vous voyez déjà .git :**
- [ ] Exécuté `git add .`
- [ ] Exécuté `git commit -m "Préparation déploiement Vercel"`

### ☐ 2.3 Pousser le Code

Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub :

```bash
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/souviens-toi.git
git push -u origin main
```

- [ ] Commandes exécutées sans erreur
- [ ] Code visible sur GitHub (rafraîchissez la page)

**Vérification :**
- [ ] Je vois mes fichiers sur GitHub
- [ ] Le nombre de commits est affiché

---

## 🎯 Phase 3 : Déploiement sur Vercel (5 minutes)

### ☐ 3.1 Importer le Projet

- [ ] Allé sur [vercel.com/dashboard](https://vercel.com/dashboard)
- [ ] Cliqué sur **Add New...** (en haut à droite)
- [ ] Sélectionné **Project**
- [ ] Trouvé mon dépôt `souviens-toi` dans la liste
- [ ] Cliqué sur **Import** à côté du nom

### ☐ 3.2 Vérifier la Configuration

Vercel détecte automatiquement les paramètres. Vérifiez que vous voyez :

- [ ] **Framework Preset:** Vite
- [ ] **Build Command:** `npm run build`
- [ ] **Output Directory:** `dist`
- [ ] **Install Command:** `npm install`

> ✅ Si tout est correct, ne modifiez rien !

### ☐ 3.3 Ajouter la Variable VITE_SUPABASE_URL

Dans la section **Environment Variables** :

1. Première variable :
   - [ ] **Key :** Tapé exactement `VITE_SUPABASE_URL`
   - [ ] **Value :** Collé mon Project URL Supabase
   - [ ] Coché **Production**
   - [ ] Coché **Preview**
   - [ ] Coché **Development**
   - [ ] Cliqué sur **Add**

**Vérification :**
```
✅ VITE_SUPABASE_URL    https://xxxxx.supabase.co
```

### ☐ 3.4 Ajouter la Variable VITE_SUPABASE_ANON_KEY

2. Deuxième variable :
   - [ ] **Key :** Tapé exactement `VITE_SUPABASE_ANON_KEY`
   - [ ] **Value :** Collé ma clé anon/public Supabase
   - [ ] Coché **Production**
   - [ ] Coché **Preview**
   - [ ] Coché **Development**
   - [ ] Cliqué sur **Add**

**Vérification :**
```
✅ VITE_SUPABASE_URL         https://xxxxx.supabase.co
✅ VITE_SUPABASE_ANON_KEY    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **CRITIQUE :** Si ces variables ne sont pas exactement comme ci-dessus, l'application ne fonctionnera PAS !

### ☐ 3.5 Lancer le Déploiement

- [ ] Cliqué sur le bouton **Deploy**
- [ ] Vu l'écran de progression avec les logs
- [ ] Attendu 2-3 minutes

**Étapes visibles dans les logs :**
- [ ] ✅ Cloning repository
- [ ] ✅ Installing dependencies
- [ ] ✅ Building application
- [ ] ✅ Deploying

---

## ✅ Phase 4 : Vérification (2 minutes)

### ☐ 4.1 Déploiement Réussi

- [ ] Vu l'écran de succès avec les confettis 🎉
- [ ] Noté l'URL de mon application : `https://_____.vercel.app`
- [ ] Cliqué sur **Visit** ou sur l'URL

### ☐ 4.2 Test de l'Application

Vérifiez que tout fonctionne :

**Page d'accueil :**
- [ ] La page d'accueil s'affiche correctement
- [ ] Le logo est visible
- [ ] Les boutons sont cliquables

**Authentification :**
- [ ] Cliqué sur "S'inscrire"
- [ ] Créé un nouveau compte
- [ ] Reçu une confirmation
- [ ] Connexion réussie

**Fonctionnalités :**
- [ ] Accédé à la Timeline
- [ ] Ajouté un nouvel événement
- [ ] Uploadé une photo (si possible)
- [ ] L'événement apparaît dans la timeline

### ☐ 4.3 Test sur Mobile

- [ ] Ouvert l'URL sur mon téléphone
- [ ] L'interface est responsive
- [ ] Les fonctionnalités marchent sur mobile

---

## 🔧 Phase 5 : Configuration Avancée (Optionnel)

### ☐ 5.1 Domaine Personnalisé

Si vous voulez un domaine personnalisé :

- [ ] Acheté un nom de domaine
- [ ] Dans Vercel : **Settings** → **Domains**
- [ ] Cliqué sur **Add Domain**
- [ ] Entré mon domaine
- [ ] Configuré les DNS chez mon hébergeur
- [ ] Attendu la propagation DNS (jusqu'à 48h)

### ☐ 5.2 Notifications

- [ ] Activé les notifications Vercel par email
- [ ] Configuré les notifications sur GitHub

---

## 🚨 En Cas de Problème

### ☐ Problème 1 : Page Blanche

**Symptôme :** L'application affiche une page blanche

**Diagnostique :**
- [ ] Ouvert la console du navigateur (F12)
- [ ] Regardé les erreurs

**Si je vois "VITE_SUPABASE_URL is missing" :**
- [ ] Retourné dans Vercel → **Settings** → **Environment Variables**
- [ ] Vérifié que les deux variables sont présentes
- [ ] Si absentes, les ajouté (Phase 3.3 et 3.4)
- [ ] **Deployments** → **...** → **Redeploy**

### ☐ Problème 2 : Build Échoue

**Symptôme :** Le déploiement échoue avec des erreurs

**Diagnostique :**
- [ ] Lu les logs d'erreur dans Vercel
- [ ] Testé localement : `npm run build`

**Si ça échoue localement :**
- [ ] Corrigé les erreurs TypeScript/JavaScript
- [ ] Testé à nouveau : `npm run build`
- [ ] Poussé les corrections :
  ```bash
  git add .
  git commit -m "Fix build errors"
  git push
  ```

### ☐ Problème 3 : Erreurs 404 sur les Routes

**Symptôme :** Les pages autres que l'accueil affichent 404

**Solution :**
- [ ] Vérifié que `vercel.json` existe à la racine
- [ ] Vérifié qu'il contient les rewrites pour le SPA routing
- [ ] Si nécessaire, redéployé

---

## 📊 Récapitulatif Final

### URLs à Conserver

Notez ces URLs dans un endroit sûr :

```
Application Vercel:    https://_____.vercel.app
Dashboard Vercel:      https://vercel.com/dashboard
Dashboard Supabase:    https://supabase.com/dashboard
Repository GitHub:     https://github.com/VOTRE-USERNAME/souviens-toi
```

### Identifiants Supabase

```
Project URL:    https://_____.supabase.co
anon key:       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **Gardez ces informations en sécurité !**

---

## 🎉 Félicitations !

Vous avez réussi à déployer votre application sur Vercel !

### Prochaines Étapes

- [ ] Partagé l'URL avec ma famille
- [ ] Ajouté des événements et des photos
- [ ] Configuré des sauvegardes régulières
- [ ] Exploré les autres fonctionnalités

---

## 📅 Maintenance

### Chaque Semaine
- [ ] Vérifier que l'application fonctionne
- [ ] Consulter les métriques Vercel (Usage)
- [ ] Consulter les métriques Supabase (Database usage)

### Chaque Mois
- [ ] Faire une sauvegarde des données (script backup.js)
- [ ] Vérifier les logs pour détecter les erreurs
- [ ] Mettre à jour les dépendances si nécessaire

### En Cas de Mise à Jour
```bash
git add .
git commit -m "Nouvelle version"
git push
```
> Vercel redéploie automatiquement !

---

**Besoin d'aide ?** Consultez le [GUIDE_DEPLOIEMENT_VERCEL.md](./GUIDE_DEPLOIEMENT_VERCEL.md) pour plus de détails.
