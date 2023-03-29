import { getLoginSession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import { NextApiResponse } from 'next';

export default async function user(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const session = await getLoginSession(req);
    if (!session || !session.id) {
      return res.status(401).end();
    }
    const user = await User.findById(session.id);

    if (!user) {
      return res.status(401).end();
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
