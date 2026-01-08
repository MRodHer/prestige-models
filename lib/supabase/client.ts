import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL\!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY\!;

if (\!supabaseUrl || \!supabaseAnonKey) {
  console.warn("Supabase credentials not found");
}

export const supabase = createClient(
  supabaseUrl || "https://vpdjovwmvivdpqkondyj.supabase.co",
  supabaseAnonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZGpvdndtdml2ZHBxa29uZHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MDE4NDcsImV4cCI6MjA4MzQ3Nzg0N30.2yZSEfPCr82nGXmTYH2G0wKqZPd183GfPPGseq2HQt0",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
