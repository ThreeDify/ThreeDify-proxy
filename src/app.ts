import cors from 'cors';
import morgan from 'morgan';
import proxy from 'express-http-proxy';
import Debug, { Debugger } from 'debug';
import express, { Application } from 'express';

import config from './config';

const debug: Debugger = Debug('threedify:proxy');

const app: Application = express();

app.use(morgan(config.requestLogFormat));

app.use(cors(config.corsConfig));

app.use(
  proxy(config.apiBaseUrl, {
    parseReqBody: false,
    filter: (req, res) => {
      return new Promise((resolve) => {
        debug('Check if cors passes... %s: %s', req.method, req.url);
        resolve(res.hasHeader('access-control-allow-origin'));
      });
    },
    limit: '6mb',
  })
);

export default app;
