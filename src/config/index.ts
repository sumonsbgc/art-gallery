const NEXT_URL = process.env.NEXT_URL;

const isNewHomeUI = process.env.NEXT_PUBLIC_NEW_HOME === 'true';

const BaseUrl =
  typeof window !== 'undefined' && window.location.origin ? window.location.origin : NEXT_URL;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URI;
const API_STAGE_URL = process.env.NEXT_PUBLIC_STAGE_API;

const API_URL = `${
  BaseUrl !== 'https://artgrade-front-dev.dev.spacecats.tech' ? API_STAGE_URL : API_BASE_URL
}/api/v1`;

// const API_URL = `${API_BASE_URL}/api/v1`;
const STRIPE_PUB_KEY = process.env.STRIPE_PUB_KEY;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export { BaseUrl, API_URL, STRIPE_PUB_KEY, API_STAGE_URL, PAYPAL_CLIENT_ID, isNewHomeUI };
