import { removeTokenCookie } from '@/lib/auth-cookies';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import { NextApiResponse } from 'next';

export default async function logout(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' });
  res.end();
}
