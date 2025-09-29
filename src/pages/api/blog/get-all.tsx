import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../admin/auth';
import { getAllPosts } from '../../../utils/Content';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET')
      return res.status(500).send({ error: 'Unsuported method', data: [] });

    const { cookies } = req;
    const token = cookies.token ?? null;
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    if (!hasVerifiedToken)
      return res.status(403).send({ error: 'Unauthorized', data: [] });

    const posts = getAllPosts(
      ['slug', 'title', 'date', 'modified_date', 'status'],
      false
    );
    // console.log(posts);
    return res.status(200).json({ success: true, data: posts });
  } catch (err) {
    return res.status(500).send({ error: 'Failed to fetch data', data: [] });
  }
}
