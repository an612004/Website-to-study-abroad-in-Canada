import fs from 'fs';
import { join } from 'path';

import ImageKit from 'imagekit';
import { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../admin/auth';
import { imageKitExtract } from '../../../utils/Common';
import { getPostBySlug, POSTS_DIRECTORY } from '../../../utils/Content';

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
  const { cookies } = req;
  const token = cookies.token ?? null;
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  // console.log('handler delete post');

  if (!hasVerifiedToken) {
    return res.status(403).send({ error: 'Unauthorized' });
  }
  const { slug } = JSON.parse(req.body);
  const post = getPostBySlug({ slug }, ['image'], false);
  if (post) {
    try {
      // console.log('handler delete post2');
      const path = post.category
        ? join(POSTS_DIRECTORY, post.category, `${slug}.md`)
        : join(POSTS_DIRECTORY, `${slug}.md`);
      fs.rmSync(path);
      // console.log('delete file compelte');
    } catch (e) {
      // console.log(e);
      return res.status(400).json({ error: 'Failed' });
    }
    try {
      const imageId = imageKitExtract(post.image).id ?? '';
      imageKit.deleteFile(imageId);
    } catch (e) {
      // console.log(e);
    }
    return res.status(200).json({ message: 'OK' });
  }
  return res.status(400).json({ error: 'Failed' });
};

export default handler;
