import { CorsOptions } from 'cors';

interface Config {
  port: number;
  appId: string;
  baseUrl: string;
  appSecret: string;
  apiBaseUrl: string;
  corsConfig: CorsOptions;
  requestLogFormat: string;
}

const config: Config = {
  requestLogFormat: 'tiny',
  appId: process.env.APP_ID || '',
  baseUrl: process.env.BASE_URL || '',
  appSecret: process.env.APP_SECRET || '',
  apiBaseUrl: process.env.API_BASE_URL || '',
  port: +(process.env?.PORT || 3000),
  corsConfig: {
    origin: new RegExp(process.env.APP_BASE_URL || ''),
  },
};

export default config;
