import { BadRequestException, Injectable } from '@nestjs/common';
import { Test } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTestDto } from './dto/create-test.dto';
import { QueryTestDto } from './dto/query-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTestDto): Promise<Test> {
    return this.prisma.test.create({ data });
  }

  async findAll(query: QueryTestDto) {
    const where = { deletedAt: null };

    const total = await this.prisma.test.count({ where });
    const data = await this.prisma.test.findMany({
      where,
      take: query?.limit,
      skip: query?.offset,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Test> {
    const test = await this.prisma.test.findUnique({
      where: { id, deletedAt: null },
    });
    if (!test) throw new BadRequestException('Test not found');
    return test;
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    await this.findOne(id);
    return this.prisma.test.update({
      where: { id, deletedAt: null },
      data: updateTestDto,
    });
  }

  async remove(id: number): Promise<Test> {
    await this.findOne(id);
    return this.prisma.test.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
