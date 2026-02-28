import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase configuration
const supabaseUrl = 'https://dfhviqrromjqboeojaxg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

if (!supabaseKey) {
  console.error('[SUPABASE CLIENT] Missing Supabase key. Please set VITE_SUPABASE_KEY or VITE_SUPABASE_PUBLISHABLE_KEY environment variable.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey || '', {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});