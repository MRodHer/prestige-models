import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vpdjovwmvivdpqkondyj.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZGpvdndtdml2ZHBxa29uZHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MDE4NDcsImV4cCI6MjA4MzQ3Nzg0N30.2yZSEfPCr82nGXmTYH2G0wKqZPd183GfPPGseq2HQt0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
