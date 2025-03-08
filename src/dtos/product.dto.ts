import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

import { Type } from "class-transformer"


export class CreateProductDto{

    @IsNotEmpty({message:'Product name is required'})
    @IsString()
    name:string;

    @IsNotEmpty({message:'Product description is required'})
    @IsString()
    description:string;


    @IsNotEmpty({message:'Product price is required'})
    @IsNumber({}, {message:'Product price must be a number'})
    @Type(()=>Number)
    price:number;



    @IsNotEmpty({message:"Product category is required."})
    @IsString()
    category:string;


    @IsNotEmpty({message:"Product stock is required"})
    @IsNumber({}, {message:"Product stock must be a number."})
    @Type(()=>Number)
    stock:number;


    @IsOptional()
    @IsString()
    imageUrl?:string;
    
}