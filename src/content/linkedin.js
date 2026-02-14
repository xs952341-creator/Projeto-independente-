function extractLinkedInData() {
  const fullName =
    document.querySelector('h1.text-heading-xlarge')?.textContent?.trim() ||
    document.querySelector('h1')?.textContent?.trim() ||
    'Nome não encontrado';

  const headline =
    document.querySelector('.text-body-medium.break-words')?.textContent?.trim() ||
    'Cargo não encontrado';

  return {
    full_name: fullName,
    headline,
    linkedin_url: window.location.href
  };
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request?.action === 'extractLinkedInData') {
    sendResponse({ success: true, data: extractLinkedInData() });
  }

  return true;
});
