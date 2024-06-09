import { User } from '@/lib/types';
import { z } from 'zod';
import { kv } from '@vercel/kv';
import { ResultCode } from '@/lib/utils';

export async function getUser(email: string) {
  const user = await kv.hgetall<User>(`user:${email}`);
  return user;
}

interface Result {
  type: string;
  resultCode: ResultCode;
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse({
        email,
        password,
      });

    if (parsedCredentials.success) {
      const user = await getUser(parsedCredentials.data.email);
      if (user && user.password === parsedCredentials.data.password) {
        // Simulate a successful login without redirect
        return {
          type: 'success',
          resultCode: ResultCode.UserLoggedIn,
        };
      } else {
        return {
          type: 'error',
          resultCode: ResultCode.InvalidCredentials,
        };
      }
    } else {
      return {
        type: 'error',
        resultCode: ResultCode.InvalidCredentials,
      };
    }
  } catch (error) {
    return {
      type: 'error',
      resultCode: ResultCode.UnknownError,
    };
  }
}
