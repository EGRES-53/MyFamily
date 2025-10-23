# Guide de Test - Inscription

## Problèmes Identifiés

### 1. Erreur 404 sur Vercel
**Cause probable** : Variables d'environnement manquantes sur Vercel

### 2. Erreur d'Inscription dans Bolt
**Cause** : L'email `dani.sdo53@outlook.com` **existe déjà** dans la base de données !

---

## Comptes Existants

Voici les comptes déjà créés dans Supabase :

| Email | Nom | Créé le |
|-------|-----|---------|
| dani.sdo53@outlook.com | sdotest | 06/10/2025 09:47 |
| test.user.sdo53@bluewin.ch | sedaoe | 06/10/2025 07:58 |

**IMPORTANT** : Vous ne pouvez PAS créer un nouveau compte avec ces emails !

---

## Solutions

### Option 1 : Se Connecter avec un Compte Existant (RECOMMANDÉ)

1. **Allez sur** `/login`
2. **Utilisez** :
   - Email : `dani.sdo53@outlook.com`
   - Mot de passe : Le mot de passe que vous avez utilisé lors de la création
3. **Cliquez** "Se connecter"
4. ✅ Vous serez connecté immédiatement

### Option 2 : Créer un Nouveau Compte avec un Email Différent

1. **Allez sur** `/register`
2. **Utilisez un NOUVEL email** (exemples) :
   - `nouveautest@outlook.com`
   - `test2024@gmail.com`
   - `votremail+test@domain.com`
3. **Remplissez** tous les champs
4. **Cliquez** "Créer un compte"
5. ✅ Devrait fonctionner sans erreur

### Option 3 : Supprimer un Compte Existant

Si vous voulez vraiment réutiliser `dani.sdo53@outlook.com`, je peux supprimer ce compte.

**Confirmez-vous que vous voulez supprimer** `dani.sdo53@outlook.com` ?

---

## Fix pour Vercel (404 NOT_FOUND)

Le 404 sur Vercel vient du fait que les variables d'environnement ne sont pas configurées.

### Étapes Détaillées

#### 1. Vérifier les Variables sur Vercel

1. Allez sur https://vercel.com
2. Connectez-vous
3. Sélectionnez votre projet
4. **Settings** → **Environment Variables**

#### 2. Vérifier si les Variables Existent

Cherchez ces 2 variables :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Si elles N'EXISTENT PAS** → Passez à l'étape 3
**Si elles EXISTENT** → Passez à l'étape 4

#### 3. Ajouter les Variables (si elles n'existent pas)

Cliquez sur "Add New" et ajoutez :

**Variable 1** :
```
Key: VITE_SUPABASE_URL
Value: https://0ec90b57d6e95fcbda19832f.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variable 2** :
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
Environments: ✅ Production ✅ Preview ✅ Development
```

Cliquez **Save** pour chaque variable.

#### 4. Redéployer l'Application

**IMPORTANT** : Après avoir ajouté/modifié les variables, VOUS DEVEZ REDÉPLOYER !

1. Allez dans l'onglet **Deployments**
2. Trouvez le **dernier déploiement**
3. Cliquez sur **⋯** (3 points) à droite
4. Cliquez **Redeploy**
5. Attendez 2-3 minutes que le build se termine
6. ✅ Le statut doit passer à **Ready** (vert)

#### 5. Tester l'Application

1. Ouvrez votre URL Vercel (ex: `https://souviens-toi.vercel.app`)
2. ✅ La page d'accueil devrait se charger (plus de 404)
3. Cliquez sur "Créer un compte" ou "Se connecter"
4. ✅ Les pages devraient fonctionner

---

## Messages d'Erreur Améliorés

J'ai amélioré le code pour afficher l'erreur exacte au lieu d'un message générique.

**Avant** :
```
Erreur lors de la création du compte. Vérifiez vos informations.
```

**Après** :
```
Erreur: User already registered
```

Cela vous aidera à comprendre pourquoi l'inscription échoue.

---

## Checklist de Test

### Test 1 : Connexion avec Compte Existant

- [ ] Ouvrir `/login`
- [ ] Email : `dani.sdo53@outlook.com`
- [ ] Mot de passe : [votre mot de passe]
- [ ] Cliquer "Se connecter"
- [ ] ✅ Devrait fonctionner si le mot de passe est correct

### Test 2 : Inscription avec Nouvel Email

- [ ] Ouvrir `/register`
- [ ] Nom : Test2024
- [ ] Email : `test2024@outlook.com` (ou autre email DIFFÉRENT)
- [ ] Mot de passe : TestPassword123
- [ ] Confirmer mot de passe : TestPassword123
- [ ] Cliquer "Créer un compte"
- [ ] ✅ Devrait fonctionner sans erreur

### Test 3 : Vercel

- [ ] Variables d'environnement ajoutées sur Vercel
- [ ] Application redéployée
- [ ] Ouvrir l'URL Vercel
- [ ] ✅ Page d'accueil se charge (pas de 404)
- [ ] ✅ Inscription/connexion fonctionne

---

## Erreurs Communes et Solutions

### "User already registered"

**Cause** : L'email existe déjà dans la base de données
**Solution** : Utilisez un email différent OU connectez-vous avec cet email

### "Invalid login credentials"

**Cause** : Mot de passe incorrect lors de la connexion
**Solution** : Vérifiez votre mot de passe ou réinitialisez-le

### "Email rate limit exceeded"

**Cause** : Trop de tentatives d'inscription avec le même email
**Solution** : Attendez 1 heure OU utilisez un autre email

### 404 NOT_FOUND sur Vercel

**Cause** : Variables d'environnement manquantes
**Solution** : Ajoutez les variables et redéployez (voir étapes ci-dessus)

### "VITE_SUPABASE_URL is missing"

**Cause** : Variables d'environnement non configurées
**Solution** :
- **Local** : Vérifiez le fichier `.env`
- **Vercel** : Ajoutez les variables dans Settings → Environment Variables

---

## Support

Si vous avez toujours des problèmes après avoir suivi ce guide :

1. **Vérifiez la console** (F12) pour voir l'erreur exacte
2. **Copiez le message d'erreur** complet
3. **Vérifiez les logs Vercel** si le problème est sur Vercel
4. **Contactez-moi** avec le message d'erreur précis

---

## Résumé Rapide

**Problème Bolt** : Email déjà utilisé → Utilisez un NOUVEL email
**Problème Vercel** : Variables manquantes → Ajoutez variables + Redéployez

**Emails à éviter** :
- ❌ dani.sdo53@outlook.com (existe déjà)
- ❌ test.user.sdo53@bluewin.ch (existe déjà)

**Utilisez plutôt** :
- ✅ nouveautest@outlook.com
- ✅ test2024@gmail.com
- ✅ Tout autre email qui n'existe pas encore
