// Type definitions for SOUVIENS_TOI application

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  precise_date: boolean;
  user_id: string;
  created_at: string;
  updated_at?: string;
  profiles?: Profile;
}

export interface Media {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'document';
  event_id?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  uploaded_at: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}