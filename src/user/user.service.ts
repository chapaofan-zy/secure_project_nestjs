import { Injectable } from '@nestjs/common';
import { publishJWT, verifyJWT } from 'src/utils/jwt';

@Injectable()
export class UserService {
  login(res, username: string, password: string) {
    try {
      if (username === 'admin' && password === '123') {
        const result = publishJWT(res, { username, password });
        console.log('登录成功！');
        console.log('token -----> ', result);
        return result;
      }
      console.log('登陆失败！');
      return '用户名或密码错误';
    } catch (e) {
      console.log(e);
    }
  }

  test(req) {
    return verifyJWT(req);
  }
}
