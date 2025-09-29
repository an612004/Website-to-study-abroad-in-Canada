import fs from 'fs';
import { join } from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../../admin/auth';
import { POSTS_DIRECTORY } from '../../../../utils/Content';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { cookies } = req;
  const token = cookies.token ?? null;
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  if (!hasVerifiedToken) {
    return res.status(403).send({ error: 'Unauthorized' });
  }

  const { oldSlug, slug, name, description } = JSON.parse(req.body);

  try {
    const catOldPath = join(POSTS_DIRECTORY, oldSlug);
    let catPath = catOldPath;
    let catSlug = oldSlug;
    if (slug !== undefined && slug !== oldSlug) {
      const catNewPath = join(POSTS_DIRECTORY, slug);
      if (!fs.existsSync(catOldPath) || fs.existsSync(catNewPath))
        return res.status(500).json({ message: 'Slug existed' });

      fs.renameSync(catOldPath, catNewPath);
      catPath = catNewPath;
      catSlug = slug;
    }
    const info: { [key: string]: any } = JSON.parse(
      fs.readFileSync(join(catPath, '__info__.json'), 'utf8')
    );
    if (name !== undefined || description !== undefined) {
      fs.writeFileSync(
        join(catPath, '__info__.json'),
        JSON.stringify({
          name: name ?? info.name,
          description: description ?? info.description,
        })
      );
    }

    return res.status(200).json({
      message: 'Saved!',
      data: {
        slug: catSlug,
        name: name ?? info.name,
        description: description ?? info.description,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: 'Failed to fetch data' });
  }
}
