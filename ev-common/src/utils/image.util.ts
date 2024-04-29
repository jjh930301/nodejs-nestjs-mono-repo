import { Injectable, Provider } from '@nestjs/common';
import * as resizeImg from 'resize-img';

@Injectable()
export class ImageUtil {
  async resizingImg(
    buffer: Express.Multer.File | Buffer,
    width: number,
  ): Promise<Buffer> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await resizeImg(buffer, { width: width });
  }
}

export const ImageProvider: Provider = {
  provide: ImageUtil,
  useFactory: () => new ImageUtil(),
};
