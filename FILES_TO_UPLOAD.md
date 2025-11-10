# 📁 Liste des Fichiers à Upload sur GitHub

## 🎯 Fichiers Essentiels (Upload Prioritaire)

### **📋 Fichiers Racine :**
```
package.json          ← Configuration npm
index.html           ← Page principale
vite.config.ts       ← Configuration Vite
tailwind.config.js   ← Configuration Tailwind
tsconfig.json        ← Configuration TypeScript
vercel.json          ← Configuration Vercel
.gitignore           ← Fichiers à ignorer
```

### **📁 Dossier src/ (Complet) :**
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
│   ├── auth/
│   ├── layout/
│   ├── media/
│   ├── timeline/
│   └── person/
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
└── tests/
    ├── Timeline.test.ts
    ├── Gallery.test.ts
    └── Stories.test.ts
```

### **📁 Dossier supabase/ :**
```
supabase/
└── migrations/
    ├── 20250513074019_round_salad.sql
    ├── 20250513122051_jade_wood.sql
    ├── 20250514050213_broad_portal.sql
    ├── [tous les autres fichiers .sql]
    └── 20250827064515_light_swamp.sql
```

## 🚀 **Méthode d'Upload GitHub**

### **Option A : Upload par Glisser-Déposer**
1. **Sélectionne** tous les fichiers/dossiers
2. **Glisse** dans l'interface GitHub
3. **Commit** les changements

### **Option B : Upload Fichier par Fichier**
1. **"Add file"** → **"Create new file"**
2. **Copie-colle** le contenu de chaque fichier
3. **Respecte** l'arborescence des dossiers

## ⚠️ **Fichiers à NE PAS Upload**
```
node_modules/        ← Trop volumineux
.env                 ← Contient des secrets
dist/                ← Généré automatiquement
.bolt/               ← Fichiers internes
package-lock.json    ← Optionnel (sera régénéré)
```

## 🎯 **Ordre Recommandé**

1. **Fichiers racine** d'abord
2. **Dossier src/** ensuite
3. **Dossier supabase/** en dernier

---

**Une fois uploadé, on pourra importer dans Vercel ! 🚀**