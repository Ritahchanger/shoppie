import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';

import { Model } from 'mongoose';

import { ConfigService } from "@nestjs/config"

import * as bcrypt from "bcryptjs"

import * as jwt from "jsonwebtoken"

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>,

  private configService:ConfigService

) {}


  async createUser(firstName:string,lastName:string,email:string,idNo:number,password:string):Promise<User>{

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new this.userModel({firstName,lastName,idNo,email,password:hashedPassword});


    return newUser.save();
  }

  async findByEmail(email:string):Promise<User>{

    return this.userModel.findOne({email}).exec();

  }

  async login(email:string, password:string) :Promise<{token:string;user:any}>{

    const user = await this.findByEmail(email);

    if(!user) throw new BadRequestException("Invalid email or password");


    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid) throw new BadRequestException("Invalid email or password");

    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    if(!jwtSecret){

      throw new Error("JWT SECRET is not defined in .env file")

    }

    const token = jwt.sign({userId:user.id,email:user.email},jwtSecret, {expiresIn:'1h'});


    return {

        token,

        user:{_id:user._id, firstName:user.firstName, lastName:user.lastName,email:user.email}

    };

  }

  async getUsers() {

    
  }

}
