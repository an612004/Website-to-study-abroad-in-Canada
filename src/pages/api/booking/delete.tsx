import fs from 'fs';
import path, { join } from 'path';

import { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../admin/auth';

const BOOKING_DIRECTORY = path.join(process.cwd(), '_data/booking/');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { cookies } = req;
    const token = cookies.token ?? null;
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    // console.log('handler');

    if (!hasVerifiedToken) {
      res.status(403).send({ error: 'Unauthorized' });
      return;
    }
    const { id } = JSON.parse(req.body);
    try {
      // console.log(id);
      fs.rmSync(join(BOOKING_DIRECTORY, `${id}.json`));
      res.status(200).json({ success: true, message: 'OK' });
    } catch {
      res.status(400).json({ error: 'Failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default handler;
