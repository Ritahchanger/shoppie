import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { MongooseModule } from '@nestjs/mongoose';

import { User,UserSchema } from './schemas/user.schema';

import { ConfigModule } from '@nestjs/config';
import { UclearController } from './uclear/uclear.controller';


@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
    ,ConfigModule
  ],
  controllers: [UserController, UclearController],
  providers: [UserService]
})
export class UserModule {}
