import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { publishJWT, verifyJWT } from 'src/utils/jwt';
import { CreateUserDTO, EditUserDTO } from './dto/user.dto';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  // 构造函数，让 user.service 在实例化时，能够接收到数据库 Model，进而操作数据库
  constructor(@InjectModel('Users') private readonly userModel: Model<IUser>) {}

  /**
   * mongoose 操作数据库是异步的，所以使用 async/await
   */

  // 查找所有用户
  async findAll(): Promise<IUser[]> {
    const users = await this.userModel.find();
    return users;
  }

  // 查找单个用户
  async findOne(body): Promise<IUser> {
    return await this.userModel.findOne({ username: body.username });
  }

  // 添加单个用户
  async addOne(response, body: CreateUserDTO) {
    if (body.username === (await this.findOne(body))?.username) {
      return 'failed';
    }
    const res = await this.userModel.create(body);
    console.log('添加结果：', res);
    const result = publishJWT(response, body);
    console.log('登录成功！');
    console.log('token -----> ', result);
    return result;
  }

  // 编辑单个用户
  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }

  async login(res, username: string, password: string) {
    const result = await this.findOne({ username });
    const obj = { flag: false, content: '', token: undefined };
    if (!result) {
      console.log(username, '用户不存在');
      obj.content = '用户不存在！';
    } else if (result.password !== password) {
      console.log(username, '密码错误！');
      obj.content = '密码错误！';
    } else {
      const jwtToken = publishJWT(res, { username, password });
      console.log('登录成功！');
      console.log('token -----> ', jwtToken);
      obj.flag = true;
      obj.token = jwtToken;
    }
    return obj;
  }

  test(req) {
    return verifyJWT(req);
  }
}
