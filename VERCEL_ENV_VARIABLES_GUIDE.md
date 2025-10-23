# 🔧 Guide Configuration Variables d'Environnement Vercel

## 🎯 **Étapes pour Configurer les Variables**

### **1. 📍 Accéder aux Paramètres**
1. **Clique** sur "Continue to Dashboard" (bouton noir en bas)
2. **Trouve** ton projet dans la liste
3. **Clique** sur le nom de ton projet
4. **Va dans** l'onglet "Settings" (en haut)

### **2. ⚙️ Section Environment Variables**
1. **Dans Settings**, cherche "Environment Variables" dans le menu de gauche
2. **Clique** sur "Environment Variables"
3. **Tu verras** une section pour ajouter des variables

### **3. 🔑 Ajouter les Variables Supabase**

#### **Variable 1 : URL Supabase**
- **Key (Nom)** : `VITE_SUPABASE_URL`
- **Value (Valeur)** : `https://ton-projet.supabase.co`
- **Environment** : Sélectionne "Production, Preview, and Development"
- **Clique** "Add"

#### **Variable 2 : Clé Anonyme Supabase**
- **Key (Nom)** : `VITE_SUPABASE_ANON_KEY`
- **Value (Valeur)** : `eyJ...` (ta longue clé anonyme)
- **Environment** : Sélectionne "Production, Preview, and Development"
- **Clique** "Add"

## 🔍 **Où Trouver tes Variables Supabase ?**

### **Si tu ne les as pas sous la main :**
1. **Va sur** [supabase.com](https://supabase.com)
2. **Connecte-toi** à ton compte
3. **Sélectionne** ton projet
4. **Va dans** Settings → API
5. **Copie** :
   - **Project URL** → pour `VITE_SUPABASE_URL`
   - **anon public** → pour `VITE_SUPABASE_ANON_KEY`

## 🚀 **Après Configuration**

### **4. 🔄 Redéployer**
Une fois les variables ajoutées :
1. **Va dans** l'onglet "Deployments"
2. **Clique** sur les "..." du dernier déploiement
3. **Sélectionne** "Redeploy"
4. **Confirme** le redéploiement

### **5. ✅ Test Final**
- **Attends** 2-3 minutes
- **Visite** ton URL Vercel
- **L'erreur 404** devrait disparaître
- **L'app** devrait se charger correctement

## 📱 **Interface Vercel - Où Cliquer**

```
Dashboard → Ton Projet → Settings → Environment Variables
```

## 🆘 **En Cas de Problème**

### **Variables Manquantes ?**
- Retourne sur ton dashboard Supabase
- Settings → API
- Copie les bonnes valeurs

### **Erreur Persiste ?**
- Vérifie que les noms des variables sont exacts
- Assure-toi qu'il n'y a pas d'espaces
- Redéploie après chaque modification

---

**Une fois configuré, ton app SOUVIENS_TOI sera entièrement fonctionnelle ! 🎯**