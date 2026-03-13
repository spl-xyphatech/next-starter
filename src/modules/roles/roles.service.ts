import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRoleDto, userId: string) {
    data.createdBy = userId;
    return this.prisma.role.create({ data });
  }

  async findAll(params: QueryRoleDto) {
    let where = { deletedAt: null } as Prisma.RoleWhereInput;
    if (params.search) {
      where = {
        ...where,
        OR: [
          { name: { contains: params.search, mode: 'insensitive' } },
          { code: { contains: params.search, mode: 'insensitive' } },
        ],
      };
    }
    console.log('params.orderby :>> ', params.orderby);
    const total = await this.prisma.role.count({ where });
    const roles = await this.prisma.role.findMany({
      where,
      skip: params?.skip,
      take: params?.limit,
      orderBy: params?.orderby || {
        updatedAt: 'desc',
      },
    });

    return {
      roles,
      total,
    };
  }

  findOne(id: string) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateRoleDto) {
    return this.prisma.role.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.role.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findPermissionsByRole(roleId: string) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    const perByRole = await this.prisma.permission.findMany({
      where: {
        RolePermission: {
          some: {
            roleId,
          },
        },
      },
    });

    return {
      role,
      permissions: perByRole.map((p) => `${p.module}:${p.action}`),
    };
  }

  async findPermissions(roleId: string) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    const per = await this.prisma.permission.findMany({
      orderBy: {
        module: 'asc',
      },
    });
    const perByRole = await this.prisma.permission.findMany({
      where: {
        RolePermission: {
          some: {
            roleId,
          },
        },
      },
    });

    const perObj = {};
    for (const p of per) {
      perObj[p.id] = { ...p, checked: false };
    }
    for (const pr of perByRole) {
      perObj[pr.id] = { ...pr, checked: true };
    }
    return { role, permissions: Object.keys(perObj).map((key) => perObj[key]) };
  }

  async updatePermission(
    roleId: string,
    data: Prisma.RolePermissionCreateManyInput[],
  ) {
    await this.prisma.rolePermission.deleteMany({
      where: { roleId },
    });

    return this.prisma.rolePermission.createMany({ data });
  }
}
