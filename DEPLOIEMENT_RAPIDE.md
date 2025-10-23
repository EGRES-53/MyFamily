# Déploiement Rapide sur Vercel - 5 Minutes

Guide ultra-rapide pour déployer votre application en 5 minutes chrono.

---

## 📋 Checklist Avant de Commencer

- [ ] Compte GitHub créé
- [ ] Compte Vercel créé
- [ ] Identifiants Supabase récupérés

---

## ⚡ Étape 1 : Récupérer les Identifiants Supabase (1 min)

1. Allez sur [supabase.com](https://supabase.com) → Votre projet
2. **Settings** → **API**
3. Copiez ces deux valeurs :

```
Project URL:      https://xxxxx.supabase.co
anon/public Key:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> 💡 Gardez ces valeurs ouvertes dans un fichier texte

---

## ⚡ Étape 2 : Pousser sur GitHub (1 min)

```bash
# Dans votre terminal, à la racine du projet
git init
git add .
git commit -m "Deploy to Vercel"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/souviens-toi.git
git push -u origin main
```

> ⚠️ Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub

---

## ⚡ Étape 3 : Déployer sur Vercel (3 min)

### 3.1 Importer le projet (30 sec)

1. Allez sur [vercel.com](https://vercel.com)
2. **Add New...** → **Project**
3. Trouvez votre dépôt `souviens-toi`
4. Cliquez sur **Import**

### 3.2 Ajouter les Variables d'Environnement (1 min)

Dans la section **Environment Variables** :

**Variable 1 :**
```
Key:   VITE_SUPABASE_URL
Value: [Collez votre Project URL]
✅ Production ✅ Preview ✅ Development
```

**Variable 2 :**
```
Key:   VITE_SUPABASE_ANON_KEY
Value: [Collez votre anon/public Key]
✅ Production ✅ Preview ✅ Development
```

### 3.3 Déployer (1 min 30)

1. Cliquez sur **Deploy**
2. Attendez 2-3 minutes
3. ✅ C'est prêt !

---

## 🎉 Votre Application est en Ligne !

**URL :** `https://votre-projet.vercel.app`

### Tester immédiatement

- ✅ Ouvrez l'URL
- ✅ Créez un compte
- ✅ Ajoutez un événement
- ✅ Téléchargez une photo

---

## 🔄 Mises à Jour Automatiques

Chaque fois que vous poussez du code sur GitHub, Vercel redéploie automatiquement :

```bash
git add .
git commit -m "Nouvelle fonctionnalité"
git push
```

**C'est automatique !** Vercel détecte, construit et déploie en 2-3 minutes.

---

## 🚨 Problèmes Courants

### Page blanche ?

**Vérifiez la console du navigateur (F12)**

Si vous voyez : `VITE_SUPABASE_URL is missing`

➡️ **Solution :**
1. Vercel → Votre projet → **Settings** → **Environment Variables**
2. Ajoutez les deux variables (voir Étape 3.2)
3. **Deployments** → **...** → **Redeploy**

### Build échoue ?

**Testez localement d'abord :**

```bash
npm run build
```

Si ça échoue, corrigez les erreurs, puis :

```bash
git add .
git commit -m "Fix build errors"
git push
```

---

## 📞 Besoin d'Aide ?

Consultez le guide détaillé : [GUIDE_DEPLOIEMENT_VERCEL.md](./GUIDE_DEPLOIEMENT_VERCEL.md)

---

## ✅ C'est Tout !

Votre application est maintenant accessible à toute votre famille !

**Partagez l'URL et profitez de vos souvenirs ! 🎊**
