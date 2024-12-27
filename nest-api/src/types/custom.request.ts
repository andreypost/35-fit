import { Request } from 'express';

export interface CustomRequest extends Request {
  cookies: Record<string, string>;
  userEmail?: string;
}
