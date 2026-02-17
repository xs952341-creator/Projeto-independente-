// Funções para exportar dados

export function exportToCSV(leads, filename = 'leads.csv') {
  if (!leads || leads.length === 0) {
    throw new Error('Nenhum lead para exportar.');
  }

  // Cabeçalhos do CSV
  const headers = [
    'Data de Captura',
    'Nome Completo',
    'Cargo/Headline',
    'URL LinkedIn',
    'Mensagem Gerada (IA)',
    'E-mail do Usuário',
    'Status'
  ];

  // Converter leads para linhas CSV
  const rows = leads.map(lead => {
    const date = new Date(lead.created_at).toLocaleString('pt-BR');
    const name = (lead.full_name || '').replace(/"/g, '""');
    const headline = (lead.headline || '').replace(/"/g, '""');
    const url = lead.linkedin_url || '';
    const message = (lead.ai_generated_message || '').replace(/"/g, '""').replace(/\n/g, ' ');
    const email = lead.user_email || '';
    const status = lead.status || 'pending';

    return [
      `"${date}"`,
      `"${name}"`,
      `"${headline}"`,
      `"${url}"`,
      `"${message}"`,
      `"${email}"`,
      `"${status}"`
    ].join(',');
  });

  // Montar CSV completo
  const csv = [headers.join(','), ...rows].join('\n');

  // Criar blob e fazer download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function exportToJSON(leads, filename = 'leads.json') {
  if (!leads || leads.length === 0) {
    throw new Error('Nenhum lead para exportar.');
  }

  const json = JSON.stringify(leads, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
