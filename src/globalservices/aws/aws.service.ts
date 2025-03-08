import { Injectable } from '@nestjs/common';

import {PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { config } from 'dotenv';

config();

@Injectable()
export class AwsService {

  private s3: S3Client;

  private bucketName = process.env.AWS_BUCKET_NAME;

  constructor() {

    this.s3 = new S3Client({

      region: process.env.AWS_REGION,

      credentials: {

        accessKeyId: process.env.AWS_ACCESS_KEY_ID,

        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

      },

    });

  }

  async uploadFile(file:any):Promise<string>{

    const timestamp = Date.now();

    const fileKey = `products/${timestamp}-${file.originalname}`;

    await this.s3.send(
        new PutObjectCommand({

            Bucket:this.bucketName,

            Key:fileKey,

            Body:file.buffer,

            ContentType:file.mimetype,

        })
    )

    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  }
}
