import fs from 'fs';
import { join } from 'path';

import { SMTPClient } from 'emailjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';

import { getCurrentDateTimeString } from '../../../utils/Common';
import { getDataConfig } from '../../../utils/Content';

const bookingsDirectory = join(process.cwd(), '_data/booking');

const handleFormInputAsync = async (
  name: string,
  phone: string,
  email: string,
  timeStr: string,
  mailSent: boolean
) => {
  // const files = fs.readdirSync(postsDirectory);
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  try {
    const createdFile = `${slugify(name)}_${slugify(phone, {
      strict: true,
    })}_${slugify(timeStr, { strict: true })}.json`;
    fs.writeFileSync(
      join(bookingsDirectory, createdFile),
      JSON.stringify({ name, phone, email, time: timeStr, mailSent })
    );
    return true;
  } catch (error) {
    return false;
  }
};

const sendEmail = async (
  name: string,
  phone: string,
  email: string,
  message: string,
  timeStr: string
) => {
  const client = new SMTPClient({
    user: process.env.EMAIL_ADDRESS,
    password: process.env.EMAIL_PASSWORD,
    host: 'smtp.gmail.com',
    ssl: false,
    tls: true,
    // port: 587,
  });

  let senderName = '';
  let senderSite = '';
  try {
    const config = getDataConfig();
    senderName = config.seo.author;
    senderSite = config.seo.url;
  } catch {
    senderName = 'TN7Solutions';
    senderSite = 'https://tn7solutions.com';
  }

  try {
    await client.sendAsync({
      text: `Thông tin đăng ký:\n  + Tên: ${name}\n  + Email: ${email}\n  + Điện thoại: ${phone}\n  + Nội dung: ${message}\n\nLúc: ${timeStr}\nSite: ${senderSite}`,
      from: process.env.EMAIL_ADDRESS!,
      to: 'contact@tn7.vn',
      // to: 'ngthquoczinh@gmail.com',
      subject: `[${senderName}] Thông báo khách hàng đăng ký tư vấn lúc ${timeStr}`,
    });
    return true;
  } catch (e) {
    // console.log('Email send:', e);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, phone, email, message } = JSON.parse(req.body);
  try {
    if (req.method === 'POST') {
      const timeStr = getCurrentDateTimeString();
      const sendOk = await sendEmail(name, phone, email, message, timeStr);
      const saveOk = await handleFormInputAsync(
        name,
        phone,
        email,
        timeStr,
        sendOk
      );

      if (saveOk) res.status(200).json({ result: 'Complete' });
      else res.status(500).json({ result: 'Failed' });
    } else res.status(500).send({ error: 'Unsuported method' });
  } catch (err) {
    // console.log(err);
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}
