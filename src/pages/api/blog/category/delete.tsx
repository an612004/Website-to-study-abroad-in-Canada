import fs from 'fs';
import { join } from 'path';

import ImageKit from 'imagekit';
import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../../admin/auth';
import { imageKitExtract } from '../../../../utils/Common';
import { getPostsByCategory, POSTS_DIRECTORY } from '../../../../utils/Content';

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, keepFiles } = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { cookies } = req;
  const token = cookies.token ?? null;
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  if (!hasVerifiedToken) return res.status(403).send({ error: 'Unauthorized' });

  try {
    const catPath = join(POSTS_DIRECTORY, slug);
    if (!fs.existsSync(catPath))
      // category not exist
      return res.status(500).json({ message: 'Slug existed' });
    // console.log('catPath', catPath);
    if (keepFiles) {
      const files = fs.readdirSync(catPath, { withFileTypes: true });
      files.forEach((f) => {
        if (f.isFile() && f.name.endsWith('md'))
          fs.renameSync(join(catPath, f.name), join(POSTS_DIRECTORY, f.name));
      });
    } else {
      const posts = getPostsByCategory(slug, ['image'], false);
      posts.forEach((p) => {
        try {
          const imageId = imageKitExtract(p.image).id ?? '';
          imageKit.deleteFile(imageId);
        } catch (e) {
          // console.log(e);
        }
      });
    }

    fs.rmdirSync(catPath, { recursive: true });
    return res.status(200).json({ messazge: 'Done' });
  } catch (err) {
    return res.status(500).send({ message: `Failed to fetch data: ${err}` });
  }
}
