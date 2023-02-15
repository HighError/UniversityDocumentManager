import dbConnect from '@/lib/dbconnect';
import Document from '@/models/Document';
import mongoose from 'mongoose';
import Year, { IYear } from '@/models/Year';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const requestMethod = req.method;
    if (requestMethod === 'GET') {
      const documents = await Document.find({}).populate('year');
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

      const year: IYear | null = await Year.findById(yearID);

      if (!year) {
        return res.status(400).send('Missing Year');
      }

      const newDocument = new Document({ title, year });

      await newDocument.save();

      return res.status(200).send('');
    }
    return res.status(405).json('Only GET/POST/DELETE method allowed!');
  } catch (err) {
    return res.status(500).json(err);
  }
}
