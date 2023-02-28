import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import { NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';

export default async function signup(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Missing params');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error);
  }
}
