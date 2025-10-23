# 🔑 Comment Récupérer vos Identifiants Supabase

Ce guide vous montre exactement où trouver vos identifiants Supabase nécessaires pour Vercel.

---

## 🎯 Ce que vous cherchez

Vous avez besoin de **2 informations** :

1. **Project URL** (URL de votre projet)
   - Format : `https://xxxxx.supabase.co`

2. **API Key (anon/public)** (Clé API publique)
   - Format : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...`

---

## 📍 Étape par Étape

### Étape 1 : Se Connecter à Supabase

1. Ouvrez votre navigateur
2. Allez sur [https://supabase.com](https://supabase.com)
3. Cliquez sur **Sign In** (en haut à droite)
4. Connectez-vous avec vos identifiants

---

### Étape 2 : Sélectionner votre Projet

Une fois connecté, vous arrivez sur le **Dashboard** :

```
┌─────────────────────────────────────────────────┐
│  Supabase                                       │
│  ┌───────────────────────────────────────┐     │
│  │ All Projects                          ▼│     │
│  └───────────────────────────────────────┘     │
│                                                  │
│  Vos projets :                                  │
│  ┌──────────────────────────────────────┐      │
│  │  souviens-toi-db                     │      │
│  │  France (Paris) • Free Plan          │      │
│  │  [Sélectionner ce projet]            │      │
│  └──────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
```

👉 **Cliquez sur votre projet** (ex: `souviens-toi-db`)

---

### Étape 3 : Aller dans les Paramètres API

Une fois dans votre projet, vous voyez le menu de gauche :

```
┌──────────────────────────────┐
│  Home                        │
│  Table Editor                │
│  SQL Editor                  │
│  Database                    │
│  Storage                     │
│  Edge Functions              │
│  ...                         │
│                              │
│  ⚙️  Settings              ◄──── CLIQUEZ ICI
│    ├─ General               │
│    ├─ Database              │
│    ├─ API                 ◄──── PUIS ICI
│    ├─ Auth                  │
│    ├─ Storage               │
│    └─ Billing               │
└──────────────────────────────┘
```

1. Cliquez sur **⚙️ Settings** (en bas du menu)
2. Puis cliquez sur **API** dans le sous-menu

---

### Étape 4 : Copier les Identifiants

Vous arrivez sur la page **Project API Keys** :

```
┌─────────────────────────────────────────────────────────────┐
│  Project API Keys                                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Project URL                                                │
│  ┌────────────────────────────────────────────────┐        │
│  │ https://abcdefghijklmnop.supabase.co    [📋]  │ ◄───── COPIER
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  Project API keys                                           │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │ anon                                            │        │
│  │ public                                          │        │
│  │                                                  │        │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M │        │
│  │ iOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG │        │
│  │ 1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzAw │        │
│  │ MDAwMCwiZXhwIjoxOTYyNTc2MDAwfQ.xxxxxxxxxx   │        │
│  │                                         [📋]   │ ◄───── COPIER
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │ service_role                                    │        │
│  │ secret  ⚠️                                     │        │
│  │                                                  │        │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M │        │
│  │ ...                                      [📋]   │ ◄───── NE PAS UTILISER
│  └────────────────────────────────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### ✅ À Copier :

**1. Project URL**
- Cliquez sur l'icône 📋 à côté de l'URL
- Ou sélectionnez et copiez : `https://xxxxx.supabase.co`

**2. API Key (anon public)**
- Cliquez sur l'icône 📋 dans la section `anon public`
- C'est une LONGUE clé qui commence par `eyJhbGciOiJIUzI1NiIs...`

#### ❌ NE PAS Utiliser :

**service_role** : Cette clé est SECRÈTE et ne doit JAMAIS être utilisée côté client !

---

## 📝 Exemple de ce que vous devez avoir

Ouvrez un fichier texte (Notepad, TextEdit, etc.) et collez :

```
Project URL:
https://abcdefghijklmnop.supabase.co

API Key (anon/public):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzAwMDAwMCwiZXhwIjoxOTYyNTc2MDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> 💾 **Sauvegardez ce fichier** pour l'utiliser plus tard !

---

## 🔍 Comment Vérifier que c'est Correct ?

### ✅ Project URL

**Format correct :**
```
https://abcdefghijklmnop.supabase.co
```

**Caractéristiques :**
- ✅ Commence par `https://`
- ✅ Contient `.supabase.co`
- ✅ Pas d'espaces
- ✅ Environ 40-50 caractères

