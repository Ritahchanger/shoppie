import { Body, Controller, Post, UseInterceptors,UploadedFile } from '@nestjs/common';

import { FileInterceptor  } from "@nestjs/platform-express"

import { CreateProductDto } from 'src/dtos/product.dto';

import { ProductService } from './product.service';

import { multerOptions } from 'src/configuration/multer.config';


@Controller('product')
export class ProductController {

    constructor(
        
        private readonly productsService:ProductService){}


    @Post('post')

    @UseInterceptors(FileInterceptor('image',multerOptions))

    async createProduct(

        @Body() createProductDto:CreateProductDto,

        @UploadedFile() file?:any


    ){

        console.log(createProductDto)
        return this.productsService.createProduct(createProductDto,file);

    }


}
