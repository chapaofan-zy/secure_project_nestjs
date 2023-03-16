import { sign, verify } from 'jsonwebtoken';

const dk = 'chapaofan';

const createJWT = (payload = {}, maxAge = 60 * 60 * 240) => {
  return sign(payload, dk, { expiresIn: maxAge });
};
const verifyToken = (token) => verify(token, dk);

export function publishJWT(res, payload = {}, maxAge = 60 * 60 * 240) {
  const token = createJWT(payload, maxAge);
  res.header('token', token);
  return token;
}

export function verifyJWT(req) {
  if (!req.headers?.token) {
    return false;
  }
  const t = req.headers.token.split(' ');
  const token = t.length === 1 ? t[0] : t[1];
  try {
    const result = verifyToken(token);
    console.log('verifying ----->' + result);
    return true;
  } catch (err) {
    return null;
  }
}
