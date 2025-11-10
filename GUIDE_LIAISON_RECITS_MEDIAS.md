# 📖 Guide de Liaison Récits & Médias aux Événements

## ✨ Nouvelle Fonctionnalité

Tu peux maintenant **relier des récits et des médias** (photos, documents) à tes événements de la chronologie !

---

## 🎯 Comment ça marche ?

### 1️⃣ **Ouvrir un événement**

1. Va dans la **Chronologie** (Timeline)
2. Clique sur n'importe quel événement
3. Tu verras maintenant **2 nouvelles sections** :
   - 📖 **Récits liés**
   - 🖼️ **Médias liés**

---

### 2️⃣ **Lier un récit à un événement**

#### Depuis la page d'un événement :

1. Dans la section **"Récits liés"**, clique sur **"Lier un récit"**
2. Une liste de tous tes récits apparaît
3. Clique sur **"Lier"** à côté du récit que tu veux associer
4. ✅ Le récit est maintenant lié à cet événement !

#### Voir le récit complet :

- Clique sur **"Lire le récit complet"** pour ouvrir la page du récit
- Tu peux délier le récit à tout moment en cliquant sur **"Délier"**

---

### 3️⃣ **Lier un média (photo/document) à un événement**

#### Depuis la page d'un événement :

1. Dans la section **"Médias liés"**, clique sur **"Lier un média"**
2. Une liste de tous tes médias non liés apparaît
3. Clique sur **"Lier"** à côté du média que tu veux associer
4. ✅ Le média est maintenant lié à cet événement !

#### Voir le média :

- Les photos s'affichent en miniature
- Clique sur **"Ouvrir"** pour voir le média en taille réelle
- Tu peux délier le média à tout moment en cliquant sur **"Délier"**

---

## 🎨 Exemples d'utilisation

### Exemple 1 : Mariage de Grand-père

**Événement** : Mariage de Jean et Marie - 15 juin 1950

**Tu peux lier** :
- 📖 Un récit racontant l'histoire de leur rencontre
- 🖼️ Une photo de mariage
- 📄 L'acte de mariage (PDF)

→ Quand quelqu'un ouvre cet événement, il voit tout le contexte !

---

### Exemple 2 : Naissance d'un enfant

**Événement** : Naissance de Sophie - 3 mars 1975

**Tu peux lier** :
- 📖 Un récit écrit par la maman sur cette journée spéciale
- 🖼️ Photo du bébé
- 📄 Extrait d'acte de naissance (PDF)

---

## 💡 Avantages

✅ **Organisation** : Tous les souvenirs liés à un événement sont au même endroit

✅ **Navigation** : Passe facilement d'un événement à ses récits et médias

✅ **Partage** : Raconte des histoires complètes avec texte, photos et documents

✅ **Contexte** : Chaque événement devient une page riche en souvenirs

---

## 🔄 Gestion des liaisons

### Délier un élément

Si tu veux retirer un récit ou un média d'un événement :

1. Ouvre l'événement
2. Trouve l'élément dans la liste
3. Clique sur **"Délier"**
4. L'élément reste dans ta bibliothèque mais n'est plus lié à cet événement

### Lier à plusieurs événements

- Un même récit peut être lié à **plusieurs événements** différents
- Un même média peut être lié à **plusieurs événements** différents

---

## 📊 Structure de la base de données

Pour les curieux, voici comment ça fonctionne :

### Table `event_stories`
Relie les événements aux récits (relation many-to-many)

### Table `media`
La colonne `event_id` relie directement les médias aux événements

---

## 🚀 Prochaines étapes

1. Crée quelques récits dans la section **"Récits"**
2. Upload des photos dans la **"Galerie"**
3. Va dans un événement de la **"Chronologie"**
4. Commence à lier récits et médias !

---

## 💡 Conseils

### Pour les récits :
- Écris des récits détaillés avec des anecdotes
- N'hésite pas à écrire plusieurs récits courts plutôt qu'un très long
- Chaque récit peut raconter un aspect différent d'un événement

### Pour les médias :
- Nomme tes fichiers de façon claire (ex: "Mariage_Jean_Marie_1950.jpg")
- Tu peux ajouter une description pour chaque média
- Les PDFs sont parfaits pour les documents officiels

---

## 🎉 Profite bien de cette fonctionnalité !

Maintenant, tes événements deviennent de vraies **pages de mémoire** complètes, avec histoires, photos et documents. C'est parfait pour transmettre l'histoire familiale aux générations futures ! 👨‍👩‍👧‍👦
