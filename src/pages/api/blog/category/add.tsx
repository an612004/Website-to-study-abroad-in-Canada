import fs from 'fs';
import { join } from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../../admin/auth';

const blogDirectory = join(process.cwd(), '_data/posts');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, name, description } = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { cookies } = req;
  const token = cookies.token ?? null;
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  if (!hasVerifiedToken) return res.status(403).send({ error: 'Unauthorized' });

  try {
    const catPath = join(blogDirectory, slug);
    if (fs.existsSync(catPath))
      return res.status(500).json({ message: 'Slug existed' });

    fs.mkdirSync(catPath);

    fs.writeFileSync(
      join(blogDirectory, slug, '__info__.json'),
      JSON.stringify({ name, description })
    );

    return res
      .status(200)
      .json({ message: 'Created', data: { slug, name, description } });
  } catch (err) {
    return res.status(500).send({ message: 'Failed' });
  }
}
