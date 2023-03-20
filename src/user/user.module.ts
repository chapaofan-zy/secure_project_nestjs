import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const UserTable = MongooseModule.forFeature([
  { name: 'Users', schema: UserSchema },
]);

@Module({
  imports: [UserTable],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
