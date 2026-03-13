import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePermissionDto, userId: string) {
    data.createdBy = userId;
    return this.prisma.permission.create({ data });
  }

  async findAll(params: QueryPermissionDto) {
    const where = !params.search
      ? undefined
      : ({
          OR: [
            { module: { contains: params.search, mode: 'insensitive' } },
            { action: { contains: params.search, mode: 'insensitive' } },
          ],
        } as Prisma.PermissionWhereInput);
    const total = await this.prisma.permission.count({ where });
    const permissions = await this.prisma.permission.findMany({
      where,
      skip: params?.skip,
      take: params?.limit,
      orderBy: params?.orderby || {
        updatedAt: 'desc',
      },
    });

    return {
      permissions,
      total,
    };
  }

  findOne(id: string) {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  update(id: string, data: UpdatePermissionDto) {
    return this.prisma.permission.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
