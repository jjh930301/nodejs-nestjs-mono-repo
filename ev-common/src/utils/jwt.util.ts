import { Injectable, Provider } from '@nestjs/common';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { RolesCode } from '../enums/roles.code';

@Injectable()
export class JwtUtil {
  private adminJwtService = (refresh: boolean | null = false): JwtService => {
    const options: JwtModuleOptions = {
      secret: refresh
        ? process.env.REFRESH_TOKEN_SECRET
        : process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        issuer: 'api',
        algorithm: 'HS256',
      },
    };
    if (!refresh)
      options.signOptions &&
        (options.signOptions.expiresIn =
          3600 * 24 * Number(process.env.EXPIRES_IN!));

    return new JwtService(options);
  };
  private userJwtService = (refresh: boolean | null = false): JwtService => {
    return new JwtService({
      secret: refresh
        ? process.env.USER_REFRESH_TOKEN_SECRET
        : process.env.USER_ACCESS_TOKEN_SECRET,
      signOptions: {
        issuer: 'api',
        algorithm: 'HS256',
      },
    });
  };

  sign = (admin: any, adminCpoList?: any[]): string => {
    const cpoSeqs = adminCpoList
      ? adminCpoList.map((cpo) => cpo.seq)
      : admin.adminCpoList.map(
          (admin_cpo: any) => (admin_cpo.cpo as any)?.seq as unknown as number,
        );

    const payload = {
      seq: admin.seq,
      roleCode: (admin.role as any).code,
      adminCpoSeqs: cpoSeqs,
    };

    const accessToken = this.adminJwtService().sign(payload);
    return accessToken;
  };

  userSign = (user: any): string => {
    const payload = {
      seq: user.seq,
      name: user.name,
      email: user.email,
      status: user.status,
      role: RolesCode.USER,
    };
    const userAccessToken = this.userJwtService().sign(payload);

    return userAccessToken;
  };

  verify = (token: string) => {
    // access token 검증
    try {
      const decoded = this.adminJwtService().verify(token);
      return {
        ok: true,
        seq: decoded.seq,
        roleCode: decoded.roleCode,
        adminCpoSeqs: decoded?.adminCpoSeqs,
        token: token,
        iat: decoded.iat,
        exp: decoded.exp,
      };
    } catch (error) {
      return {
        ok: false,
        token: token,
        message: error.message,
      };
    }
  };

  userVerify = (token: string) => {
    // access token 검증
    try {
      const decoded = this.userJwtService().verify(token);
      return {
        ok: true,
        seq: decoded.seq,
        email: decoded.email,
        name: decoded.name,
        status: decoded.status,
        iat: decoded.iat,
        exp: decoded.exp,
      };
    } catch (error) {
      return {
        ok: false,
        token: token,
        message: error.message,
      };
    }
  };

  refreshSign = (entity: { seq: number }) => {
    // refresh token 발급
    const payload = {
      seq: entity.seq,
    };
    return this.adminJwtService(true).sign(payload);
  };
  refreshVerify = (refreshToken: string) => {
    // refresh token 검증
    // redis 사용시 참고 (https://velog.io/@kshired/Express%EC%97%90%EC%84%9C-JWT%EB%A1%9C-%EC%9D%B8%EC%A6%9D%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-Access-Token%EA%B3%BC-Refresh-Token)
    try {
      const decoded = this.adminJwtService(true).verify(refreshToken);

      return {
        ok: true,
        seq: decoded.seq,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  };
}

export const JwtProvider: Provider = {
  provide: JwtUtil,
  useFactory: () => new JwtUtil(),
};
