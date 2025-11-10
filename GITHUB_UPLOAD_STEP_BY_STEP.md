# 📁 Guide d'Upload GitHub - Étape par Étape

## 🎯 **Ton Repository GitHub**
**URL :** https://github.com/EGRES-53/Souviens_toi

## 📋 **Étape 1 : Préparer l'Upload**

### **🔄 Méthode Recommandée : Upload par Dossiers**

1. **Va sur ton repository** : https://github.com/EGRES-53/Souviens_toi
2. **Clique** "Add file" → "Upload files"
3. **Upload dans cet ordre** :

## 📁 **Upload #1 : Fichiers Racine**
```
package.json
index.html
vite.config.ts
tailwind.config.js
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vercel.json
.gitignore
netlify.toml
postcss.config.js
eslint.config.js
```

**💡 Comment faire :**
- Sélectionne tous ces fichiers depuis ton ordinateur
- Glisse-les dans l'interface GitHub
- **Commit message :** "Add root configuration files"
- **Commit**

## 📁 **Upload #2 : Dossier src/ Complet**

**Crée la structure suivante sur GitHub :**

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── vite-env.d.ts
├── lib/
│   └── supabase.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Toast.tsx
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── media/
│   │   ├── MediaUpload.tsx
│   │   ├── MediaGallery.tsx
│   │   ├── MediaLinkSelector.tsx
│   │   └── EventMediaLinks.tsx
│   ├── timeline/
│   │   └── TimelinePDF.tsx
│   └── person/
│       ├── RelationshipForm.tsx
│       └── RelationshipList.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── ToastContext.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── TimelinePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ProfilePage.tsx
│   ├── EventPage.tsx
│   ├── EditEventPage.tsx
│   ├── AddEventPage.tsx
│   ├── GalleryPage.tsx
│   ├── StoriesPage.tsx
│   ├── AddStoryPage.tsx
│   ├── StoryPage.tsx
│   ├── NotFoundPage.tsx
│   ├── TestPage.tsx
│   └── AdminDashboard.tsx
├── utils/
│   └── testData.ts
├── tests/
│   ├── Timeline.test.ts
│   ├── Gallery.test.ts
│   └── Stories.test.ts
└── firebase/
    └── config.ts
```

**💡 Méthode :**
- **Option A :** Upload dossier par dossier
- **Option B :** Créer les fichiers un par un avec "Create new file"

## 📁 **Upload #3 : Dossier supabase/**

```
supabase/
└── migrations/
    ├── 20250513074019_round_salad.sql
    ├── 20250513122051_jade_wood.sql
    ├── 20250514050213_broad_portal.sql
    ├── [tous les autres fichiers .sql]
    └── 20250827064515_light_swamp.sql
```

## 📁 **Upload #4 : Scripts et Documentation**

```
scripts/
├── backup.js
└── restore.js

README.md (remplacer celui existant)
PARTAGE_APP.md
BACKUP_GUIDE.md
EXPORT_GUIDE.md
[autres fichiers .md]
```

## ⚠️ **Fichiers à NE PAS Upload**
```
node_modules/        ← Trop volumineux
.env                 ← Contient des secrets
dist/                ← Généré automatiquement
.bolt/               ← Fichiers internes
package-lock.json    ← Sera régénéré
```

## 🎯 **Après l'Upload GitHub**

Une fois tous les fichiers uploadés :

1. **Retourne sur Vercel** : https://vercel.com/dashboard
2. **Clique** "Add New..." → "Project"
3. **Import Git Repository**
4. **Sélectionne** `EGRES-53/Souviens_toi`
5. **Configure** les variables d'environnement
6. **Deploy !**

## 🔧 **Variables d'Environnement Vercel**

```
VITE_SUPABASE_URL = https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY = ta-cle-anonyme-supabase
```

## ⏱️ **Temps Estimé**
- Upload GitHub : 15-20 minutes
- Configuration Vercel : 5 minutes
- **Total : 25 minutes**

---

**Une fois l'upload terminé, dis-moi et on configurera Vercel ensemble ! 🚀**