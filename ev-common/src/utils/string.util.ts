import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class StringUtil {
  isEmpty(src: unknown) {
    if (typeof src == 'undefined' || src == null || src == '') {
      return true;
    } else {
      return false;
    }
  }
  isNotEmpty(src: unknown) {
    if (typeof src !== 'undefined' && src !== null && src !== '') {
      return true;
    } else {
      return false;
    }
  }
  generateEmailKey(length: number) {
    const keyRange =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let inviteKey = '';
    for (let i = 0; i < length; i++) {
      inviteKey += keyRange.charAt(Math.floor(Math.random() * keyRange.length));
    }

    return inviteKey;
  }
  getBusinessCodeFromConnectorCode(connectorCode: string) {
    const codeRegex = new RegExp(process.env.BUSINESS_CODE_REGEX!, 'g');
    const matchResult = connectorCode.match(codeRegex);
    return matchResult?.[0];
  }
  getStationCodeFromConnectorCode(connectorCode: string) {
    const codeRegex = new RegExp(process.env.STATION_CODE_REGEX!, 'g');
    const matchResult = connectorCode.match(codeRegex);
    return matchResult?.[0];
  }
  getChargepointCodeFromConnectorCode(connectorCode: string) {
    const codeRegex = new RegExp(process.env.CHARGEPOINT_CODE_REGEX!, 'g');
    const matchResult = connectorCode.match(codeRegex);
    return matchResult?.[0];
  }
  deleteStartStringAcute(data: string) {
    const result = [];
    for (const i of data) {
      const obj: Record<string, Record<string, unknown>> = {};

      Object.keys(i).map((key: string) => {
        if (key.indexOf('.') == -1) {
          if (obj['data'] === null || obj['data'] === undefined)
            obj['data'] = {} as Record<string, unknown>; // Type assertion
          obj['data'][key] = i[key as unknown as number];
        }
      });

      result.push(obj['data'] || null);
    }

    return result;
  }
}

export const StringProvider: Provider = {
  provide: StringUtil,
  useFactory: () => new StringUtil(),
};
