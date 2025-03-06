import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';

import { Model } from 'mongoose';

import * as bcrypt from "bcryptjs"

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async createUser(firstName:string,lastName:string,email:string,idNo:number,password:string):Promise<User>{

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new this.userModel({firstName,lastName,idNo,email,password:hashedPassword});


    return newUser.save();
  }

  async findByEmail(email:string):Promise<User>{

    return this.userModel.findOne({email}).exec();

  }
}
