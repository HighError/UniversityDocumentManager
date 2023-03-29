import Document, { IDocument } from '@/models/Document';
import mongoose, { isValidObjectId } from 'mongoose';
import Year, { IYear } from '@/models/Year';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import { getLoginSession } from '@/lib/auth';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';
import User from '@/models/User';
import GenerateDocx from '@/lib/generate';

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
    const { id } = req.query;
    if (!isValidObjectId(id)) {
      return res.status(400).send('Invalid ID');
    }
    const requestMethod = req.method;
    if (requestMethod === 'GET') {
      const document = await Document.findById(id).populate('year');
      if (!document) {
        return res.status(404).end();
      }
      const blob = await GenerateDocx(document.data, document.year.year);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      return res.status(200).end(blob);
    }
    return res.status(405).json('Only GET method allowed!');
  } catch (err) {
    return res.status(500).json(err);
  }
}
