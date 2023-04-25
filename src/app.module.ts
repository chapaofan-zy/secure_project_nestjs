import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

// const DBRootModule = MongooseModule.forRoot('mongodb://127.0.0.1/test');
const DBRootModule = MongooseModule.forRoot(
  'mongodb+srv://1095004630:zhangY18@chapaofan.kfljrnd.mongodb.net/test',
);

@Module({
  imports: [UserModule, DBRootModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
