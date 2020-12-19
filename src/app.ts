import cors from 'cors';
import morgan from 'morgan';
import { RequestOptions } from 'http';
import proxy from 'express-http-proxy';
import Debug, { Debugger } from 'debug';
import express, { Application, Request, Response } from 'express';

import config from './config';

const debug: Debugger = Debug('threedify:proxy');

const app: Application = express();

app.use(morgan(config.requestLogFormat));

app.use(cors(config.corsConfig));

app.use(
  proxy(config.apiBaseUrl, {
    parseReqBody: false,
    filter: (req: Request, res: Response) => {
      return new Promise((resolve) => {
        debug('Check if cors passes... %s: %s', req.method, req.url);
        resolve(res.hasHeader('access-control-allow-origin'));
      });
    },
    proxyReqOptDecorator: (proxyReqOpts: RequestOptions, srcReq: Request) => {
      if (proxyReqOpts.headers) {
        proxyReqOpts.headers['x-threedify-app-id'] = config.appId;
        proxyReqOpts.headers['x-threedify-app-secret'] = config.appSecret;
      }
      return proxyReqOpts;
    },
    limit: '6mb',
  })
);

export default app;
