import { JwtPayload } from 'jsonwebtoken';
import { Payload } from '../modules/auth/auth.type';

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}