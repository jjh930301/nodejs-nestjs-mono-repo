import { SetMetadata, Type, UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiOperationOptions,
  ApiParamOptions,
  ApiBodyOptions,
  ApiQueryOptions,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { ApiResDataRespones } from './res-data.decorator';
import { RolesCode } from '../enums/roles.code';
import { UserAuthGard } from '../guards/user.guard';

type AuthOption = {
  roles: `${RolesCode}`[];
  bz?: boolean;
};
interface IApiDeco {
  operation: ApiOperationOptions;
  params?: ApiParamOptions[];
  body?: ApiBodyOptions;
  query?: ApiQueryOptions;
  auth?: AuthOption;
  userAuth?: boolean;
  // response?: ApiResponseOptions;
  responses?: {
    type: Type<unknown>;
    description?: string;
    status?: number;
    isArray?: boolean;
  };
}

export function ApiDeco(option: IApiDeco) {
  const decorators = [ApiOperation(option.operation)];
  if (option.params) {
    decorators.push(...option.params.map((param) => ApiParam(param)));
  }
  // if (option.response) {
  //   decorators.push(ApiResponse(option.response));
  // }
  if (option.body) {
    decorators.push(ApiBody(option.body));
  }
  if (option.query) {
    decorators.push(ApiQuery(option.query));
  }
  if (option.auth) {
    decorators.push(ApiBearerAuth('Authorization'));
    decorators.push(
      SetMetadata('roles', option.auth.roles),
      UseGuards(AuthGuard(option.auth.bz), RoleGuard),
    );
  }
  if (option.userAuth) {
    decorators.push(ApiBearerAuth('user Authorization'));
    decorators.push(UseGuards(UserAuthGard));
  }

  if (option.responses) {
    const { type, description, status, isArray } = option.responses;
    let args:
      | { description?: string | undefined; status?: number | undefined }
      | undefined;
    if (description || status) args = { description, status };

    const { ext, res } = ApiResDataRespones(type, args, isArray);
    //                   hack
    decorators.push(ext, res!);
  }

  return applyDecorators(...decorators);
}
