-- ============================================================================
-- SCRIPT DE SYNCHRONISATION DU SCHÉMA AVEC BOLT
-- ============================================================================
-- Ce script met à jour la base de données locale pour correspondre
-- exactement au schéma utilisé dans Bolt.
--
-- IMPORTANT: Exécute ce script dans l'éditeur SQL de Supabase
-- (Dashboard Supabase → SQL Editor → New Query)
-- ============================================================================

-- ============================================================================
-- 1. CORRECTION DE LA TABLE EVENTS
-- ============================================================================

-- Renommer created_by en user_id pour correspondre à Bolt
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'created_by'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE events RENAME COLUMN created_by TO user_id;
  END IF;
END $$;

-- ============================================================================
-- 2. CORRECTION DE LA TABLE STORIES
-- ============================================================================

-- Renommer created_by en user_id
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stories' AND column_name = 'created_by'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stories' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE stories RENAME COLUMN created_by TO user_id;
  END IF;
END $$;

-- ============================================================================
-- 3. CORRECTION DE LA TABLE MEDIA
-- ============================================================================

-- Renommer created_by en user_id
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'created_by'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE media RENAME COLUMN created_by TO user_id;
  END IF;
END $$;

-- Ajouter la colonne uploaded_at si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'uploaded_at'
  ) THEN
    ALTER TABLE media ADD COLUMN uploaded_at timestamptz DEFAULT now();
    UPDATE media SET uploaded_at = created_at WHERE uploaded_at IS NULL;
  END IF;
END $$;

-- Ajouter la colonne story_id si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'story_id'
  ) THEN
    ALTER TABLE media ADD COLUMN story_id uuid REFERENCES stories(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Ajouter la colonne person_id si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media' AND column_name = 'person_id'
  ) THEN
    ALTER TABLE media ADD COLUMN person_id uuid REFERENCES persons(id) ON DELETE CASCADE;
  END IF;
END $$;

-- ============================================================================
-- 4. CORRECTION DE LA TABLE PERSONS
-- ============================================================================

-- Renommer created_by en user_id
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'persons' AND column_name = 'created_by'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'persons' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE persons RENAME COLUMN created_by TO user_id;
  END IF;
END $$;

-- Renommer bio en notes
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'persons' AND column_name = 'bio'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'persons' AND column_name = 'notes'
  ) THEN
    ALTER TABLE persons RENAME COLUMN bio TO notes;
  END IF;
END $$;

-- Supprimer la colonne photo_url (non présente dans Bolt)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'persons' AND column_name = 'photo_url'
  ) THEN
    ALTER TABLE persons DROP COLUMN photo_url;
  END IF;
END $$;

-- Supprimer created_at et updated_at de persons (non présents dans Bolt selon l'image)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'persons' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE persons DROP COLUMN updated_at;
  END IF;
END $$;

-- ============================================================================
-- 5. CORRECTION DE LA TABLE RELATIONS
-- ============================================================================

-- Renommer person1_id en person_id_a
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'person1_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'person_id_a'
  ) THEN
    ALTER TABLE relations RENAME COLUMN person1_id TO person_id_a;
  END IF;
END $$;

-- Renommer person2_id en person_id_b
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'person2_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'person_id_b'
  ) THEN
    ALTER TABLE relations RENAME COLUMN person2_id TO person_id_b;
  END IF;
END $$;

-- Renommer relation_type en type (selon l'image)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'relation_type'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'type'
  ) THEN
    ALTER TABLE relations RENAME COLUMN relation_type TO type;
  END IF;
END $$;

-- Ajouter user_id si manquant
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'user_id'
  ) THEN
    -- Récupère le premier user_id disponible
    DECLARE first_user_id uuid;
    BEGIN
      SELECT id INTO first_user_id FROM auth.users LIMIT 1;
      ALTER TABLE relations ADD COLUMN user_id uuid REFERENCES profiles(id) ON DELETE CASCADE;
      UPDATE relations SET user_id = first_user_id WHERE user_id IS NULL;
      ALTER TABLE relations ALTER COLUMN user_id SET NOT NULL;
    END;
  END IF;
