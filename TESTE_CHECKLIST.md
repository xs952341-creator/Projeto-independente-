# ✅ Checklist de Teste - Oracle Validator Pro

## 📋 Verificação Completa da Extensão

Use este checklist para garantir que tudo está funcionando perfeitamente.

---

## 1️⃣ **INSTALAÇÃO**

- [ ] A extensão carrega sem erros no Chrome
- [ ] O ícone aparece na barra de ferramentas
- [ ] O popup abre corretamente ao clicar no ícone
- [ ] As 3 abas são visíveis (Dashboard, Configuração, Analytics)
- [ ] O design está moderno com gradientes azul/roxo

**Como testar:**
1. Abra `chrome://extensions/`
2. Carregue a pasta `/app`
3. Clique no ícone da extensão

✅ **Resultado esperado:** Popup abre com interface moderna

---

## 2️⃣ **CONFIGURAÇÃO**

- [ ] Campos pré-preenchidos com as chaves API
- [ ] Supabase URL: https://nhbaqrcjjbsfvdvetbkn.supabase.co
- [ ] Supabase Anon Key: Preenchida
- [ ] Gemini API Key: Preenchida
- [ ] Stripe Key: Preenchida
- [ ] Botão "Salvar Configuração" funciona
- [ ] Toast de sucesso aparece após salvar

**Como testar:**
1. Clique na aba **⚙️ Configuração**
2. Verifique se os campos estão preenchidos
3. Adicione seu e-mail (opcional)
4. Clique em **💾 Salvar Configuração**

✅ **Resultado esperado:** Toast verde "Configuração salva com sucesso!"

---

## 3️⃣ **DASHBOARD**

### Visualização Inicial
- [ ] Barra de busca está visível
- [ ] Seção "Ações Rápidas" com botão de captura
- [ ] Cards de estatísticas mostram "0" inicialmente
- [ ] Seção "Seus Leads" está visível
- [ ] Mensagem de "Nenhum lead capturado ainda" aparece
- [ ] Seção "Exportar Dados" está visível

**Como testar:**
1. Clique na aba **📊 Dashboard**
2. Observe o layout

✅ **Resultado esperado:** Interface organizada e vazia (sem leads ainda)

---

## 4️⃣ **CAPTURA DE LEAD**

### Preparação
- [ ] Abrir o LinkedIn em uma nova aba
- [ ] Navegar para um perfil (ex: linkedin.com/in/nome-usuario)
- [ ] O perfil carrega completamente

### Execução
- [ ] Clicar no ícone da extensão
- [ ] Ir para aba Dashboard
- [ ] Clicar em **📋 Capturar Lead do LinkedIn**
- [ ] Toast "Extraindo dados..." aparece
- [ ] Toast "Gerando mensagem..." aparece
- [ ] Toast "Salvando lead..." aparece
- [ ] Toast verde "Lead capturado e salvo!" aparece
- [ ] Dashboard atualiza automaticamente
- [ ] Novo lead aparece na lista

**Como testar:**
1. Visite: `https://www.linkedin.com/in/williamhgates/` (exemplo)
2. Clique na extensão
3. Dashboard → **📋 Capturar Lead**
4. Aguarde ~5-10 segundos

✅ **Resultado esperado:** 
- 4 toasts sequenciais
- Lead aparece no dashboard com:
  - Nome da pessoa
  - Cargo
  - Data de captura
  - Link para perfil
  - Mensagem IA gerada

---

## 5️⃣ **BUSCA NO DASHBOARD**

- [ ] Digitar nome na barra de busca
- [ ] Lista filtra em tempo real
- [ ] Busca funciona para nome
- [ ] Busca funciona para cargo
- [ ] Limpar busca mostra todos os leads novamente

**Como testar:**
1. Capture 2-3 leads diferentes
2. Digite parte do nome de um lead
3. Observe a filtragem

✅ **Resultado esperado:** Apenas leads que correspondem à busca aparecem

---

## 6️⃣ **ESTATÍSTICAS**

- [ ] Card "Total de Leads" atualiza após captura
- [ ] Card "Hoje" mostra leads de hoje
- [ ] Números são exibidos corretamente
- [ ] Estatísticas atualizam em tempo real

**Como testar:**
1. Observe estatísticas antes de capturar
2. Capture 1 lead
3. Verifique se números aumentaram

✅ **Resultado esperado:** 
- Total: +1
- Hoje: +1

---

## 7️⃣ **ANALYTICS**

### Visualização
- [ ] 4 cards de estatísticas estão visíveis
- [ ] Gráfico de barras está visível
- [ ] Gráfico mostra últimos 7 dias
- [ ] Labels de data estão corretas
- [ ] Números nos cards estão corretos

### Dados
- [ ] Total de leads
- [ ] Leads desta semana
- [ ] Leads deste mês
- [ ] Leads de hoje
- [ ] Gráfico reflete dados reais

**Como testar:**
1. Clique na aba **📈 Analytics**
2. Observe os dados
3. Clique em **🔄 Atualizar Analytics**

✅ **Resultado esperado:** Estatísticas corretas e gráfico visual

---

## 8️⃣ **EXPORTAÇÃO**

### CSV
- [ ] Botão **📥 Exportar para CSV** está visível
- [ ] Clicar no botão inicia download
- [ ] Arquivo CSV é baixado
- [ ] Nome do arquivo tem timestamp (ex: leads_2025-08-15.csv)
- [ ] CSV abre no Excel/Google Sheets
- [ ] Todas as colunas estão presentes
- [ ] Dados estão corretos

