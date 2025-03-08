import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';  
import multer from 'multer';
import { config } from 'dotenv';

config();

const s3 = new S3Client({

  region: process.env.AWS_REGION,
  
  credentials: {

    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

  },


});


export const multerOptions = {

    storage:multerS3({
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",

        key:function(req,file,cb){

            cb(null,`products/${Date.now()}-${file.originalname}`);

        }

    }),

    fileFilter:(req,file,cb) => {

        if(!file.mimetype.match(/\/(jpg|jpeg|png)$/)){

            return cb(new Error("Only image files are allowed!"),false);

        }

        cb(null,true);

    }
}