END $$;

-- Ajouter note si manquant
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'note'
  ) THEN
    ALTER TABLE relations ADD COLUMN note text;
  END IF;
END $$;

-- Supprimer updated_at de relations (non présent dans Bolt)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'relations' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE relations DROP COLUMN updated_at;
  END IF;
END $$;

-- ============================================================================
-- 6. CORRECTION DE LA TABLE PROFILES
-- ============================================================================

-- Ajouter role si manquant avec type ENUM
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'user' NOT NULL;
    ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
      CHECK (role IN ('user', 'admin'));
  END IF;
END $$;

-- Supprimer updated_at de profiles (non présent dans Bolt selon l'image)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE profiles DROP COLUMN updated_at;
  END IF;
END $$;

-- ============================================================================
-- 7. MISE À JOUR DES POLITIQUES RLS
-- ============================================================================

-- Supprimer les anciennes politiques qui utilisent created_by
DROP POLICY IF EXISTS "Users can view own events" ON events;
DROP POLICY IF EXISTS "Users can create own events" ON events;
DROP POLICY IF EXISTS "Users can update own events" ON events;
DROP POLICY IF EXISTS "Users can delete own events" ON events;

DROP POLICY IF EXISTS "Users can view own stories" ON stories;
DROP POLICY IF EXISTS "Users can create own stories" ON stories;
DROP POLICY IF EXISTS "Users can update own stories" ON stories;
DROP POLICY IF EXISTS "Users can delete own stories" ON stories;

DROP POLICY IF EXISTS "Users can view own media" ON media;
DROP POLICY IF EXISTS "Users can create own media" ON media;
DROP POLICY IF EXISTS "Users can update own media" ON media;
DROP POLICY IF EXISTS "Users can delete own media" ON media;

DROP POLICY IF EXISTS "Users can view own persons" ON persons;
DROP POLICY IF EXISTS "Users can create own persons" ON persons;
DROP POLICY IF EXISTS "Users can update own persons" ON persons;
DROP POLICY IF EXISTS "Users can delete own persons" ON persons;

-- Créer les nouvelles politiques avec user_id

-- EVENTS
CREATE POLICY "Users can view own events"
  ON events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own events"
  ON events FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own events"
  ON events FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- STORIES
CREATE POLICY "Users can view own stories"
  ON stories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own stories"
  ON stories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stories"
  ON stories FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own stories"
  ON stories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- MEDIA
CREATE POLICY "Users can view own media"
  ON media FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own media"
  ON media FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own media"
  ON media FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- PERSONS
CREATE POLICY "Users can view own persons"
  ON persons FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own persons"
  ON persons FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own persons"
  ON persons FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own persons"
  ON persons FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- 8. METTRE À JOUR LA TABLE EVENT_STORIES
-- ============================================================================

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Authenticated users can view event stories" ON event_stories;
DROP POLICY IF EXISTS "Authenticated users can create event stories" ON event_stories;
DROP POLICY IF EXISTS "Authenticated users can delete event stories" ON event_stories;

-- Recréer avec des politiques plus restrictives
CREATE POLICY "Users can view event stories"
  ON event_stories FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events WHERE events.id = event_stories.event_id AND events.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create event stories"
  ON event_stories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events WHERE events.id = event_stories.event_id AND events.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete event stories"
  ON event_stories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events WHERE events.id = event_stories.event_id AND events.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 9. VÉRIFICATION FINALE
-- ============================================================================

-- Affiche un résumé des colonnes après migration
SELECT
  'events' as table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'events' AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT
  'stories' as table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'stories' AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT
  'media' as table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'media' AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT
  'persons' as table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'persons' AND table_schema = 'public'
ORDER BY ordinal_position;

-- ============================================================================
-- FIN DU SCRIPT
-- ============================================================================
-- Après l'exécution de ce script :
-- 1. Vide le cache de ton navigateur (Ctrl+Shift+Delete)
-- 2. Redémarre le serveur dev (Ctrl+C puis npm run dev)
-- 3. Teste l'inscription et la création d'événements
-- ============================================================================
