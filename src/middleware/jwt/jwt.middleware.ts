import { verifyJWT } from 'src/utils/jwt';

const excloudUrl = ['/api/users/login', '/api/users/register'];

export function JwtMiddleware(req: any, res: any, next: () => void) {
  if (verifyJWT(req) || excloudUrl.includes(req.url)) {
    next();
    return;
  }
  res.status(401);
  res.send('unlogin');
}
