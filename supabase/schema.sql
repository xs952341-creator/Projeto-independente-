-- Estrutura inicial para captura de leads
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  full_name text,
  headline text,
  linkedin_url text,
  ai_generated_message text,
  user_email text,
  status text DEFAULT 'pending'
);
