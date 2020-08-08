import { CorsOptions } from 'cors';

interface Config {
  port: number;
  baseUrl: string;
  apiBaseUrl: string;
  corsConfig: CorsOptions;
  requestLogFormat: string;
}

const config: Config = {
  requestLogFormat: 'tiny',
  baseUrl: process.env.BASE_URL || '',
  apiBaseUrl: process.env.API_BASE_URL || '',
  port: +(process.env?.PORT || 3000),
  corsConfig: {
    origin: new RegExp(process.env.APP_BASE_URL || ''),
  },
};

export default config;
