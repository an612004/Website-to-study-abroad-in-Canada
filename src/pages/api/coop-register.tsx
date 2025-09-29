import { SMTPClient } from 'emailjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getCurrentDateTimeString } from '../../utils/Common';
import { getDataConfig } from '../../utils/Content';

const sendEmail = async (
  name: string,
  email: string,
  subject: string,
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
      text: `Thông tin đăng ký:\n  + Tên Công Ty: ${name}\n  + Email liên hệ: ${email}\n  + Chủ đề: ${subject}\n  + Chi tiết: ${message}\n\nLúc: ${timeStr}\nSite: ${senderSite}`,
      from: process.env.EMAIL_ADDRESS!,
      to: 'contact@tn7.vn',
      // to: 'ngthquoczinh@gmail.com',
      subject: `[${senderName}] Thông báo có đăng ký hợp tác mới lúc ${timeStr}`,
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
  const { name, email, subject, message } = JSON.parse(req.body);
  try {
    if (req.method === 'POST') {
      const timeStr = getCurrentDateTimeString();
      const sendOk = await sendEmail(name, email, subject, message, timeStr);

      if (sendOk) res.status(200).json({ result: 'Complete' });
      else res.status(500).json({ result: 'Failed' });
    } else res.status(500).send({ error: 'Unsuported method' });
  } catch (err) {
    // console.log(err);
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}
