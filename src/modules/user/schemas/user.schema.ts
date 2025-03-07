import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose"

import { Document } from "mongoose"


@Schema()
export class User extends Document{

    @Prop({required:true})

    firstName:string;

    @Prop({required:true})

    lastName:string;

    @Prop({required:true,unique:true})

    email:string;

    @Prop({required:true,unique:true})

    idNo:number

    @Prop({required:true})

    password:string;

}

export const UserSchema = SchemaFactory.createForClass(User);