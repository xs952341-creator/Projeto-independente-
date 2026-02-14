const CONFIG_KEYS = {
  SUPABASE_URL: 'SUPABASE_URL',
  SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY',
  USER_EMAIL: 'USER_EMAIL',
  GEMINI_API_KEY: 'GEMINI_API_KEY',
  GEMINI_MODEL: 'GEMINI_MODEL',
  STRIPE_PUBLISHABLE_KEY: 'STRIPE_PUBLISHABLE_KEY',
  STRIPE_PAYMENT_LINK: 'STRIPE_PAYMENT_LINK',
  STRIPE_PRICE_ID: 'STRIPE_PRICE_ID'
};

export async function saveConfig(config) {
  await chrome.storage.local.set(config);
}

export async function loadConfig() {
  const values = await chrome.storage.local.get(Object.values(CONFIG_KEYS));

  return {
    supabaseUrl: values[CONFIG_KEYS.SUPABASE_URL] || '',
    supabaseAnonKey: values[CONFIG_KEYS.SUPABASE_ANON_KEY] || '',
    userEmail: values[CONFIG_KEYS.USER_EMAIL] || '',
    geminiApiKey: values[CONFIG_KEYS.GEMINI_API_KEY] || '',
    geminiModel: values[CONFIG_KEYS.GEMINI_MODEL] || 'gemini-1.5-flash',
    stripePublishableKey: values[CONFIG_KEYS.STRIPE_PUBLISHABLE_KEY] || '',
    stripePaymentLink: values[CONFIG_KEYS.STRIPE_PAYMENT_LINK] || '',
    stripePriceId: values[CONFIG_KEYS.STRIPE_PRICE_ID] || ''
  };
}
