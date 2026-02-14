import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export function createSupabaseClient(supabaseUrl, supabaseAnonKey) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL/Anon Key não configurados.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function saveLead(supabaseClient, leadData) {
  const { data, error } = await supabaseClient
    .from('leads')
    .insert([leadData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
