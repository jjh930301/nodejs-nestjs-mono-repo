import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class QueryStringUtil {
  parseStringToArray(query: Record<string, string>) {
    const result: Record<string, string[]> = {};
    Object.keys(query).map((key: string) => {
      const value = query[key].replace(/\[|\]/g, '').split(',');
      if ((Array.isArray(value) && value[0] !== '') || !Array.isArray(value))
        result[key] = value;
    });
    return result;
  }
  parseStringArrayToArray(queryParam: string) {
    let values;
    if (queryParam) {
      const paramValue = queryParam.replace(/\[|\]| /g, '');
      if (paramValue) {
        const splitValues = paramValue.split(',');
        values = splitValues.map((v) => {
          if (isNaN(+v)) {
            return v;
          } else {
            return parseInt(v);
          }
        });
        return values;
      } else {
        return values;
      }
    } else {
      return values;
    }
  }
  nullReturning(array: unknown[]) {
    if (Array.isArray(array) && array.length === 2) {
      return null;
    }

    return array;
  }
}

export const QueryStringProvider: Provider = {
  provide: QueryStringUtil,
  useFactory: () => new QueryStringUtil(),
};
