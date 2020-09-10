import { create } from 'axios';

import config from '~/config';

const api = create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  responseType: 'json',
  timeout: 30000,
});

export default api;
