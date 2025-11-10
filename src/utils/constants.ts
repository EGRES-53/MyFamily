// Application constants for SOUVIENS_TOI

export const APP_NAME = 'SOUVIENS_TOI';
export const APP_DESCRIPTION = 'Application de chronologie familiale';

// Date formats
export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';

// File upload limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];

// Pagination
export const DEFAULT_PAGE_SIZE = 20;

// Toast duration
export const TOAST_DURATION = 5000;

// Routes
export const ROUTES = {
  HOME: '/',
  TIMELINE: '/timeline',
  GALLERY: '/gallery',
  STORIES: '/stories',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  TEST: '/test'
} as const;