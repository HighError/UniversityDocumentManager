import { getLoginSession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Document from '@/models/Document';
import User from '@/models/User';
import Year from '@/models/Year';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const requestMethod = req.method;
    if (requestMethod === 'GET') {
      const users = await User.find({});
      return res.status(200).json(users);
    }
    if (requestMethod === 'POST') {
      const session = await getLoginSession(req);
      if (!session) {
        return res.status(401).end();
      }
      const user = await User.findById(session.id);
      if (!user || !user.isAdmin) {
        return res.status(403).end();
      }
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).send('Missing params');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newYear = new User({ username, password: hashedPassword });

      await newYear.save();
      return res.status(200).send('');
    }
    if (requestMethod === 'DELETE') {
      const session = await getLoginSession(req);
      if (!session) {
        return res.status(401).end();
      }
      const user = await User.findById(session.id);
      if (!user || !user.isAdmin) {
        return res.status(403).end();
      }
      const { id } = req.body;
      if (!id) {
        return res.status(400).send('Missing params');
      }
      await User.findByIdAndDelete(id);
      await Document.deleteMany({ user: id });
      return res.status(200).send('');
    }
    return res.status(405).json('Only GET/POST/DELETE method allowed!');
  } catch (err) {
    return res.status(500).json(err);
  }
}
