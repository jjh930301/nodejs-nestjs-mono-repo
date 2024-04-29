import { Injectable, Provider } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { KrGovEndpoints } from '../constants/endpoints';

@Injectable()
export class AxiosUtil {
  constructor(private readonly httpSvc: HttpService = new HttpService()) {}
  async put(
    url: string,
    bodyParams = {},
    accessToken: string,
  ): Promise<AxiosResponse<unknown> | number> {
    try {
      return await lastValueFrom(
        this.httpSvc
          .put(url, bodyParams, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .pipe(map(({ data }) => data)),
      );
    } catch (e) {
      return e.response.status ? e.response.status : 400;
    }
  }

  async post(
    url: string,
    body = {},
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<unknown> | number> {
    try {
      return await lastValueFrom(
        this.httpSvc.post(url, body, config).pipe(map(({ data }) => data)),
      );
    } catch (e) {
      /**
       * status를 찾을 수 없는 경우가 있음
       * 어떤 경우인지를 특정할 수 없기 때문에 프로세싱이 멈춘 곳에서 다시 불러와야 될 것 같음
       */
      console.log(e);
      return e?.response?.status ? e?.response?.status : 400;
    }
  }

  /**
   * @param url KrGovEndpoints
   * @param data KrGovEndpoints
   */
  async gov(url: string, json: any) {
    let baseUrl: string;
    let contentType: string;
    if (process.env.NODE_ENV === 'local') {
      baseUrl = 'http://ev.cluster/roaming';
      json = JSON.stringify({ ...json, url });
      contentType = 'application/json';
    } else {
      baseUrl = url;
      json = `messages=${JSON.stringify(json)}`;
      contentType = KrGovEndpoints['Content-Type'];
    }
    const req = await this.post(
      baseUrl,
      process.env.NODE_ENV === 'local' ? { json } : json,
      {
        headers: {
          'Content-Type': contentType,
        },
      },
    );
    return req;
  }
}

export const AxiosProvider: Provider = {
  provide: AxiosUtil,
  useFactory: () => new AxiosUtil(),
};
