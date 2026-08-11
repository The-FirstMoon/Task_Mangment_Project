
import { Payload } from '../features/auth/auth.type';

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}