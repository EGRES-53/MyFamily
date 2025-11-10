/*
  # Création de la relation entre événements et récits

  ## Objectif
  Permettre de lier des récits (stories) aux événements de la chronologie.
  Un récit peut être lié à plusieurs événements, et un événement peut avoir plusieurs récits.

  ## Changements

  1. Nouvelle Table : `event_stories`
    - `id` (uuid, primary key) - Identifiant unique
    - `event_id` (uuid, foreign key) - Référence vers l'événement
    - `story_id` (uuid, foreign key) - Référence vers le récit
    - `created_at` (timestamptz) - Date de création du lien
    
  2. Sécurité
    - Activation du RLS sur la table `event_stories`
    - Politique SELECT : Les utilisateurs authentifiés peuvent voir tous les liens
    - Politique INSERT : Les utilisateurs authentifiés peuvent créer des liens
    - Politique DELETE : Les utilisateurs authentifiés peuvent supprimer des liens
    
  3. Index
    - Index sur `event_id` pour les requêtes par événement
    - Index sur `story_id` pour les requêtes par récit
    - Contrainte unique sur (event_id, story_id) pour éviter les doublons

  ## Notes
  - Les médias sont déjà liés aux événements via la colonne `event_id` dans la table `media`
  - Cette migration permet maintenant de lier aussi les récits aux événements
*/

-- Création de la table de liaison event_stories
CREATE TABLE IF NOT EXISTS event_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  story_id uuid NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, story_id)
);

-- Création des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_event_stories_event_id ON event_stories(event_id);
CREATE INDEX IF NOT EXISTS idx_event_stories_story_id ON event_stories(story_id);

-- Activation de la sécurité RLS
ALTER TABLE event_stories ENABLE ROW LEVEL SECURITY;

-- Politique SELECT : tous les utilisateurs authentifiés peuvent voir les liens
CREATE POLICY "Authenticated users can view event stories"
  ON event_stories
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique INSERT : tous les utilisateurs authentifiés peuvent créer des liens
CREATE POLICY "Authenticated users can create event stories"
  ON event_stories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politique DELETE : tous les utilisateurs authentifiés peuvent supprimer des liens
CREATE POLICY "Authenticated users can delete event stories"
  ON event_stories
  FOR DELETE
  TO authenticated
  USING (true);