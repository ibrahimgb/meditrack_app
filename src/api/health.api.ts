import api from './client';

export const healthCheck = async () => {
  return api.get('/health');
};
