# ⚡ Oracle Validator Pro

> **Extensão Chrome Profissional para Captura de Leads no LinkedIn**

Uma extensão Chrome moderna e completa que captura dados de perfis do LinkedIn, gera mensagens personalizadas com Gemini AI, armazena leads no Supabase e integra pagamentos via Stripe.

---

## 🎯 Funcionalidades

### 📊 Dashboard Interativo
- ✅ Visualização completa de todos os leads capturados
- ✅ Busca em tempo real por nome ou cargo
- ✅ Estatísticas instantâneas (total, hoje)
- ✅ Cards elegantes com informações detalhadas
- ✅ Mensagens IA visíveis em cada lead
- ✅ Links diretos para perfis do LinkedIn

### 🤖 Integração com IA
- ✅ Geração automática de mensagens personalizadas via **Gemini AI**
- ✅ Contexto baseado em nome, cargo e perfil do lead
- ✅ Mensagens profissionais e objetivas em português
- ✅ Modelo configurável (padrão: gemini-1.5-flash)

### 🗄️ Banco de Dados Supabase
- ✅ Armazenamento seguro de leads
- ✅ Sincronização em tempo real
- ✅ Filtro por usuário/e-mail
- ✅ Histórico completo de capturas

### 💳 Pagamentos Stripe
- ✅ Integração com Stripe Payment Links
- ✅ Checkout direto (opcional)
- ✅ Suporte a test e live keys

### 📈 Analytics Avançado
- ✅ Estatísticas detalhadas (total, hoje, semana, mês)
- ✅ Gráfico visual dos últimos 7 dias
- ✅ Análise de tendências
- ✅ Atualização em tempo real

### 💾 Exportação de Dados
- ✅ Exportar leads para **CSV**
- ✅ Exportar leads para **JSON**
- ✅ Timestamp automático nos arquivos
- ✅ Todos os dados incluídos (mensagens IA, datas, status)

### 🎨 Design Moderno
- ✅ Interface profissional e vendável
- ✅ Gradientes e animações suaves
- ✅ Sistema de abas (Dashboard, Configuração, Analytics)
- ✅ Toast notifications elegantes
- ✅ Loading states em todas as ações
- ✅ Responsivo e otimizado

---

## 🚀 Como Usar

### 1️⃣ Instalação
1. Baixe ou clone este repositório
2. Abra o Chrome e vá para `chrome://extensions/`
3. Ative o **Modo do desenvolvedor**
4. Clique em **Carregar sem compactação**
5. Selecione a pasta `/app`

### 2️⃣ Configuração (Já Pré-configurada!)
As chaves API já estão configuradas automaticamente:
- ✅ **Supabase**: https://nhbaqrcjjbsfvdvetbkn.supabase.co
- ✅ **Gemini AI**: Configurado
- ✅ **Stripe**: Configurado (test key)

Você pode personalizá-las na aba **⚙️ Configuração**.

### 3️⃣ Capturar Leads
1. Visite um perfil do LinkedIn (ex: `linkedin.com/in/nome-do-usuario`)
2. Clique no ícone da extensão
3. Na aba **📊 Dashboard**, clique em **📋 Capturar Lead do LinkedIn**
4. Aguarde:
   - Extração dos dados do perfil
   - Geração da mensagem com Gemini AI
   - Salvamento no Supabase
5. Pronto! O lead aparecerá no dashboard

### 4️⃣ Visualizar e Gerenciar
- **Dashboard**: Veja todos os leads com busca e filtros
- **Analytics**: Analise estatísticas e gráficos
- **Exportar**: Baixe seus dados em CSV ou JSON

---

## 📁 Estrutura do Projeto

```
/app/
├── manifest.json              # Configuração da extensão Chrome
├── styles/
│   └── main.css              # Design moderno e profissional
├── src/
│   ├── popup/
│   │   ├── popup.html        # Interface com sistema de abas
│   │   └── popup.js          # Lógica principal da extensão
│   ├── content/
│   │   └── linkedin.js       # Extração de dados do LinkedIn
│   ├── utils/
│   │   ├── config.js         # Gerenciamento de configurações
│   │   ├── supabase.js       # Integração com Supabase
│   │   ├── gemini.js         # Integração com Gemini AI
│   │   ├── stripe.js         # Integração com Stripe
│   │   ├── toast.js          # Sistema de notificações
│   │   ├── analytics.js      # Cálculos e estatísticas
│   │   └── export.js         # Exportação de dados
│   └── background.js         # Service worker
└── supabase/
    └── schema.sql            # Schema do banco de dados
```

---

## 🔑 Chaves API Necessárias

### Supabase (Banco de Dados)
- **SUPABASE_URL**: URL do seu projeto Supabase
- **SUPABASE_ANON_KEY**: Chave anônima do Supabase
- Obtenha em: https://supabase.com/dashboard

### Gemini AI (Geração de Mensagens)
- **GEMINI_API_KEY**: Chave da API do Gemini
- Obtenha em: https://makersuite.google.com/app/apikey

### Stripe (Pagamentos)
- **STRIPE_PUBLISHABLE_KEY**: Chave pública do Stripe
- **STRIPE_PAYMENT_LINK** ou **STRIPE_PRICE_ID**
- Obtenha em: https://dashboard.stripe.com

---

## 🎨 Recursos Visuais

### Dashboard
- Cards de leads com hover effects
- Busca em tempo real
- Estatísticas destacadas
- Layout responsivo

### Configuração
- Formulários organizados por categoria
- Validação em tempo real
- Salvamento automático
- Indicadores visuais

### Analytics
- Gráfico de barras dos últimos 7 dias
- 4 cards de estatísticas
- Dados atualizados em tempo real
- Design minimalista e profissional

---

## 🛠️ Tecnologias Utilizadas

- **Manifest V3** (Chrome Extensions)
- **Vanilla JavaScript** (ES6 Modules)
- **Supabase** (Backend as a Service)
- **Gemini AI** (Google Generative AI)
- **Stripe** (Payment Processing)
- **CSS3** (Gradientes, Animações, Glassmorphism)

---

## 📊 Schema do Banco de Dados (Supabase)

```sql
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
```

---

## 🚀 Próximos Passos

- [ ] Publicar na Chrome Web Store
- [ ] Adicionar mais filtros no dashboard
- [ ] Implementar edição de leads
- [ ] Adicionar tags personalizadas
- [ ] Sistema de follow-up automático
- [ ] Integração com CRM

---

## 📝 Licença

Este projeto é de propriedade privada.

---

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato através do e-mail configurado na extensão.

---

**Feito com ❤️ e muito ☕ | Oracle Validator Pro © 2025**
