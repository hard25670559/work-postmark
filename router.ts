import express, { Express, Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('⚡️Express + TypeScript Server');
});

type PostmarkParams = {
  /* Add something as needed */
  action?: number,
}
interface PostmarkBody {
  /* Add something as needed */
}
interface Resbody {
  /* Add something as needed */
}
interface PostmarkQuery {
  foo: string;
  bar: string;
  something?: string;
}
router.post('/postmark/:action?', (
  req: Request<PostmarkParams, PostmarkBody, Resbody, PostmarkQuery>,
  res: Response
) => {
  res.send(`⚡️:${req.params.action ?? "nothing"}`);
});


export default router;
