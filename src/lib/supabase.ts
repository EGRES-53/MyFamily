import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to placeholder
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is missing. Please check your .env file and add your Supabase project URL.');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is missing. Please check your .env file and add your Supabase project anonymous key.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: async (input, init) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url.includes('/rest/v1/events')) {
          try {
            const body = init?.body ? JSON.parse(init.body as string) : null;
            console.log('[REQ events]', init?.method, url, body);
          } catch (_) {
            console.log('[REQ events]', init?.method, url);
          }
        }
        // @ts-ignore
        return fetch(input, init);
      },
    },
  }
);
