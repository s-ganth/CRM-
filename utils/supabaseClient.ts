
import { createClient } from '@supabase/supabase-js';

// The Supabase URL you provided has been added below.
const supabaseUrl = 'https://mcrgbcnyisydtrjbvnsp.supabase.co';

// The Supabase key you provided has been added below.
const supabaseAnonKey = 'sb_publishable_wxzmHopThraItaj5CF-BXA_dmFEgj9h';

// This check ensures a key has been provided.
if (!supabaseAnonKey || supabaseAnonKey.includes('PASTE_YOUR')) {
  throw new Error("A valid Supabase anon key was not provided in 'utils/supabaseClient.ts'. Please check your Supabase project's API settings.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
