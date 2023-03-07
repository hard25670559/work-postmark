import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';


import router from './router';
import createWebsocketServer from './websocket';

dotenv.config();

const app: Express = express();
const port = 8199;

app.use('/', router);

const server = app.listen(port, () => {
  console.log(`👍[server]: Server is running at http://localhost:${port}`);
});

createWebsocketServer(server);
