import { Injectable, Provider } from '@nestjs/common';
import * as Crypto from 'crypto-js';

@Injectable()
export class CryptoUtil {
  async encrypt(
    value: string | Crypto.lib.WordArray,
    key: string | Crypto.lib.WordArray,
  ): Promise<string> {
    return Crypto.AES.encrypt(value, key).toString();
  }

  async decrypt(
    value: string | Crypto.lib.CipherParams,
    key: string | Crypto.lib.WordArray,
  ): Promise<string> {
    return await Crypto.AES.decrypt(value, key).toString(Crypto.enc.Utf8);
  }
}

export const CryptoProvider: Provider = {
  provide: CryptoUtil,
  useFactory: () => new CryptoUtil(),
};
