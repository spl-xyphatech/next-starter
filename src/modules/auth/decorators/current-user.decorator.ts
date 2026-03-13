import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type JWTUser = {
  sub: string;
  email: string;
  roleId: string;
  branchId?: string;
};

export const CurrentUser = createParamDecorator(
  (field: keyof JWTUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JWTUser | undefined = request?.user;

    return field ? user?.[field] : user;
  },
);
