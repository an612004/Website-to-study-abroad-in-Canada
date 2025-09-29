import fs from 'fs';
import { join } from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../admin/auth';

const settingFile = join(process.cwd(), '_data/config.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { cookies } = req;
      const token = cookies.token ?? null;
      const hasVerifiedToken = token && (await verifyJwtToken(token));
      if (hasVerifiedToken) {
        const configData = fs.readFileSync(settingFile, 'utf8');
        const cfgDict = JSON.parse(configData);
        res.status(200).json({ success: true, data: cfgDict });
      } else res.status(403).send({ error: 'Unauthorized' });
    } else res.status(500).send({ error: 'Unsuported method' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}
