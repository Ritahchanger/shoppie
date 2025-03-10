import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from "@nestjs/config"

import { MongooseModule } from "@nestjs/mongoose"
import { ProductModule } from './modules/product/product.module';

import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    ProductModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
