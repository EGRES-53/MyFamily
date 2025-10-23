# 🚀 Guide de Déploiement GitHub + Vercel - SOUVIENS_TOI

## 📋 Étapes de Déploiement

### 1. 📁 Créer le Repository GitHub

1. **Va sur** [github.com](https://github.com)
2. **Clique** sur "New repository" (bouton vert)
3. **Nom du repository** : `souviens-toi`
4. **Description** : `Application de chronologie familiale`
5. **Public** ou **Private** (ton choix)
6. **NE PAS** cocher "Add a README file" (on en a déjà un)
7. **Clique** sur "Create repository"

### 2. 🔗 Connecter le Code au Repository

**GitHub te donnera des commandes comme ça :**

```bash
git remote add origin https://github.com/TON-USERNAME/souviens-toi.git
git branch -M main
git push -u origin main
```

**Copie ces commandes** et dis-moi, je les exécuterai !

### 3. 🚀 Déployer sur Vercel

1. **Va sur** [vercel.com](https://vercel.com)
2. **Connecte-toi** avec GitHub
3. **Clique** sur "New Project"
4. **Sélectionne** ton repository `souviens-toi`
5. **Import Project**

### 4. ⚙️ Variables d'Environnement Vercel

**Dans Vercel, ajoute ces variables :**

- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://ton-projet.supabase.co`

- **Name:** `VITE_SUPABASE_ANON_KEY`  
- **Value:** `ta-cle-anonyme`

### 5. ✅ Déploiement

**Vercel va :**
- ✅ Installer les dépendances
- ✅ Builder l'application
- ✅ Déployer automatiquement
- ✅ Te donner une URL : `https://souviens-toi.vercel.app`

## 🎯 Avantages

### ✅ **Déploiements Automatiques**
- Chaque modification → mise à jour automatique
- Plus besoin de redéployer manuellement

### ✅ **Sauvegarde Sécurisée**
- Code sauvegardé sur GitHub
- Historique complet des versions
- Impossible de perdre le travail

### ✅ **Collaboration**
- Partage facile du code
- Contributions possibles
- Gestion des versions

### ✅ **Portabilité**
- Peux déployer sur n'importe quelle plateforme
- Pas dépendant d'un seul service

## 🔄 **Workflow Futur**

```
Modification du code → Git push → Déploiement automatique Vercel
```

**Plus jamais de problème de déploiement !** 🎉

## 📞 **Support**

Si tu as des questions :
1. **GitHub** : [docs.github.com](https://docs.github.com)
2. **Vercel** : [vercel.com/docs](https://vercel.com/docs)
3. **Supabase** : [supabase.com/docs](https://supabase.com/docs)

---

**Prêt pour un déploiement professionnel ! 🚀**