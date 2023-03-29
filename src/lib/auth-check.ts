import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import { getLoginSession } from './auth';
import dbConnect from './db';

export default async function verifyAuth(
  req: NextApiRequestWithSession
): Promise<string | null> {
  await dbConnect();
  const session = await getLoginSession(req);
  if (!session || !session.id) {
    return null;
  }
  return session;
}
