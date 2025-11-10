# 🚀 Guide de Déploiement Direct Vercel - SOUVIENS_TOI

## 🎯 Méthode Recommandée : Import depuis GitHub

### **Étape 1 : Upload Manuel sur GitHub**

1. **Va sur ton repository** : https://github.com/EGRES-53/Souviens_toi
2. **Clique** "Add file" → "Upload files"
3. **Glisse-dépose** ou sélectionne ces fichiers depuis ton ordinateur :

#### **📁 Fichiers Prioritaires :**
- `package.json`
- `index.html`
- `vite.config.ts`
- `tailwind.config.js`
- `tsconfig.json`
- `vercel.json`
- `.gitignore`

#### **📁 Dossier src/ complet :**
- Tous les fichiers dans `src/`
- Tous les sous-dossiers (`components/`, `pages/`, etc.)

#### **📁 Dossier supabase/ :**
- Tous les fichiers `.sql` dans `supabase/migrations/`

### **Étape 2 : Import dans Vercel**

1. **Dans ton dashboard Vercel**, clique "Add New..." → "Project"
2. **Import Git Repository**
3. **Sélectionne** `EGRES-53/Souviens_toi`
4. **Configure** les variables d'environnement :
   - `VITE_SUPABASE_URL` = ton URL Supabase
   - `VITE_SUPABASE_ANON_KEY` = ta clé Supabase
5. **Deploy !**

### **Étape 3 : Test**

Une fois déployé, teste :
- ✅ Page d'accueil
- ✅ Connexion/Inscription
- ✅ Timeline
- ✅ Upload de médias

## 🎯 **Alternative Plus Rapide**

Si l'upload GitHub est trop fastidieux, on peut :
1. **Créer un nouveau projet Vercel** directement
2. **Upload les fichiers** via l'interface Vercel
3. **Déployer** immédiatement

**Quelle méthode préfères-tu ?**

## 📞 **Variables Supabase Nécessaires**

Tu auras besoin de :
- **URL Supabase** : `https://ton-projet.supabase.co`
- **Clé Anonyme** : `eyJ...` (longue clé)

Si tu ne les as pas, va dans ton dashboard Supabase → Settings → API.

---

**Prêt pour le déploiement ! 🚀**