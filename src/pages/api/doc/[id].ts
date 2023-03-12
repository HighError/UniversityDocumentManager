import Document from '@/models/Document';
import mongoose, { isValidObjectId } from 'mongoose';
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
    const { id } = req.query;
    if (!session || !session.id) {
      return res.status(401).end();
    }
    if (!isValidObjectId(id)) {
      return res.status(400).send('Invalid ID');
    }
    const requestMethod = req.method;
    if (requestMethod === 'GET') {
      const document = await Document.findById(id);
      if (session.id !== document.user.toString()) {
        return res.status(403).end();
      }
      return res.status(200).json(document);
    }
    if (requestMethod === 'POST') {
      const { data } = req.body;
      if (!data) {
        res.status(400).end();
      }

      const document = await Document.findById(id);
      if (session.id !== document.user.toString()) {
        return res.status(403).end();
      }
      document.data = { ...document.data, ...data };
      await document.save();
      return res.status(200).end();
    }
    return res.status(405).json('Only GET/POST method allowed!');
  } catch (err) {
    return res.status(500).json(err);
  }
}
