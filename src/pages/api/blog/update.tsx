import fs from 'fs';
import { join } from 'path';

import formidable, { IncomingForm } from 'formidable';
import ImageKit from 'imagekit';
import { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../admin/auth';
import {
  getCurrentDateTimeString,
  imageKitCombine,
  imageKitExtract,
} from '../../../utils/Common';
import {
  getAllCategoryIds,
  getPostBySlug,
  PostItems,
} from '../../../utils/Content';

const BLOG_DIRECTORY = join(process.cwd(), '_data/posts');
const BLOG_IMAGE_DIRECTORY = join(process.cwd(), '_data/temp');

export const config = {
  api: {
    bodyParser: false,
  },
};

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

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

const changeImage = async (
  imageFile: formidable.File,
  oldImage: {
    id: string;
    url: string;
  }
) => {
  const newFileStr = await saveImage(imageFile);
  if (newFileStr != null) {
    // console.log('delete', oldImage.id);
    try {
      imageKit.deleteFile(oldImage.id);
    } catch (err) {
      // console.log(err);
    }
    return newFileStr;
  }
  return imageKitCombine(oldImage.id, oldImage.url);
};

function savePost(
  category: string | undefined,
  slug: string,
  fields: formidable.Fields<string>,
  post: PostItems,
  imageStr: string
) {
  // console.log('category', category);
  const title = fields.title ? fields.title[0] : post.title;
  const description = fields.description
    ? fields.description[0]
    : post.description;
  const content = fields.content ? fields.content[0] : post.content;
  const status = fields.status ? fields.status[0] : post.status;
  const { date } = post;
  const modifiedDate = getCurrentDateTimeString();

  const fullBlogData = `---
title: "${title}"
description: "${description}"
date: ${date}
modified_date: ${modifiedDate}
image: ${imageStr}
status: ${status}
---
${content}`;

  const file = `${slug}.md`;
  const path = category
    ? join(BLOG_DIRECTORY, category, file)
    : join(BLOG_DIRECTORY, file);
  fs.writeFileSync(path, fullBlogData);

  return true;
}

const postFieldsGet = [
  'title',
  'description',
  'date',
  'modified_date',
  'image',
  'content',
  'status',
  'slug',
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { cookies } = req;
  const token = cookies.token ?? null;
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  if (!hasVerifiedToken) return res.status(403).send({ error: 'Unauthorized' });

  const form = new IncomingForm({
    uploadDir: BLOG_IMAGE_DIRECTORY,
    keepExtensions: true,
  });

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        // console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }
      // console.log(fields)
      const imageFile = Array.isArray(files?.image)
        ? files.image[0]
        : files?.image;
      const slug = fields.slug ? fields.slug[0] : '';
      let category = fields.category ? fields.category[0] : undefined;

      const post = getPostBySlug({ slug }, postFieldsGet, false);

      if (!post) return res.status(400).json({ error: 'Unacceptable' });

      const catIds = getAllCategoryIds();
      const catChanged =
        category !== undefined &&
        category !== null &&
        category !== post.category;

      if (catChanged) {
        const validCat = catIds.includes(category ?? '');
        if (!validCat) category = undefined;

        const postFile = `${slug}.md`;
        const oldPath = post.category
          ? join(BLOG_DIRECTORY, post.category, postFile)
          : join(BLOG_DIRECTORY, postFile);
        const newPath = category
          ? join(BLOG_DIRECTORY, category, postFile)
          : join(BLOG_DIRECTORY, postFile);
        fs.renameSync(oldPath, newPath);
        if (category) post.category = category; // update
        else delete post.category;
      }

      const oldImage = imageKitExtract(post.image);
      const imageStr = imageFile
        ? await changeImage(imageFile, oldImage)
        : post.image;

      const status = savePost(post.category, slug, fields, post, imageStr);
      if (status) return res.status(200).json({ message: 'OK' });
      return res.status(400).json({ error: 'Unacceptable' });
    });
    return false;
  } catch {
    return res.status(400).json({ error: 'Failed' });
  }
};

export default handler;
