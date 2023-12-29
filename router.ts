import { Server as WebSocketServer } from 'ws';

import express, { Express, Request, Response } from 'express';
import { join } from 'path';

export default function(wsServer: WebSocketServer) {
  const router = express.Router();

  router.get('/', (req: Request, res: Response) => {
    const path = join(__dirname, './public/index.html');
    res.sendFile(path);
  });

  router.get('/test', (req: Request, res: Response) => res.send('gg'))

  return router;
}
