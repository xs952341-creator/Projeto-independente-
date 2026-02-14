const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export async function generateLeadMessageWithGemini({ apiKey, model, lead }) {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada.');
  }

  const targetModel = model || 'gemini-1.5-flash';
  const endpoint = `${GEMINI_BASE_URL}/${encodeURIComponent(targetModel)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const prompt = [
    'Você é um assistente comercial B2B.',
    'Crie uma mensagem curta de primeiro contato no LinkedIn em português.',
    `Nome: ${lead.full_name}`,
    `Cargo/Headline: ${lead.headline}`,
    `URL: ${lead.linkedin_url}`,
    'Tom: profissional, amigável e objetivo.',
    'Sem emojis e sem exageros.',
    'Retorne apenas a mensagem final.'
  ].join('\n');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha Gemini (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text)
      .filter(Boolean)
      .join('\n') || '';

  if (!text) {
    throw new Error('Gemini não retornou texto para a mensagem.');
  }

  return text.trim();
}