### JSON
- [ ] Botão **📥 Exportar para JSON** está visível
- [ ] Clicar no botão inicia download
- [ ] Arquivo JSON é baixado
- [ ] Nome do arquivo tem timestamp
- [ ] JSON é válido e legível

**Como testar:**
1. Capture pelo menos 1 lead
2. Dashboard → **💾 Exportar Dados**
3. Clique em **📥 Exportar para CSV**
4. Abra o arquivo baixado

✅ **Resultado esperado:** Arquivo com todos os dados dos leads

---

## 9️⃣ **NOTIFICAÇÕES TOAST**

- [ ] Toast de sucesso é verde
- [ ] Toast de erro é vermelho
- [ ] Toast de info é azul
- [ ] Toast de warning é laranja
- [ ] Toasts aparecem no canto superior direito
- [ ] Toasts desaparecem automaticamente (3s)
- [ ] Animação de entrada é suave
- [ ] Animação de saída é suave

**Como testar:**
1. Execute diferentes ações (capturar, salvar config, exportar)
2. Observe as notificações

✅ **Resultado esperado:** Notificações aparecem e desaparecem suavemente

---

## 🔟 **STRIPE (OPCIONAL)**

- [ ] Botão **💳 Abrir Pagamento Stripe** está visível
- [ ] Clicar no botão abre link/checkout
- [ ] Redirecionamento funciona

**Como testar:**
1. Configuração → **💳 Abrir Pagamento Stripe**
2. Observe o redirecionamento

✅ **Resultado esperado:** Link do Stripe abre em nova aba

---

## 1️⃣1️⃣ **RESPONSIVIDADE**

- [ ] Popup tem largura de 420px
- [ ] Conteúdo não ultrapassa os limites
- [ ] Scrollbar aparece quando necessário
- [ ] Cards se ajustam bem
- [ ] Gráfico é responsivo

**Como testar:**
1. Abra o popup
2. Navegue pelas abas
3. Observe o layout

✅ **Resultado esperado:** Interface organizada e sem quebras

---

## 1️⃣2️⃣ **PERFORMANCE**

- [ ] Popup abre instantaneamente (< 1s)
- [ ] Navegação entre abas é fluida
- [ ] Busca não trava
- [ ] Captura de lead leva ~5-10s
- [ ] Exportação é rápida
- [ ] Sem lags ou travamentos

**Como testar:**
1. Use a extensão normalmente
2. Observe tempos de resposta

✅ **Resultado esperado:** Tudo funciona rapidamente

---

## 1️⃣3️⃣ **CONSOLE (Verificação Técnica)**

- [ ] Abrir DevTools (F12)
- [ ] Verificar console
- [ ] Nenhum erro vermelho
- [ ] Avisos são aceitáveis

**Como testar:**
1. Clique com botão direito no popup
2. Selecione "Inspecionar"
3. Vá para aba "Console"

✅ **Resultado esperado:** Sem erros críticos

---

## 📊 **RESUMO DO TESTE**

### ✅ Funcionalidades Testadas
```
[ ] Instalação
[ ] Configuração
[ ] Dashboard
[ ] Captura de Lead
[ ] Busca
[ ] Estatísticas
[ ] Analytics
[ ] Exportação (CSV)
[ ] Exportação (JSON)
[ ] Notificações Toast
[ ] Stripe (opcional)
[ ] Responsividade
[ ] Performance
[ ] Console (sem erros)
```

---

## 🐛 **PROBLEMAS COMUNS E SOLUÇÕES**

### ❌ "Nenhuma aba ativa encontrada"
**Solução:** Certifique-se de estar em uma aba do navegador ativa

### ❌ "Abra um perfil do LinkedIn"
**Solução:** Visite um URL como `linkedin.com/in/username`

### ❌ Leads não aparecem
**Solução:** Clique em **🔄 Atualizar Dashboard**

### ❌ Configuração não salva
**Solução:** Verifique se o Chrome tem permissão para storage

### ❌ Toasts não aparecem
**Solução:** Recarregue a extensão em `chrome://extensions/`

---

## 🎯 **TESTE COMPLETO EM 5 MINUTOS**

1. ⏱️ **0:00-0:30** - Instalar extensão
2. ⏱️ **0:30-1:00** - Verificar configuração
3. ⏱️ **1:00-2:00** - Capturar 1 lead do LinkedIn
4. ⏱️ **2:00-3:00** - Testar busca e visualização
5. ⏱️ **3:00-4:00** - Verificar analytics
6. ⏱️ **4:00-5:00** - Exportar dados (CSV)

✅ **Se tudo funcionar, você tem uma extensão 100% operacional!**

---

## 📝 **CHECKLIST FINAL**

### Antes de Publicar/Vender
- [ ] Todos os testes passaram
- [ ] Nenhum erro no console
- [ ] Design está perfeito
- [ ] Todas as features funcionam
- [ ] Documentação está completa
- [ ] Chaves API estão configuradas
- [ ] Performance está ótima
- [ ] UX está fluida

---

## 🎉 **PARABÉNS!**

Se você marcou todos os itens, sua extensão **Oracle Validator Pro** está:

✅ **Funcional**
✅ **Profissional**
✅ **Pronta para uso**
✅ **Pronta para venda**

---

*Happy Testing! 🚀*
