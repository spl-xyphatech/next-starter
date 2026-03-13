import { Injectable } from '@nestjs/common';
import { Tag } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { QueryTagDto } from './dto/query-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTagDto): Promise<Tag> {
    return this.prisma.tag.create({ data });
  }

  async findAll(query: QueryTagDto) {
    const where = { deletedAt: null };

    const total = await this.prisma.tag.count({ where });
    const data = await this.prisma.tag.findMany({
      where,
      take: query?.limit,
      skip: query?.offset,
      orderBy: query?.orderby,
    });

    return { data, total };
  }

  findOne(id: string): Promise<Tag> {
    return this.prisma.tag.findUniqueOrThrow({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, data: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async remove(id: string): Promise<Tag> {
    return this.prisma.tag.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
