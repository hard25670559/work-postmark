import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import createRouter from './router';
import createWebsocketServer from './websocket';
import createJsonServer from './jsonServerRouter';

dotenv.config();

const app: Express = express();
const port = 8199;

const server = app.listen(port, () => {
  console.log(`👍[server]: Server is running at http://localhost:${port}`);
});

const wsServer = createWebsocketServer(server);
const router = createRouter(wsServer);
const jsonServer = createJsonServer(wsServer);

app.use('/', router);
app.use('/api', jsonServer);
