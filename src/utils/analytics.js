// Funções para calcular estatísticas e analytics

export function calculateStats(leads) {
  if (!leads || leads.length === 0) {
    return {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      chartData: []
    };
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const stats = {
    total: leads.length,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  };

  leads.forEach(lead => {
    const createdAt = new Date(lead.created_at);
    
    if (createdAt >= todayStart) {
      stats.today++;
    }
    
    if (createdAt >= weekStart) {
      stats.thisWeek++;
    }
    
    if (createdAt >= monthStart) {
      stats.thisMonth++;
    }
  });

  // Preparar dados para o gráfico (últimos 7 dias)
  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    
    const count = leads.filter(lead => {
      const createdAt = new Date(lead.created_at);
      return createdAt >= date && createdAt < nextDate;
    }).length;
    
    chartData.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      count
    });
  }

  stats.chartData = chartData;
  return stats;
}

export function filterLeads(leads, searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') {
    return leads;
  }

  const term = searchTerm.toLowerCase();
  return leads.filter(lead => {
    const name = (lead.full_name || '').toLowerCase();
    const headline = (lead.headline || '').toLowerCase();
    const email = (lead.user_email || '').toLowerCase();
    
    return name.includes(term) || headline.includes(term) || email.includes(term);
  });
}

export function sortLeads(leads, sortBy = 'date', order = 'desc') {
  const sorted = [...leads];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.created_at) - new Date(b.created_at);
        break;
      case 'name':
        comparison = (a.full_name || '').localeCompare(b.full_name || '');
        break;
      case 'headline':
        comparison = (a.headline || '').localeCompare(b.headline || '');
        break;
      default:
        comparison = 0;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
}
