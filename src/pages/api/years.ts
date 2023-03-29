import { getLoginSession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Document from '@/models/Document';
import User from '@/models/User';
import Year from '@/models/Year';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const requestMethod = req.method;
    if (requestMethod === 'GET') {
      const years = await Year.find({});
      return res.status(200).json(years);
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
      const { title, year } = req.body;
      if (!title || !year) {
        return res.status(400).send('Missing params');
      }

      const newYear = new Year({ title, year: Number(year) });

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
      await Year.findByIdAndDelete(id);
      await Document.deleteMany({ year: id });
      return res.status(200).send('');
    }
    return res.status(405).json('Only GET/POST/DELETE method allowed!');
  } catch (err) {
    return res.status(500).json(err);
  }
}
