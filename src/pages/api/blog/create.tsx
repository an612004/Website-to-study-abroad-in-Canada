import fs from 'fs';
import { join } from 'path';

import formidable, { IncomingForm } from 'formidable';
import ImageKit from 'imagekit';
import { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';

import { verifyJwtToken } from '../../../admin/auth';
import {
  getCurrentDateString,
  getCurrentDateTimeString,
  imageKitCombine,
} from '../../../utils/Common';
import {
  getAllCategoryIds,
  getPostBySlug,
  POSTS_DIRECTORY,
} from '../../../utils/Content';

const TEMP_UPLOAD_IMAGE_DIRECTORY = join(process.cwd(), '_data/temp');

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveImage = async (imageFile: formidable.File) => {
  try {
    const buffer = fs.readFileSync(imageFile.filepath);
    const response = await imageKit.upload({
      file: buffer,
      fileName: imageFile.originalFilename ?? imageFile.newFilename,
    });
    const str = imageKitCombine(
      response.fileId,
      `${process.env.IMAGEKIT_URL_ENDPOINT}${response.filePath}`
    );
    fs.rmSync(imageFile.filepath);
    return str;
  } catch {
    return null;
  }
};
function createPost(
  fields: formidable.Fields<string>,
  category: string,
  preSlug: string,
  thumbnailPath: string
) {
  const title = fields.title ? fields.title[0] : '';
  const description = fields.description ? fields.description[0] : '';
  const content = fields.content ? fields.content[0] : '';
  const status = fields.status ? fields.status[0] : '0';

  const dateStr = getCurrentDateString();
  const date = getCurrentDateTimeString();
  const modifiedDate = date;
  const fullSlug = `${preSlug}-${slugify(`${dateStr}`)}`;
  const createdFile = `${fullSlug}.md`;

  const fullBlogData = `---
title: '${title}'
description: '${description}'
date: ${date}
modified_date: ${modifiedDate}
image: ${thumbnailPath}
status: ${status}
---

  ${content}`;
  const catIds = getAllCategoryIds();
  const path = catIds.includes(category)
    ? join(POSTS_DIRECTORY, category, createdFile)
    : join(POSTS_DIRECTORY, createdFile);
  fs.writeFileSync(path, fullBlogData);

  return fullSlug;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const form = new IncomingForm({
    uploadDir: TEMP_UPLOAD_IMAGE_DIRECTORY,
    keepExtensions: true,
  });

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        // console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }
      // console.log(fields);
      const imageFile = Array.isArray(files?.image)
        ? files.image[0]
        : files?.image;
      const post = getPostBySlug({ slug: fields.slug ? fields.slug[0] : '' });
      if (post) return res.status(400).json({ error: 'Unacceptable' });

      // console.log(post);
      const title = fields.title ? fields.title[0] : '';
      const category = fields.category ? fields.category[0] : '';
      const preSlug = slugify(title, {
        strict: true,
        lower: true,
        trim: true,
        locale: 'vi',
      });
      const isValidSlug = preSlug.length >= 16;
      if (!isValidSlug) return res.status(400).json({ error: 'Unacceptable' });

      const imagePath = imageFile ? (await saveImage(imageFile)) ?? '' : '';
      const fullSlug = createPost(fields, category, preSlug, imagePath);

      if (fullSlug.length > preSlug.length)
        return res.status(200).json({ message: 'OK', slug: fullSlug });
      return res.status(400).json({ error: 'Unacceptable' });
    });
    return false;
  } catch {
    return res.status(500).send({ error: 'Failed to fetch data' });
  }
};

export default handler;
