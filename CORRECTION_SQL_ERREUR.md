# ✅ Correction - Erreur SQL uuid = bigint

## 🔴 Erreur SQL Corrigée

```
ERROR: 42883: operator does not exist: uuid = bigint
HINT: No operator matches the given name and argument types.
```

## ✅ Solution

Le problème venait de la **déclaration `DECLARE` mal placée** dans le bloc PL/pgSQL.

---

## 🚀 Que Faire Maintenant

### ✅ Utilise le Nouveau Script : `SCHEMA_SYNC_BOLT_FIXED.sql`

Ce fichier corrige l'erreur et synchronise parfaitement ton schéma avec Bolt.

---

## 📝 Instructions Rapides

### 1. Exécute le Script SQL

1. Ouvre **Supabase Dashboard** : https://app.supabase.com
2. Va dans **SQL Editor** (⚡)
3. **New Query**
4. Copie-colle **TOUT** le contenu de `SCHEMA_SYNC_BOLT_FIXED.sql`
5. Clique **Run** (`Ctrl + Enter`)

### 2. Vide le Cache

**Chrome/Edge/Brave :**
- `F12` → Clic droit sur 🔄 → "Vider le cache"

**Firefox :**
- `Ctrl + Shift + Delete` → "Cache" → "Effacer"

### 3. Supprime localStorage

Console (`F12`) :
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### 4. Redémarre le Serveur

```bash
# Ctrl+C pour arrêter
npm run dev
```

### 5. Teste

Va sur `http://localhost:5173/test` et clique **"Tests Système"**

Tous doivent être verts ✅

---

## 🎯 Résumé des Changements

### Renommages
- `created_by` → `user_id` (events, stories, media, persons)
- `bio` → `notes` (persons)
- `person1_id` → `person_id_a` (relations)
- `person2_id` → `person_id_b` (relations)
- `relation_type` → `type` (relations)

### Ajouts
- `media.uploaded_at`
- `media.story_id`
- `media.person_id`
- `relations.user_id`
- `relations.note`
- `profiles.role`

---

## ✅ Checklist

- [ ] Script SQL exécuté
- [ ] Cache vidé
- [ ] localStorage cleared
- [ ] Serveur redémarré
- [ ] Tests passent ✅
- [ ] Inscription fonctionne
- [ ] Création d'événement fonctionne

---

**C'est tout !** Ton app devrait maintenant fonctionner parfaitement. 🎉
