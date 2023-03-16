import { Controller, Post, Res, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() param, @Res() res) {
    const { username, password } = param;
    res.send(this.userService.login(res, username, password));
    return;
  }

  @Get()
  getTest(@Req() req) {
    return this.userService.test(req);
  }
}
