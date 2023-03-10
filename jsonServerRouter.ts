import * as jsonServer from 'json-server';
import { Server as WebSocketServer } from 'ws';
import { Request, Response } from 'express';
import { ActionValidate } from './validate';

export default function(wsServer: WebSocketServer) {
  const server = jsonServer.create();
  const router = jsonServer.router('db.json');
  const middlewares = jsonServer.defaults();

  // Set default middlewares (logger, static, cors and no-cache)
  server.use(middlewares);

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
  server.use(jsonServer.bodyParser);
  server.post('/postmarks', (
    req: Request<PostmarkParams, PostmarkBody, Resbody, PostmarkQuery>,
    res: Response,
    next
  ) => {

    console.log(req.body);
    const { error, messages: errorMessages } = ActionValidate(req.body);

    if (error && errorMessages && errorMessages.length) {
      res
        .status(400)
        .send(errorMessages);
    }

    const message = `⚡️${req.body.action ? req.body.action : 'Do something'} at ${new Date().toISOString()}`;
    wsServer.clients.forEach(client => client.send(message));

    next();
  })
  // Use default router
  server.use(router);
  return server;
};
