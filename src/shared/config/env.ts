export const API_NINJAS_KEY = import.meta.env.VITE_API_NINJAS_KEY ?? '';

if (!API_NINJAS_KEY) {
  console.warn(
    '[env] VITE_API_NINJAS_KEY is not set. ' +
    'The app will use predefined users instead of the API. ' +
    'Add it to .env to enable real random user fetching.'
  );
}
