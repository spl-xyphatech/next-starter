import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async findAll(query: QueryCategoryDto) {
    const where = { deletedAt: null };

    const total = await this.prisma.category.count({ where });
    const data = await this.prisma.category.findMany({
      where,
      take: query?.limit,
      skip: query?.offset,
      orderBy: query?.orderby,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id, deletedAt: null },
    });
    if (!category) throw new BadRequestException('Category not found');
    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    await this.findOne(id);
    return this.prisma.category.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async remove(id: number): Promise<Category> {
    await this.findOne(id);
    return this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
