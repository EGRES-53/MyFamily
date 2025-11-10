# 🚀 Guide de Déploiement - SOUVIENS_TOI

## 📋 Prérequis
- Compte GitHub
- Compte Vercel (gratuit)
- Variables d'environnement Supabase

## 🔧 Étapes de Déploiement

### 1. Repository GitHub
```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - SOUVIENS_TOI app"

# Ajouter l'origine GitHub
git remote add origin https://github.com/TON-USERNAME/souviens-toi.git

# Pousser vers GitHub
git push -u origin main
```

### 2. Déploiement Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Importer le repository `souviens-toi`
4. Configurer les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Déployer !

### 3. Variables d'Environnement
```env
VITE_SUPABASE_URL=https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY=ta-cle-anonyme
```

## ✅ Avantages
- ✅ Déploiements automatiques
- ✅ Historique des versions
- ✅ Rollback facile
- ✅ Collaboration possible
- ✅ Sauvegarde sécurisée

## 🔄 Mises à Jour Futures
```bash
# Faire des modifications
# Puis :
git add .
git commit -m "Description des changements"
git push

# Vercel déploie automatiquement !
```

## 🌐 URLs
- **Production** : https://ton-app.vercel.app
- **GitHub** : https://github.com/TON-USERNAME/souviens-toi
- **Vercel Dashboard** : https://vercel.com/dashboard