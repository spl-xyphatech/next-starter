import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  userInclude = {
    role: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },
    branch: {
      select: {
        id: true,
        name: true,
      },
    },
  };

  constructor(private prisma: PrismaService) {}

  private async ensureUniqueFields(data: Prisma.UserCreateInput) {
    const { email, phone, id } = data;

    const existingUsers = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
        NOT: id ? { id: id } : undefined,
      },
      select: { email: true, phone: true },
    });
    if (existingUsers?.email === email) {
      throw new ConflictException('Email already exists');
    }
    if (phone && existingUsers?.phone === phone) {
      throw new ConflictException('Phone already exists');
    }
  }

  async create(data: Prisma.UserCreateInput, userId: string) {
    await this.ensureUniqueFields(data);
    const hash = await argon2.hash(data?.password);
    data.password = hash;
    data.createdBy = userId;
    return this.prisma.user.create({ data });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null },
      include: this.userInclude,
    });
  }

  async findAll(params: QueryUserDto) {
    let where = { deletedAt: null } as Prisma.UserWhereInput;
    if (params.search) {
      where = {
        ...where,
        OR: [
          { name: { contains: params.search, mode: 'insensitive' } },
          { email: { contains: params.search, mode: 'insensitive' } },
        ],
      };
    }

    if (params.roleId) {
      where.roleId = params.roleId;
    }
    const total = await this.prisma.user.count({ where });
    const users = await this.prisma.user.findMany({
      where,
      skip: params?.skip,
      take: params?.limit,
      orderBy: params.orderby || {
        updatedAt: 'desc',
      },
      include: this.userInclude,
      omit: {
        password: true,
      },
    });

    return {
      users,
      total,
    };
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: this.userInclude,
      omit: {
        password: true,
      },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async verifyPassword(id: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return false;
    const isMatch = await argon2.verify(user.password, password);
    return isMatch;
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { password, newPassword } = changePasswordDto;

    const isMatch = await this.verifyPassword(id, password);
    if (!isMatch) throw new ForbiddenException('Invalid Credentials');

    const hashedPassword = await argon2.hash(newPassword);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}
