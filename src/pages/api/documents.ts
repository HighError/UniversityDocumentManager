import Document from '@/models/Document';
import mongoose from 'mongoose';
import Year, { IYear } from '@/models/Year';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import { getLoginSession } from '@/lib/auth';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import User from '@/models/User';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const session = await getLoginSession(req);
    if (!session || !session.id) {
      return res.status(401).end();
    }
    const requestMethod = req.method;
    if (requestMethod === 'GET') {
      const documents = await Document.find({})
        .populate('year')
        .populate('user');
      return res.status(200).json(documents);
    }
    if (requestMethod === 'POST') {
      const { title, yearID } = req.body;
      if (!title || !yearID) {
        return res.status(400).send('Missing params');
      }
      if (!mongoose.isValidObjectId(yearID)) {
        return res.status(400).send('Invalid ID');
      }

      const year = await Year.findById(yearID);
      const user = await User.findById(session.id);

      if (!year) {
        return res.status(400).send('Missing Year');
      }

      const newDocument = new Document({ title, year, user });

      await newDocument.save();

      return res.status(200).send('');
    }
    return res.status(405).json('Only GET/POST/DELETE method allowed!');
  } catch (err) {
    return res.status(500).json(err);
  }
}
