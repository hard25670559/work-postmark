import { Server as WebSocketServer } from 'ws';
import express, { Express, Request, Response } from 'express';
import { join } from 'path';


export default function(wsServer: WebSocketServer) {
  const router = express.Router();

  router.get('/', (req: Request, res: Response) => {
    const path = join(__dirname, './public/index.html');
    res.sendFile(path);
  });

  type PostmarkParams = {
    /* Add something as needed */
    action?: number,
  }
  interface PostmarkBody {
    action?: string,
    /* Add something as needed */
  }
  interface Resbody {
    action?: string,
    /* Add something as needed */
  }
  interface PostmarkQuery {
    foo: string;
    bar: string;
    something?: string;
  }
  router.post(
    '/postmark',
    express.json({type: '*/*'}),
    (
      req: Request<PostmarkParams, PostmarkBody, Resbody, PostmarkQuery>,
      res: Response
    ) => {
      const message = `⚡️${req.body.action ?? 'Do something'} at ${new Date().toISOString()}`;
      console.log(message);
      wsServer.clients.forEach(client => client.send(message))
      res.send(message);
    }
  );

  return router;
}
