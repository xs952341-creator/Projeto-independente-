import { loadConfig, saveConfig } from '../utils/config.js';
import { createSupabaseClient, saveLead, getAllLeads } from '../utils/supabase.js';
import { generateLeadMessageWithGemini } from '../utils/gemini.js';
import { openStripeCheckoutWithPrice, openStripePayment } from '../utils/stripe.js';
import { showToast } from '../utils/toast.js';
import { calculateStats, filterLeads, sortLeads } from '../utils/analytics.js';
import { exportToCSV, exportToJSON } from '../utils/export.js';

// ========== ELEMENTOS DO DOM ==========
// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Dashboard
const searchLeadsInput = document.getElementById('searchLeads');
const leadsListContainer = document.getElementById('leadsList');
const refreshDashboardBtn = document.getElementById('refreshDashboardBtn');
const statTotal = document.getElementById('statTotal');
const statToday = document.getElementById('statToday');

// Config
const supabaseUrlInput = document.getElementById('supabaseUrl');
const supabaseAnonKeyInput = document.getElementById('supabaseAnonKey');
const userEmailInput = document.getElementById('userEmail');
const geminiApiKeyInput = document.getElementById('geminiApiKey');
const geminiModelInput = document.getElementById('geminiModel');
const stripePublishableKeyInput = document.getElementById('stripePublishableKey');
const stripePaymentLinkInput = document.getElementById('stripePaymentLink');
const stripePriceIdInput = document.getElementById('stripePriceId');
const saveConfigBtn = document.getElementById('saveConfigBtn');
const stripePaymentBtn = document.getElementById('stripePaymentBtn');

// Actions
const captureLeadBtn = document.getElementById('captureLeadBtn');
const exportCSVBtn = document.getElementById('exportCSVBtn');
const exportJSONBtn = document.getElementById('exportJSONBtn');

// Analytics
const analyticsTotal = document.getElementById('analyticsTotal');
const analyticsWeek = document.getElementById('analyticsWeek');
const analyticsMonth = document.getElementById('analyticsMonth');
const analyticsToday = document.getElementById('analyticsToday');
const leadsChart = document.getElementById('leadsChart');
const refreshAnalyticsBtn = document.getElementById('refreshAnalyticsBtn');

// ========== ESTADO GLOBAL ==========
let currentLeads = [];
let currentConfig = {};

// ========== FUNÇÕES DE NAVEGAÇÃO ==========
function switchTab(tabName) {
  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === `${tabName}-tab`);
  });

  // Carregar dados específicos da aba
  if (tabName === 'dashboard') {
    loadDashboard();
  } else if (tabName === 'analytics') {
    loadAnalytics();
  }
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

// ========== FUNÇÕES DE UTILIDADE ==========
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
    throw new Error('Configure SUPABASE_URL e SUPABASE_ANON_KEY antes de capturar.');
  }
}

function validateGeminiConfig({ geminiApiKey }) {
  if (!geminiApiKey) {
    throw new Error('Configure GEMINI_API_KEY para gerar mensagem com Gemini.');
  }
}

function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    const originalText = button.innerHTML;
    button.dataset.originalText = originalText;
    button.innerHTML = '<span class="spinner"></span> Processando...';
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || button.innerHTML;
  }
}

// ========== DASHBOARD ==========
async function loadDashboard() {
  try {
    const config = await loadConfig();
    validateSupabaseConfig(config);

    const supabase = createSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);
    currentLeads = await getAllLeads(supabase, config.userEmail || null);

    renderLeads(currentLeads);
    updateDashboardStats(currentLeads);
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    renderEmptyState('Erro ao carregar leads. Configure suas credenciais na aba Configuração.');
  }
}

