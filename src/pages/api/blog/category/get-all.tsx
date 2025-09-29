import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../../admin/auth';
import { getAllCategories } from '../../../../utils/Content';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET')
      return res.status(500).send({ message: 'Unsuported method', data: [] });

    const { cookies } = req;
    const token = cookies.token ?? null;
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    if (!hasVerifiedToken) {
      return res.status(403).send({ error: 'Unauthorized' });
    }
    const catsInfo = getAllCategories();
    return res.status(200).json({ data: catsInfo });
  } catch (err) {
    return res.status(500).send({ message: 'Failed to fetch data', data: [] });
  }
}
