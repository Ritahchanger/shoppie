import { Inject, Injectable } from '@nestjs/common';

import { CreateProductDto } from 'src/dtos/product.dto';

import { AwsService } from 'src/globalservices/aws/aws.service';

import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ProductService {


    constructor( private readonly awsS3Service : AwsService,


        @InjectModel(Product.name) private productModel:Model<Product>

     ) {
    

    }
    
    async createProduct(createProductDto:CreateProductDto, file?:any){


        let imageUrl = "";

        if(file){

            imageUrl = await this.awsS3Service.uploadFile(file);

        }


        const newProduct = new this.productModel(
           {
            ...createProductDto,

            imageUrl,
           }
        )


        return newProduct.save();

    }


}