**Exemples INCORRECTS :**
- ❌ `supabase.co` (manque le https:// et l'ID)
- ❌ `https://supabase.co` (manque l'ID du projet)
- ❌ `https://app.supabase.com/project/xxxxx` (c'est l'URL du dashboard, pas l'API)

### ✅ API Key (anon/public)

**Format correct :**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzAwMDAwMCwiZXhwIjoxOTYyNTc2MDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Caractéristiques :**
- ✅ Commence par `eyJ`
- ✅ Contient deux points (`.`)
- ✅ Très longue (200-300 caractères)
- ✅ Pas d'espaces
- ✅ Uniquement des lettres, chiffres, traits d'union et underscores

**Exemples INCORRECTS :**
- ❌ `anon` (juste le nom, pas la clé)
- ❌ `public` (juste le nom, pas la clé)
- ❌ Une clé qui commence par autre chose que `eyJ`
- ❌ Une clé avec des espaces ou des retours à la ligne

---

## 🚨 Attention aux Erreurs Courantes

### ❌ Erreur 1 : Copier l'URL du Dashboard

**INCORRECT :**
```
https://app.supabase.com/project/abcdefghijklmnop
```

C'est l'URL de votre dashboard, pas l'URL de l'API !

**CORRECT :**
```
https://abcdefghijklmnop.supabase.co
```

### ❌ Erreur 2 : Utiliser la clé service_role

La clé `service_role` est marquée avec ⚠️ et "secret". **NE L'UTILISEZ PAS !**

Utilisez UNIQUEMENT la clé `anon public`.

### ❌ Erreur 3 : Espaces ou Retours à la Ligne

Assurez-vous qu'il n'y a :
- ❌ Pas d'espaces au début ou à la fin
- ❌ Pas de retours à la ligne dans la clé
- ❌ Pas de caractères invisibles

---

## 🎯 Utilisation dans Vercel

Une fois que vous avez copié ces deux valeurs, vous allez les utiliser dans Vercel :

**Variable 1 :**
```
Nom:    VITE_SUPABASE_URL
Valeur: [Votre Project URL]
```

**Variable 2 :**
```
Nom:    VITE_SUPABASE_ANON_KEY
Valeur: [Votre API Key anon/public]
```

> 📖 Consultez le [GUIDE_DEPLOIEMENT_VERCEL.md](./GUIDE_DEPLOIEMENT_VERCEL.md) pour la suite.

---

## 🔐 Sécurité

### ✅ Bonnes Pratiques

- ✅ La clé `anon/public` peut être utilisée côté client
- ✅ Elle est protégée par les RLS (Row Level Security) de Supabase
- ✅ Ne la partagez pas publiquement (GitHub public, forums, etc.)

### ❌ À Ne Jamais Faire

- ❌ Utiliser la clé `service_role` côté client
- ❌ Committer ces clés dans un dépôt public
- ❌ Les partager sur des forums ou réseaux sociaux

---

## ❓ Questions Fréquentes

### Q: Je ne vois pas de projet, c'est normal ?

**R:** Vous devez d'abord créer un projet Supabase :
1. Sur le dashboard, cliquez sur **New Project**
2. Donnez-lui un nom (ex: `souviens-toi-db`)
3. Choisissez un mot de passe pour la base de données
4. Sélectionnez une région (France / Paris recommandé)
5. Cliquez sur **Create new project**
6. Attendez 2-3 minutes que le projet se crée

### Q: Ma clé API est-elle sensible ?

**R:** La clé `anon/public` est conçue pour être utilisée côté client, MAIS :
- Ne la partagez pas publiquement
- Activez toujours les RLS (Row Level Security) sur vos tables
- Ne l'utilisez qu'avec les bonnes pratiques Supabase

### Q: Puis-je régénérer mes clés ?

**R:** Oui, mais :
- Cela cassera toutes les applications qui utilisent l'ancienne clé
- Vous devrez mettre à jour partout (local, Vercel, etc.)
- Faites-le uniquement si vos clés ont été compromises

### Q: Où sont stockées ces clés dans mon projet local ?

**R:** Dans le fichier `.env` à la racine du projet :
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

> ⚠️ Ce fichier est dans `.gitignore` et ne doit JAMAIS être commité !

---

## ✅ Vous Avez Terminé !

Vous avez maintenant :
- ✅ Votre Project URL
- ✅ Votre API Key (anon/public)
- ✅ Compris la différence avec service_role
- ✅ Su comment les vérifier

**Prochaine étape :** Suivez le [GUIDE_DEPLOIEMENT_VERCEL.md](./GUIDE_DEPLOIEMENT_VERCEL.md) pour déployer votre application !

---

**Besoin d'aide ?** Relisez ce guide ou consultez la [documentation Supabase](https://supabase.com/docs/guides/api).