function renderLeads(leads) {
  if (!leads || leads.length === 0) {
    renderEmptyState('Nenhum lead capturado ainda. Visite um perfil do LinkedIn e clique em "Capturar Lead".');
    return;
  }

  const sortedLeads = sortLeads(leads, 'date', 'desc');
  
  leadsListContainer.innerHTML = sortedLeads.map(lead => {
    const date = new Date(lead.created_at).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <div class="lead-card" data-testid="lead-card">
        <div class="lead-header">
          <div>
            <h3 class="lead-name">${lead.full_name || 'Nome não disponível'}</h3>
            <p class="lead-headline">${lead.headline || 'Cargo não disponível'}</p>
          </div>
          <span class="badge ${lead.status || 'pending'}">${lead.status || 'Pendente'}</span>
        </div>
        <p class="lead-date">📅 ${date}</p>
        <a href="${lead.linkedin_url}" target="_blank" class="lead-url" data-testid="lead-url">
          🔗 Ver Perfil no LinkedIn
        </a>
        ${lead.ai_generated_message ? `
          <div class="lead-message">
            <strong>🤖 Mensagem IA:</strong><br/>
            ${lead.ai_generated_message}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function renderEmptyState(message) {
  leadsListContainer.innerHTML = `
    <div class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p>${message}</p>
    </div>
  `;
}

function updateDashboardStats(leads) {
  const stats = calculateStats(leads);
  statTotal.textContent = stats.total;
  statToday.textContent = stats.today;
}

// Search functionality
searchLeadsInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  const filtered = filterLeads(currentLeads, searchTerm);
  renderLeads(filtered);
});

refreshDashboardBtn.addEventListener('click', async () => {
  setButtonLoading(refreshDashboardBtn, true);
  await loadDashboard();
  setButtonLoading(refreshDashboardBtn, false);
  showToast('Dashboard atualizado!', 'success');
});

// ========== ANALYTICS ==========
async function loadAnalytics() {
  try {
    const config = await loadConfig();
    validateSupabaseConfig(config);

    const supabase = createSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);
    const leads = await getAllLeads(supabase, config.userEmail || null);

    const stats = calculateStats(leads);

    analyticsTotal.textContent = stats.total;
    analyticsWeek.textContent = stats.thisWeek;
    analyticsMonth.textContent = stats.thisMonth;
    analyticsToday.textContent = stats.today;

    renderChart(stats.chartData);
  } catch (error) {
    console.error('Erro ao carregar analytics:', error);
    showToast('Erro ao carregar analytics', 'error');
  }
}

function renderChart(chartData) {
  if (!chartData || chartData.length === 0) {
    leadsChart.innerHTML = '<p class="text-center text-muted">Sem dados para exibir</p>';
    return;
  }

  const maxCount = Math.max(...chartData.map(d => d.count), 1);

  leadsChart.innerHTML = chartData.map(data => {
    const height = (data.count / maxCount) * 100;
    return `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
        <div class="chart-bar" style="height: ${height}%" title="${data.count} leads"></div>
        <div class="chart-label">${data.date}</div>
        <div style="font-size: 11px; font-weight: 600; color: var(--gray-700); margin-top: 2px;">
          ${data.count}
        </div>
      </div>
    `;
  }).join('');
}

refreshAnalyticsBtn.addEventListener('click', async () => {
  setButtonLoading(refreshAnalyticsBtn, true);
  await loadAnalytics();
  setButtonLoading(refreshAnalyticsBtn, false);
  showToast('Analytics atualizado!', 'success');
});

// ========== CONFIGURAÇÃO ==========
async function initializeConfig() {
  currentConfig = await loadConfig();
  
  // Pré-configurar com as chaves fornecidas se não existirem
  if (!currentConfig.supabaseUrl) {
    currentConfig.supabaseUrl = 'https://nhbaqrcjjbsfvdvetbkn.supabase.co';
  }
  if (!currentConfig.supabaseAnonKey) {
    currentConfig.supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYmFxcmNqamJzZnZkdmV0YmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjU2OTIsImV4cCI6MjA4Njk0MTY5Mn0.j7dzJlPjP-tult0WItGwuk6l2F-hzLMEgGn10z2jwlw';
  }
  if (!currentConfig.geminiApiKey) {
    currentConfig.geminiApiKey = 'AIzaSyCvCNjfNFdqiCqFQVD4k_uH49P0xywWBIY';
  }
  if (!currentConfig.stripePublishableKey) {
    currentConfig.stripePublishableKey = 'pk_test_51SzLc3E3IKoGtVrQl5EOfE7WbGQaAwtZLXW1mBMUoH5In7FSrFal5G3OBMnS90XTGQGBZiWWUbJ1RPjUsrYnzVgZ00za1abLj4';
  }
  if (!currentConfig.geminiModel) {
    currentConfig.geminiModel = 'gemini-1.5-flash';
  }

  // Salvar configuração pré-definida
  await saveConfig({
    SUPABASE_URL: currentConfig.supabaseUrl,
    SUPABASE_ANON_KEY: currentConfig.supabaseAnonKey,
    GEMINI_API_KEY: currentConfig.geminiApiKey,
    GEMINI_MODEL: currentConfig.geminiModel,
    STRIPE_PUBLISHABLE_KEY: currentConfig.stripePublishableKey,
    USER_EMAIL: currentConfig.userEmail || '',
    STRIPE_PAYMENT_LINK: currentConfig.stripePaymentLink || '',
    STRIPE_PRICE_ID: currentConfig.stripePriceId || ''
  });

  // Preencher campos
  supabaseUrlInput.value = currentConfig.supabaseUrl;
  supabaseAnonKeyInput.value = currentConfig.supabaseAnonKey;
  userEmailInput.value = currentConfig.userEmail;
  geminiApiKeyInput.value = currentConfig.geminiApiKey;
  geminiModelInput.value = currentConfig.geminiModel;
  stripePublishableKeyInput.value = currentConfig.stripePublishableKey;
  stripePaymentLinkInput.value = currentConfig.stripePaymentLink;
  stripePriceIdInput.value = currentConfig.stripePriceId;
}

saveConfigBtn.addEventListener('click', async () => {
  setButtonLoading(saveConfigBtn, true);
  
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
    currentConfig = await loadConfig();
    showToast('Configuração salva com sucesso!', 'success');
  } catch (error) {
    console.error(error);
    showToast(`Erro: ${error.message}`, 'error');
  } finally {
    setButtonLoading(saveConfigBtn, false);
  }
});

// ========== CAPTURA DE LEAD ==========
captureLeadBtn.addEventListener('click', async () => {
  setButtonLoading(captureLeadBtn, true);

  try {
    const config = await loadConfig();
    validateSupabaseConfig(config);
    validateGeminiConfig(config);

    const supabase = createSupabaseClient(config.supabaseUrl, config.supabaseAnonKey);
    const tab = await getActiveTab();
    
    showToast('Extraindo dados do LinkedIn...', 'info');
    const linkedInData = await requestLinkedInData(tab.id);

    showToast('Gerando mensagem com Gemini AI...', 'info');
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

    showToast('Salvando lead no Supabase...', 'info');
    await saveLead(supabase, lead);
    
    showToast('✅ Lead capturado e salvo com sucesso!', 'success', 4000);
    
    // Atualizar dashboard
    await loadDashboard();
  } catch (error) {
    console.error(error);
    showToast(`❌ Erro: ${error.message}`, 'error', 5000);
  } finally {
    setButtonLoading(captureLeadBtn, false);
  }
});

// ========== EXPORTAÇÃO ==========
exportCSVBtn.addEventListener('click', async () => {
  try {
    if (currentLeads.length === 0) {
      showToast('Nenhum lead para exportar', 'warning');
      return;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(currentLeads, `leads_${timestamp}.csv`);
    showToast('Leads exportados para CSV!', 'success');
  } catch (error) {
    console.error(error);
    showToast(`Erro: ${error.message}`, 'error');
  }
});

exportJSONBtn.addEventListener('click', async () => {
  try {
    if (currentLeads.length === 0) {
      showToast('Nenhum lead para exportar', 'warning');
      return;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    exportToJSON(currentLeads, `leads_${timestamp}.json`);
    showToast('Leads exportados para JSON!', 'success');
  } catch (error) {
    console.error(error);
    showToast(`Erro: ${error.message}`, 'error');
  }
});

// ========== STRIPE ==========
stripePaymentBtn.addEventListener('click', async () => {
  try {
    const config = await loadConfig();

    if (config.stripePaymentLink) {
      await openStripePayment({ paymentLink: config.stripePaymentLink });
      showToast('Abrindo Stripe Payment Link...', 'info');
      return;
    }

    await openStripeCheckoutWithPrice({
      publishableKey: config.stripePublishableKey,
      priceId: config.stripePriceId,
      customerEmail: config.userEmail
    });

    showToast('Redirecionando para checkout Stripe...', 'info');
  } catch (error) {
    console.error(error);
    showToast(`Erro: ${error.message}`, 'error');
  }
});

// ========== INICIALIZAÇÃO ==========
(async function init() {
  await initializeConfig();
  await loadDashboard();
  showToast('✨ Oracle Validator Pro carregado!', 'success', 2000);
})();
