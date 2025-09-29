import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://aneqwbpznvjglgfxhwtx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZXF3YnB6bnZqZ2xnZnhod3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5ODQwNzQsImV4cCI6MjA3NDU2MDA3NH0.HnIHUlDt0SuHabC3i9wUOQmUUrmWO7Wb4HrNjjjZVSA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});