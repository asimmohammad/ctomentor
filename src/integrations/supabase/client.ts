import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://dfhviqrromjqboeojaxg.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

if (!SUPABASE_PUBLISHABLE_KEY) {
  console.error('[SUPABASE CLIENT] Missing Supabase publishable key. Please set VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_KEY environment variable.');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY || '', {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});