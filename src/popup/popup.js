import { loadConfig, saveConfig } from '../utils/config.js';
import { createSupabaseClient, saveLead } from '../utils/supabase.js';
import { generateLeadMessageWithGemini } from '../utils/gemini.js';
import { openStripeCheckoutWithPrice, openStripePayment } from '../utils/stripe.js';

const statusEl = document.getElementById('status');
const captureLeadBtn = document.getElementById('captureLeadBtn');
const saveConfigBtn = document.getElementById('saveConfigBtn');
const stripePaymentBtn = document.getElementById('stripePaymentBtn');

const supabaseUrlInput = document.getElementById('supabaseUrl');
const supabaseAnonKeyInput = document.getElementById('supabaseAnonKey');
const userEmailInput = document.getElementById('userEmail');
const geminiApiKeyInput = document.getElementById('geminiApiKey');
const geminiModelInput = document.getElementById('geminiModel');
const stripePublishableKeyInput = document.getElementById('stripePublishableKey');
const stripePaymentLinkInput = document.getElementById('stripePaymentLink');
const stripePriceIdInput = document.getElementById('stripePriceId');

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle('error', isError);
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    throw new Error('Nenhuma aba ativa encontrada.');
  }

  if (!tab.url?.includes('linkedin.com/in/')) {
    throw new Error('Abra um perfil do LinkedIn (linkedin.com/in/...) para capturar o lead.');
  }

  return tab;
}

async function requestLinkedInData(tabId) {
  const response = await chrome.tabs.sendMessage(tabId, {
    action: 'extractLinkedInData'
  });

  if (!response?.success) {
    throw new Error('Não foi possível extrair dados deste perfil.');
  }

  return response.data;
}

function validateSupabaseConfig({ supabaseUrl, supabaseAnonKey }) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Preencha SUPABASE_URL e SUPABASE_ANON_KEY antes de capturar.');
  }
}

function validateGeminiConfig({ geminiApiKey }) {
  if (!geminiApiKey) {
    throw new Error('Preencha GEMINI_API_KEY para gerar mensagem com Gemini.');
  }
}

async function initializeConfig() {
  const config = await loadConfig();
  supabaseUrlInput.value = config.supabaseUrl;
  supabaseAnonKeyInput.value = config.supabaseAnonKey;
  userEmailInput.value = config.userEmail;
  geminiApiKeyInput.value = config.geminiApiKey;
  geminiModelInput.value = config.geminiModel;
  stripePublishableKeyInput.value = config.stripePublishableKey;
  stripePaymentLinkInput.value = config.stripePaymentLink;
  stripePriceIdInput.value = config.stripePriceId;
}

saveConfigBtn.addEventListener('click', async () => {
  try {
    const configToSave = {
      SUPABASE_URL: supabaseUrlInput.value.trim(),
      SUPABASE_ANON_KEY: supabaseAnonKeyInput.value.trim(),
      USER_EMAIL: userEmailInput.value.trim(),
      GEMINI_API_KEY: geminiApiKeyInput.value.trim(),
      GEMINI_MODEL: geminiModelInput.value.trim() || 'gemini-1.5-flash',
      STRIPE_PUBLISHABLE_KEY: stripePublishableKeyInput.value.trim(),
      STRIPE_PAYMENT_LINK: stripePaymentLinkInput.value.trim(),
      STRIPE_PRICE_ID: stripePriceIdInput.value.trim()
    };

    await saveConfig(configToSave);
    setStatus('Configuração salva com sucesso.');
  } catch (error) {
    console.error(error);
    setStatus(`Erro: ${error.message}`, true);
  }
});

captureLeadBtn.addEventListener('click', async () => {
  setStatus('Capturando perfil, chamando Gemini e salvando lead...');

  try {
    const config = await loadConfig();
    validateSupabaseConfig(config);
    validateGeminiConfig(config);

    const supabase = createSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);
    const tab = await getActiveTab();
    const linkedInData = await requestLinkedInData(tab.id);

    const aiMessage = await generateLeadMessageWithGemini({
      apiKey: config.geminiApiKey,
      model: config.geminiModel,
      lead: linkedInData
    });

    const lead = {
      ...linkedInData,
      ai_generated_message: aiMessage,
      user_email: config.userEmail || null
    };

    await saveLead(supabase, lead);
    setStatus('Lead salvo com sucesso (mensagem gerada pelo Gemini).');
  } catch (error) {
    console.error(error);
    setStatus(`Erro: ${error.message}`, true);
  }
});

stripePaymentBtn.addEventListener('click', async () => {
  try {
    const config = await loadConfig();

    if (config.stripePaymentLink) {
      await openStripePayment({ paymentLink: config.stripePaymentLink });
      setStatus('Abrindo Stripe Payment Link...');
      return;
    }

    await openStripeCheckoutWithPrice({
      publishableKey: config.stripePublishableKey,
      priceId: config.stripePriceId,
      customerEmail: config.userEmail
    });

    setStatus('Redirecionando para checkout Stripe...');
  } catch (error) {
    console.error(error);
    setStatus(`Erro: ${error.message}`, true);
  }
});

initializeConfig();
