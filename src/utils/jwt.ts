import { JwtPayload, sign, verify } from 'jsonwebtoken';

const dk = 'chapaofan';

const createJWT = (payload = {}, maxAge = 60 * 60 * 240) => {
  return sign(payload, dk, { expiresIn: maxAge });
};
const verifyToken = (token) => verify(token, dk);

export function publishJWT(payload = {}, maxAge = 60 * 60 * 240) {
  const token = createJWT(payload, maxAge);
  return token;
}

export function verifyJWT(req) {
  if (!req.headers?.token && !req.session?.token) {
    return false;
  }
  const t = (req.headers?.token || req.session?.token).split(' ');
  const token = t.length === 1 ? t[0] : t[1];
  try {
    const result = verifyToken(token) as JwtPayload;
    console.log('verifying ----->' + result);
    req.session.username = result.username;
    req.session.token = token;
    return true;
  } catch (err) {
    return null;
  }
}
