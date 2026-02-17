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

export async function getAllLeads(supabaseClient, userEmail = null) {
  let query = supabaseClient
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (userEmail) {
    query = query.eq('user_email', userEmail);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
}

export async function deleteLead(supabaseClient, leadId) {
  const { error } = await supabaseClient
    .from('leads')
    .delete()
    .eq('id', leadId);

  if (error) {
    throw error;
  }

  return true;
}
