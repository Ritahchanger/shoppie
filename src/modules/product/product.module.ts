import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

import { AwsService } from 'src/globalservices/aws/aws.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './schemas/product.schema';
@Module({
  imports:[
  
    MongooseModule.forFeature([{name:Product.name, schema:ProductSchema}])

  ],
  controllers: [ProductController],
  providers: [ProductService,AwsService],
  exports:[AwsService]
})

export class ProductModule {}
