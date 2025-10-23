# 📁 Guide Complet d'Upload GitHub - SOUVIENS_TOI

## 🎯 **Ton Repository GitHub**
**URL :** https://github.com/EGRES-53/Souviens_toi

## 📋 **Méthode d'Upload Complet**

### **🔄 Étape 1 : Préparer l'Upload**

1. **Va sur ton repository** : https://github.com/EGRES-53/Souviens_toi
2. **Clique** "Add file" → "Upload files"
3. **Prépare** tous les fichiers depuis ton ordinateur local

## 📁 **Structure Complète à Uploader**

### **📋 Fichiers Racine (Priorité 1)**
```
package.json
index.html
vite.config.ts
tailwind.config.js
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vercel.json
netlify.toml
postcss.config.js
eslint.config.js
README.md (remplacer l'existant)
```

### **📁 Dossier src/ Complet (Priorité 2)**
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

### **📁 Dossier supabase/ (Priorité 3)**
```
supabase/
└── migrations/
    ├── 20250513074019_round_salad.sql
    ├── 20250513122051_jade_wood.sql
    ├── 20250514050213_broad_portal.sql
    ├── 20250514052158_patient_morning.sql
    ├── 20250514053810_turquoise_dawn.sql
    ├── 20250514053951_floral_star.sql
    ├── 20250514055525_white_pebble.sql
    ├── 20250514061052_lingering_mud.sql
    ├── 20250515062938_warm_breeze.sql
    ├── 20250515063140_crystal_cherry.sql
    ├── 20250515071957_plain_wildflower.sql
    ├── 20250515072222_spring_lab.sql
    ├── 20250515072424_wandering_unit.sql
    ├── 20250710145356_cool_forest.sql
    ├── 20250710145523_odd_truth.sql
    ├── 20250710145605_dry_firefly.sql
    ├── 20250710160732_crystal_shrine.sql
    ├── 20250710163945_aged_resonance.sql
    ├── 20250726202943_velvet_unit.sql
    ├── 20250727084717_hidden_ocean.sql
    ├── 20250727092254_sparkling_peak.sql
    ├── 20250727095517_falling_wood.sql
    ├── 20250727171411_copper_grass.sql
    ├── 20250731054049_dry_lagoon.sql
    ├── 20250823140259_red_bread.sql
    ├── 20250823145702_icy_wind.sql
    └── 20250827064515_light_swamp.sql
```

### **📁 Scripts et Documentation (Priorité 4)**
```
scripts/
├── backup.js
└── restore.js

Documentation (fichiers .md) :
├── PARTAGE_APP.md
├── BACKUP_GUIDE.md
├── EXPORT_GUIDE.md
├── ADMIN_SETUP_GUIDE.md
├── MOBILE_SETUP_GUIDE.md
├── MOBILE_TROUBLESHOOTING.md
└── [autres fichiers .md]
```

## 🚀 **Procédure d'Upload**

### **📋 Méthode Recommandée :**

1. **Sélectionne TOUS les fichiers** depuis ton dossier local
2. **Glisse-dépose** dans l'interface GitHub
3. **Commit message :** "Initial upload - Complete SOUVIENS_TOI application"
4. **Commit changes**

### **⚠️ Fichiers à EXCLURE :**
```
node_modules/        ← Trop volumineux
.env                 ← Contient des secrets
dist/                ← Généré automatiquement
.bolt/               ← Fichiers internes
package-lock.json    ← Sera régénéré
```

## 🎯 **Après l'Upload GitHub**

Une fois l'upload terminé :

1. **Vérifie** que tous les fichiers sont présents
2. **Va sur Vercel** : https://vercel.com/dashboard
3. **Clique** "Add New..." → "Project"
4. **Import Git Repository**
5. **Sélectionne** `EGRES-53/Souviens_toi`

## ⚙️ **Variables d'Environnement Vercel**

Configure ces variables dans Vercel :

```
VITE_SUPABASE_URL = https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY = ta-cle-anonyme-supabase
```

## ⏱️ **Temps Estimé**

- **Upload GitHub :** 10-15 minutes
- **Configuration Vercel :** 5 minutes
- **Premier déploiement :** 3-5 minutes
- **Total :** 20-25 minutes

## 🆘 **En Cas de Problème**

Si l'upload est trop volumineux :
1. **Upload par parties** (fichiers racine d'abord)
2. **Puis dossier src/**
3. **Puis supabase/**
4. **Enfin documentation**

---

**Une fois l'upload terminé, dis-moi et on configurera Vercel ensemble ! 🚀**