import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../enums/permission.enum';
import { PrismaService } from '@app/common/prisma/prisma.service';

export const PERMISSION_KEY = 'permissions';
export const Can = (data: string) => SetMetadata(PERMISSION_KEY, data);

@Injectable()
export class AuthzGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<Permission>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermission) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('user :>> ', user);
    const userPermissions = await this.prisma.user.findUnique({
      where: { id: user?.sub },
      select: {
        role: {
          select: {
            RolePermission: {
              select: {
                permission: true,
              },
            },
          },
        },
      },
    });

    // Flatten the permissions if needed
    const permissions =
      userPermissions?.role?.RolePermission.map(
        (rp) => `${rp?.permission?.module}:${rp?.permission?.action}`,
      ) || [];

    console.log('permissions :>> ', permissions);
    if (!permissions) {
      throw new ForbiddenException('Permission denied for this resource');
    }
    return permissions.includes(requiredPermission);
  }
}
