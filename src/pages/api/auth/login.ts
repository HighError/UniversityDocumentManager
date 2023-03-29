import passport from 'passport';
import nextConnect from 'next-connect';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import { NextApiResponse } from 'next';
import { localStrategy } from '@/lib/passport-local';
import { setLoginSession } from '@/lib/auth';

const authenticate = (
  method: string,
  req: NextApiRequestWithSession,
  res: NextApiResponse
): Promise<any> =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      method,
      { session: false },
      (error: any, token: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    )(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      const user = await authenticate('local', req, res);
      if (!user) {
        res.status(401).end();
      }
      const session = { ...user };

      await setLoginSession(res, session);

      res.status(200).send({ done: true });
    } catch (error) {
      res.status(401).send(error);
    }
  });
