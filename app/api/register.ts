import { kv } from '@vercel/kv';
import { z } from 'zod';
import crypto from 'crypto';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const { email, password } = parsed.data;
  const existingUser = await kv.hgetall(`user:${email}`);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');

  await kv.hmset(`user:${email}`, { email, password: hashedPassword, salt });

  res.status(201).json({ message: 'User created' });
}
