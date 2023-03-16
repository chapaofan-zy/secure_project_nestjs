import { verifyJWT } from 'src/utils/jwt';

export function JwtMiddleware(req: any, res: any, next: () => void) {
  if (verifyJWT(req) || req.url === '/api/users/login') {
    next();
    return;
  }
  res.status(401);
  res.send('unlogin');
}
