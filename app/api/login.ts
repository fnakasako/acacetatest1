import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  const user = await kv.hgetall(`user:${email}`);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const { salt, password: storedPassword } = user;
  const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');

  if (hashedPassword === storedPassword) {
    // Set a session cookie or token here if needed
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
