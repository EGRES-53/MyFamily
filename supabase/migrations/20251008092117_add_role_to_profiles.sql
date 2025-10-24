/*
  # Ajout du système de rôles et définition de l'administrateur

  1. Modifications
    - Ajouter la colonne `role` à la table `profiles` avec les valeurs 'user' ou 'admin'
    - Définir 'user' comme valeur par défaut
    - Définir dani.sdo53@outlook.com (88f4307e-badb-4b6d-bce6-75edf8bf8074) comme unique administrateur
    
  2. Sécurité
    - Seul l'administrateur peut modifier les rôles
*/

-- Ajouter la colonne role si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'user' NOT NULL;
    
    -- Ajouter une contrainte pour valider les valeurs
    ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
      CHECK (role IN ('user', 'admin'));
  END IF;
END $$;

-- Définir dani.sdo53@outlook.com comme administrateur
UPDATE profiles 
SET role = 'admin' 
WHERE id = '88f4307e-badb-4b6d-bce6-75edf8bf8074';

-- S'assurer que tous les autres utilisateurs sont 'user'
UPDATE profiles 
SET role = 'user' 
WHERE id != '88f4307e-badb-4b6d-bce6-75edf8bf8074' AND role != 'user';
