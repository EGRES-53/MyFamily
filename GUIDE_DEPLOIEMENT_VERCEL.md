# Guide de Déploiement sur Vercel - Application SOUVIENS-TOI

Ce guide vous explique étape par étape comment déployer votre application sur Vercel.

## Prérequis

Avant de commencer, assurez-vous d'avoir :
- Un compte GitHub (gratuit)
- Un compte Vercel (gratuit)
- Votre projet Supabase configuré
- Les identifiants de votre base de données Supabase

---

## Étape 1 : Récupérer vos identifiants Supabase

### 1.1 Connexion à Supabase
1. Allez sur [https://supabase.com](https://supabase.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet

### 1.2 Copier les identifiants
1. Dans le menu de gauche, cliquez sur **⚙️ Settings** (Paramètres)
2. Cliquez sur **API** dans le sous-menu
3. Vous verrez deux informations importantes :

   **Project URL :**
   ```
   https://votre-projet-id.supabase.co
   ```

   **API Key (anon/public) :**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Copiez ces deux valeurs** dans un fichier texte temporaire

> ⚠️ **Important :** Ne partagez JAMAIS votre clé API publiquement !

---

## Étape 2 : Pousser votre code sur GitHub

### 2.1 Créer un nouveau dépôt GitHub

1. Allez sur [https://github.com](https://github.com)
2. Cliquez sur le bouton **+** en haut à droite
3. Sélectionnez **New repository**
4. Remplissez les informations :
   - **Repository name :** `souviens-toi` (ou le nom de votre choix)
   - **Description :** `Application de gestion de souvenirs familiaux`
   - **Visibility :** Private (recommandé) ou Public
5. **Ne cochez rien** (pas de README, pas de .gitignore)
6. Cliquez sur **Create repository**

### 2.2 Pousser votre code

GitHub vous affichera des instructions. Voici comment procéder :

**Si vous n'avez pas encore initialisé Git :**

```bash
# Dans votre terminal, à la racine du projet
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/souviens-toi.git
git push -u origin main
```

**Si Git est déjà initialisé :**

```bash
git add .
git commit -m "Préparation pour déploiement Vercel"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/souviens-toi.git
git push -u origin main
```

> 💡 **Astuce :** Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub

---

## Étape 3 : Déployer sur Vercel

### 3.1 Créer un compte Vercel

1. Allez sur [https://vercel.com](https://vercel.com)
2. Cliquez sur **Sign Up** (S'inscrire)
3. Choisissez **Continue with GitHub**
4. Autorisez Vercel à accéder à votre compte GitHub

### 3.2 Importer votre projet

1. Sur le tableau de bord Vercel, cliquez sur **Add New...** → **Project**
2. Vous verrez la liste de vos dépôts GitHub
3. Trouvez votre dépôt `souviens-toi`
4. Cliquez sur **Import** à côté du nom

### 3.3 Configurer le projet

Vercel détectera automatiquement que c'est un projet Vite. Voici ce que vous verrez :

#### Configure Project (Configuration du projet)

**Framework Preset :** Vite (détecté automatiquement) ✅

**Build and Output Settings :**
- **Build Command :** `npm run build` ✅
- **Output Directory :** `dist` ✅
- **Install Command :** `npm install` ✅

> ℹ️ Ces paramètres sont déjà corrects, ne les modifiez pas !

---

## Étape 4 : Ajouter les Variables d'Environnement

C'est l'étape la plus importante ! Sans ces variables, votre application ne fonctionnera pas.

### 4.1 Accéder aux variables d'environnement

1. Sur la page de configuration du projet dans Vercel
2. Descendez jusqu'à la section **Environment Variables**
3. Vous allez ajouter 2 variables

### 4.2 Ajouter la première variable (URL Supabase)

1. Dans le champ **Key** (Nom), entrez exactement :
   ```
   VITE_SUPABASE_URL
   ```

2. Dans le champ **Value** (Valeur), collez l'URL que vous avez copiée à l'étape 1.2, par exemple :
   ```
   https://votre-projet-id.supabase.co
   ```

3. Sous **Environments**, cochez les trois cases :
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Cliquez sur **Add**

### 4.3 Ajouter la deuxième variable (Clé API Supabase)

1. Dans le champ **Key** (Nom), entrez exactement :
   ```
   VITE_SUPABASE_ANON_KEY
   ```

2. Dans le champ **Value** (Valeur), collez la clé API anonyme que vous avez copiée à l'étape 1.2, par exemple :
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Sous **Environments**, cochez les trois cases :
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Cliquez sur **Add**

### 4.4 Vérification

Vous devriez maintenant voir deux variables dans la liste :

```
VITE_SUPABASE_URL          https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ✅ Parfait ! Vous pouvez continuer

---

## Étape 5 : Déployer l'application

1. Cliquez sur le bouton **Deploy** (en bas de la page)
2. Vercel va commencer à construire votre application
3. Vous verrez les logs de construction en temps réel

### Processus de déploiement

Vercel va :
1. ✅ Cloner votre code depuis GitHub
2. ✅ Installer les dépendances (`npm install`)
3. ✅ Construire l'application (`npm run build`)
4. ✅ Déployer les fichiers sur leur CDN

**Durée estimée :** 2-3 minutes

---

## Étape 6 : Vérifier le déploiement

### 6.1 Déploiement réussi

Une fois terminé, vous verrez un écran de succès avec :
- 🎉 Une animation de confettis
- 🔗 L'URL de votre application : `https://votre-projet.vercel.app`
- 📸 Une capture d'écran de votre site

### 6.2 Tester votre application

1. Cliquez sur **Visit** ou sur l'URL affichée
2. Votre application s'ouvre dans un nouvel onglet
3. Testez les fonctionnalités principales :
   - ✅ La page d'accueil s'affiche
   - ✅ Vous pouvez créer un compte
   - ✅ Vous pouvez vous connecter
   - ✅ Vous pouvez ajouter des événements

### 6.3 En cas de problème

Si vous voyez une page d'erreur :

**Erreur courante : "VITE_SUPABASE_URL is missing"**

➡️ **Solution :** Vos variables d'environnement ne sont pas configurées correctement
1. Allez dans votre projet Vercel
2. Cliquez sur **Settings** (Paramètres)
3. Cliquez sur **Environment Variables** dans le menu de gauche
4. Vérifiez que les deux variables sont bien présentes
5. Si elles sont absentes, ajoutez-les (voir Étape 4)
6. Redéployez : **Deployments** → **...** → **Redeploy**

---

## Étape 7 : Configuration du domaine personnalisé (Optionnel)

Si vous voulez utiliser votre propre nom de domaine :

### 7.1 Ajouter un domaine

1. Dans votre projet Vercel, cliquez sur **Settings**
2. Cliquez sur **Domains** dans le menu de gauche
3. Cliquez sur **Add Domain**
4. Entrez votre nom de domaine (ex: `souvenirs.votresite.com`)
5. Cliquez sur **Add**

### 7.2 Configurer les DNS

Vercel vous donnera des instructions pour configurer vos DNS :

**Pour un sous-domaine :**
```
Type: CNAME
Name: souvenirs
Value: cname.vercel-dns.com
```

**Pour un domaine racine :**
```
Type: A
Name: @
Value: 76.76.21.21
```

> ℹ️ Ces configurations se font chez votre hébergeur de domaine (OVH, Gandi, etc.)

---

## Étape 8 : Déploiements automatiques

### Comment ça marche ?

À partir de maintenant, chaque fois que vous pousserez du code sur GitHub :

```bash
git add .
git commit -m "Votre message de commit"
git push
```

Vercel va **automatiquement** :
1. 🔍 Détecter les changements
2. 🏗️ Construire votre application
3. 🚀 Déployer la nouvelle version
4. 📧 Vous envoyer un email de confirmation

**C'est complètement automatique !**

---

## Résolution de problèmes

### Problème 1 : Build échoue avec une erreur TypeScript

**Symptôme :** Le déploiement échoue avec des erreurs de type

**Solution :**
```bash
# Dans votre terminal local
npm run build

# Si ça échoue, corrigez les erreurs affichées
# Puis poussez les corrections
git add .
git commit -m "Fix: Correction des erreurs TypeScript"
git push
```

### Problème 2 : Page blanche après déploiement

**Causes possibles :**
1. ❌ Variables d'environnement manquantes
2. ❌ Erreur JavaScript dans le code

**Solution :**
1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs affichées
3. Si vous voyez "VITE_SUPABASE_URL is missing" → Retournez à l'Étape 4

### Problème 3 : 404 sur les routes

**Symptôme :** Les pages autres que l'accueil affichent une erreur 404

**Solution :** Vérifiez que le fichier `vercel.json` contient bien :
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

> ✅ Ce fichier est déjà correctement configuré dans votre projet

### Problème 4 : Les images ne s'affichent pas

**Symptôme :** Les images uploadées ne s'affichent pas

**Cause :** Configuration CORS de Supabase Storage

**Solution :**
1. Allez dans votre projet Supabase
2. **Storage** → **Policies**
3. Vérifiez que les buckets `media` et `avatars` ont des politiques publiques

---

## Commandes utiles

### Voir les logs de déploiement

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur votre projet
3. Cliquez sur **Deployments**
4. Cliquez sur un déploiement
5. Consultez les logs

### Redéployer manuellement

1. **Deployments**
2. Cliquez sur **...** à côté d'un déploiement
3. Cliquez sur **Redeploy**

### Annuler un déploiement

1. **Deployments**
2. Cliquez sur **...** à côté d'un déploiement
3. Cliquez sur **Promote to Production** sur un ancien déploiement qui fonctionnait

---

## Récapitulatif des URLs importantes

| Service | URL |
|---------|-----|
| **Votre application** | `https://votre-projet.vercel.app` |
| **Dashboard Vercel** | [https://vercel.com/dashboard](https://vercel.com/dashboard) |
| **Dashboard Supabase** | [https://supabase.com/dashboard](https://supabase.com/dashboard) |
| **GitHub Repository** | `https://github.com/VOTRE-USERNAME/souviens-toi` |

---

## Sécurité

### ✅ Bonnes pratiques

- ✅ Ne committez JAMAIS le fichier `.env` (déjà dans .gitignore)
- ✅ Utilisez uniquement la clé `anon/public` (pas la clé `service_role`)
- ✅ Configurez les RLS (Row Level Security) dans Supabase
- ✅ Utilisez HTTPS (automatique avec Vercel)

### ❌ À ne JAMAIS faire

- ❌ Partager vos clés API publiquement
- ❌ Committer le fichier `.env`
- ❌ Désactiver RLS sur les tables Supabase
- ❌ Utiliser la clé `service_role` côté client

---

## Support et aide

### En cas de problème

1. **Consultez les logs de Vercel** (voir section "Commandes utiles")
2. **Vérifiez la console du navigateur** (F12)
3. **Testez localement d'abord** :
   ```bash
   npm run build
   npm run preview
   ```

### Ressources utiles

- 📖 [Documentation Vercel](https://vercel.com/docs)
- 📖 [Documentation Supabase](https://supabase.com/docs)
- 📖 [Documentation Vite](https://vitejs.dev)

---

## Félicitations ! 🎉

Votre application est maintenant déployée et accessible à tous !

**Prochaines étapes suggérées :**
1. ✅ Partagez l'URL avec votre famille
2. ✅ Configurez un domaine personnalisé
3. ✅ Ajoutez des sauvegardes régulières
4. ✅ Surveillez l'utilisation de Supabase

**Profitez bien de votre application de souvenirs familiaux !**
