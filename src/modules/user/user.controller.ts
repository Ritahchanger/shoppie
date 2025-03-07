import { BadRequestException, Body, Controller,Get,HttpStatus,Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {


    constructor(private readonly userService:UserService){}



    @Post('signup')


    async signup(@Body() body:{firstName:string,lastName:string,email:string,password:string,idNo:number}){

        console.log(body);

        if (!body.firstName || !body.lastName || !body.email || !body.password || !body.idNo) {
            throw new BadRequestException('All fields are required: firstName, lastName, email, password, idNo');
          }

        const existingUser = await this.userService.findByEmail(body.email);

        if(existingUser) throw new BadRequestException('Email already exists');

        const user = await this.userService.createUser(body.firstName,body.lastName,body.email,body.idNo,body.password);

        return { statusCode:HttpStatus.CREATED, message:"User created successfully",user }

    }

    @Post('login')

    async login(@Body() body:{email:string;password:string}){

        const { token,user } = await this.userService.login(body.email, body.password);

        return { message:'Login successfull', token,user }

    }
    @Get()

    async getUsers(){


        

    }



}
