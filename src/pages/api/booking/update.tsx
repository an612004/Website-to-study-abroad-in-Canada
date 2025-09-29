import fs from 'fs';
import { join } from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../admin/auth';

const loadBooking = (id: string): IBookingItem | null => {
  const fullPath = join('_data/booking/', `${id}.json`);
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (err) {
    return null;
  }
};

const saveBooking = (id: string, data: string) => {
  fs.writeFileSync(join('_data/booking/', `${id}.json`), data);
};

const setBookingStatusById = (booking_id: string, value: boolean) => {
  const bookingData = loadBooking(booking_id);
  if (bookingData) {
    bookingData.resolved = value;
    saveBooking(booking_id, JSON.stringify(bookingData));
    return true;
  }
  return false;
};

export interface IBookingItem {
  name: string;
  phone: string;
  email: string;
  date: string;
  resolved: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { cookies } = req;
      const token = cookies.token ?? null;
      const hasVerifiedToken = token && (await verifyJwtToken(token));
      // console.log("hasVerifiedToken",hasVerifiedToken);
      if (hasVerifiedToken) {
        const { bookingId, status } = JSON.parse(req.body);
        const done = setBookingStatusById(bookingId, status);
        res.status(200).json({ success: done });
      } else res.status(403).send({ error: 'Unauthorized' });
    } else res.status(500).send({ error: 'Unsuported method' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}
