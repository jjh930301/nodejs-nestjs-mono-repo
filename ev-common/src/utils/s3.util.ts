import { Injectable, Provider } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Util {
  private S3 = new AWS.S3({
    endpoint: process.env.AWS_S3_URL,
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY!,
    },
    s3ForcePathStyle: true,
  });
  async upload(
    multipartFile: {
      data:
        | WithImplicitCoercion<string>
        | { [Symbol.toPrimitive](hint: 'string'): string };
      mimetype: string;
    },
    uploadPath: string,
    mimetype: string | null = null,
  ) {
    let fileContent = null;
    if (multipartFile instanceof Buffer) {
      fileContent = multipartFile;
    } else {
      fileContent = Buffer.from(multipartFile.data, 'binary');
    }

    const param: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: uploadPath,
      Body: fileContent,
      ACL: 'public-read',
      ContentType: multipartFile.mimetype ?? mimetype,
    };

    return await this.S3.upload(param).promise();
  }
  async delete(path: string) {
    return await this.S3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: path,
    }).promise();
  }
  async excelUpload(xlsxFile: Express.Multer.File, path: string) {
    const param: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: path,
      Body: xlsxFile.buffer,
      ACL: 'public-read',
      ContentType: xlsxFile.mimetype,
    };
    try {
      return await this.S3.upload(param).promise();
    } catch (error) {
      throw new Error(error);
    }
  }
  async firmwareUpload(
    firmwareFile: { buffer: Buffer; mimetype: string },
    path: string,
  ) {
    const param: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: path,
      Body: firmwareFile.buffer,
      ACL: 'public-read',
      ContentType: firmwareFile.mimetype,
    };
    try {
      return await this.S3.upload(param).promise();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getDownloadPreSignedUrl(keyPath: string) {
    try {
      const presignedUrl = await this.S3.getSignedUrlPromise('getObject', {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: keyPath,
        Expires: 60 * 5,
      });
      return presignedUrl;
    } catch (error) {
      console.log(error);
    }
  }
}

export const S3Provider: Provider = {
  provide: S3Util,
  useFactory: () => new S3Util(),
};
