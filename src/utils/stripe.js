export async function openStripePayment({ paymentLink }) {
  if (!paymentLink) {
    throw new Error('STRIPE_PAYMENT_LINK não configurado.');
  }

  await chrome.tabs.create({ url: paymentLink });
}

export async function openStripeCheckoutWithPrice({ publishableKey, priceId, customerEmail }) {
  if (!publishableKey || !priceId) {
    throw new Error('Para checkout direto, configure STRIPE_PUBLISHABLE_KEY e STRIPE_PRICE_ID.');
  }

  if (!window.Stripe) {
    throw new Error('Stripe.js não carregado no popup.');
  }

  const stripe = window.Stripe(publishableKey);

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    customerEmail: customerEmail || undefined,
    successUrl: 'https://example.com/success',
    cancelUrl: 'https://example.com/cancel'
  });

  if (error) {
    throw new Error(error.message || 'Falha ao redirecionar para checkout Stripe.');
  }
}
