# 📖 Guia Rápido - Oracle Validator Pro

## 🎯 Como Instalar a Extensão

### Passo 1: Preparar o Chrome
1. Abra o navegador **Google Chrome**
2. Digite na barra de endereço: `chrome://extensions/`
3. Pressione **Enter**

### Passo 2: Ativar Modo Desenvolvedor
1. No canto superior direito, encontre o switch **"Modo do desenvolvedor"**
2. Clique para **ativar** (deve ficar azul)

### Passo 3: Carregar a Extensão
1. Clique no botão **"Carregar sem compactação"**
2. Navegue até a pasta `/app` deste projeto
3. Selecione a pasta e clique em **"Selecionar pasta"**

### Passo 4: Confirmar Instalação
1. Você verá o card **"Oracle Validator Pro"** na lista de extensões
2. Certifique-se de que está **ativado** (switch azul)
3. Fixe a extensão clicando no ícone de 🧩 (extensões) e depois no 📌

---

## 🚀 Como Usar

### 1️⃣ Primeira Vez - Verificar Configuração
1. Clique no ícone da extensão na barra do Chrome
2. Vá para a aba **⚙️ Configuração**
3. Verifique que todas as chaves já estão preenchidas:
   - ✅ Supabase URL e Key
   - ✅ Gemini API Key
   - ✅ Stripe Key
4. Adicione seu **e-mail** (opcional, para filtrar seus leads)
5. Clique em **💾 Salvar Configuração**

### 2️⃣ Capturar um Lead do LinkedIn
1. Abra o **LinkedIn** no navegador
2. Visite um perfil de interesse (ex: `linkedin.com/in/nome-pessoa`)
3. Clique no ícone da extensão **Oracle Validator Pro**
4. Na aba **📊 Dashboard**, clique em **📋 Capturar Lead do LinkedIn**
5. Aguarde o processo:
   ```
   ⏳ Extraindo dados do LinkedIn...
   🤖 Gerando mensagem com Gemini AI...
   💾 Salvando lead no Supabase...
   ✅ Lead capturado e salvo com sucesso!
   ```

### 3️⃣ Ver seus Leads
1. Vá para a aba **📊 Dashboard**
2. Veja todos os seus leads capturados em cards elegantes
3. Use a **barra de busca** para filtrar por nome ou cargo
4. Clique em **🔗 Ver Perfil no LinkedIn** para revisitar o perfil

### 4️⃣ Analisar Estatísticas
1. Vá para a aba **📈 Analytics**
2. Veja:
   - **Total** de leads capturados
   - Leads capturados **hoje**
   - Leads capturados **esta semana**
   - Leads capturados **este mês**
   - **Gráfico** dos últimos 7 dias

### 5️⃣ Exportar seus Dados
1. No **Dashboard**, role até a seção **💾 Exportar Dados**
2. Escolha o formato:
   - **📥 Exportar para CSV** (ideal para Excel)
   - **📥 Exportar para JSON** (ideal para sistemas)
3. O arquivo será baixado automaticamente com timestamp

---

## 💡 Dicas e Truques

### ⚡ Atalhos Rápidos
- **Buscar lead**: Digite na barra de busca do Dashboard
- **Atualizar dados**: Clique em 🔄 Atualizar Dashboard ou Analytics
- **Captura rápida**: Use Ctrl/Cmd + Clique no botão de captura

### 🎯 Melhores Práticas
1. **Sempre verifique** se está em um perfil do LinkedIn antes de capturar
2. **Use a busca** no Dashboard para encontrar leads rapidamente
3. **Exporte regularmente** seus dados como backup
4. **Confira o Analytics** para acompanhar seu progresso

### 🔧 Troubleshooting

**❌ "Configure SUPABASE_URL e SUPABASE_ANON_KEY"**
- Solução: Vá para Configuração e clique em Salvar Configuração

**❌ "Não foi possível extrair dados deste perfil"**
- Solução: Certifique-se de estar em um perfil do LinkedIn (linkedin.com/in/...)

**❌ "Falha Gemini"**
- Solução: Verifique se a Gemini API Key está correta na Configuração

**❌ Leads não aparecem no Dashboard**
- Solução: Clique em 🔄 Atualizar Dashboard

---

## 📊 O que cada Lead contém?

Cada lead capturado inclui:
- ✅ **Nome completo** da pessoa
- ✅ **Cargo/Headline** atual
- ✅ **URL do perfil** do LinkedIn
- ✅ **Mensagem personalizada** gerada pela IA
- ✅ **Data e hora** da captura
- ✅ **Status** (Pendente, Contatado, etc.)
- ✅ **Seu e-mail** (se configurado)

---

## 🎨 Interface

### Dashboard (Aba Principal)
```
┌─────────────────────────────────────┐
│ 🔍 Buscar por nome ou cargo...     │
├─────────────────────────────────────┤
│ 📋 Capturar Lead do LinkedIn       │
│ 🔄 Atualizar Dashboard             │
├─────────────────────────────────────┤
│ Total: 25    |    Hoje: 3          │
├─────────────────────────────────────┤
│ 📋 Seus Leads                       │
│  [Lead 1] João Silva                │
│  [Lead 2] Maria Santos              │
│  [Lead 3] Pedro Costa               │
└─────────────────────────────────────┘
```

### Analytics (Estatísticas)
```
┌─────────────────────────────────────┐
│ Total: 25  |  Semana: 12           │
│ Mês: 25    |  Hoje: 3              │
├─────────────────────────────────────┤
│ 📊 Gráfico - Últimos 7 Dias        │
│  ▁▃▅█▇▅▃                           │
└─────────────────────────────────────┘
```

---

## 🔐 Segurança

- ✅ Todas as chaves são armazenadas **localmente** no Chrome
- ✅ Nenhum dado é enviado para servidores externos (exceto APIs configuradas)
- ✅ Conexão segura via HTTPS com Supabase, Gemini e Stripe
- ✅ Você tem **controle total** dos seus dados

---

## 📞 Precisa de Ajuda?

Se encontrar qualquer problema:
1. Verifique se todas as configurações estão corretas
2. Tente recarregar a extensão (chrome://extensions/ → 🔄)
3. Confira o console do navegador (F12) para erros
4. Entre em contato através do e-mail configurado

---

**🎉 Aproveite o Oracle Validator Pro!**

*Transforme perfis do LinkedIn em leads qualificados com IA!*
