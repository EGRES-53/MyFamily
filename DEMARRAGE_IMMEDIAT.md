# 🚀 Démarrage Immédiat - Déploiement Vercel

## 3 Étapes en 10 Minutes

---

## ✅ Étape 1 : Identifiants Supabase (2 min)

1. [supabase.com](https://supabase.com) → Connexion → Votre projet
2. **Settings** → **API**
3. Copiez dans un fichier texte :

```
URL:  https://xxxxx.supabase.co
KEY:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ Étape 2 : GitHub (3 min)

### Créer le dépôt
1. [github.com/new](https://github.com/new)
2. Nom : `souviens-toi`
3. Private
4. **Create repository**

### Pousser le code
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/souviens-toi.git
git push -u origin main
```

---

## ✅ Étape 3 : Vercel (5 min)

1. [vercel.com](https://vercel.com) → **Add New Project**
2. Import `souviens-toi`
3. Ajoutez 2 variables :

```
VITE_SUPABASE_URL        [Votre URL]
VITE_SUPABASE_ANON_KEY   [Votre KEY]
```

4. **Deploy**

---

## ✅ Terminé !

Votre URL : `https://votre-projet.vercel.app`

---

## 📚 Besoin d'Aide ?

**Guide détaillé :** [GUIDE_DEPLOIEMENT_VERCEL.md](./GUIDE_DEPLOIEMENT_VERCEL.md)

**Identifiants Supabase :** [RECUPERER_IDENTIFIANTS_SUPABASE.md](./RECUPERER_IDENTIFIANTS_SUPABASE.md)

**Tous les guides :** [INDEX_GUIDES.md](./INDEX_GUIDES.md)
