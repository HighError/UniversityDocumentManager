import dbConnect from '@/lib/dbconnect';
import Document from '@/models/Document';
import Year from '@/models/Year';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
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
      const { title, year } = req.body;
      if (!title || !year) {
        return res.status(400).send('Missing params');
      }

      const newYear = new Year({ title, year: Number(year) });

      await newYear.save();
      return res.status(200).send('');
    }
    if (requestMethod === 'DELETE') {
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
