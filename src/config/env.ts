/**
 * Global environment config
 *
 * For Expo, any variable prefixed with EXPO_PUBLIC_ is automatically
 * exposed to the JS runtime. We read API_URL from there and fall back
 * to a sensible default for local/dev.
 */

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://meditrack.com/api';

export const ENV = {
  API_URL,
};

