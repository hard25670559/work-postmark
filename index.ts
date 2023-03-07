import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';


import createRouter from './router';
import createWebsocketServer from './websocket';

dotenv.config();

const app: Express = express();
const port = 8199;

const server = app.listen(port, () => {
  console.log(`👍[server]: Server is running at http://localhost:${port}`);
});

const httpServer = createWebsocketServer(server);
const router = createRouter(httpServer);
app.use('/', router);
