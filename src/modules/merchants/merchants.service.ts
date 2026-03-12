import { BadRequestException, Injectable } from '@nestjs/common';
import { Merchant } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { QueryMerchantDto } from './dto/query-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateMerchantDto): Promise<Merchant> {
    return this.prisma.merchant.create({ data });
  }

  async findAll(query: QueryMerchantDto) {
    const where = { deletedAt: null };

    const total = await this.prisma.merchant.count({ where });
    const data = await this.prisma.merchant.findMany({
      where,
      take: query?.limit,
      skip: query?.offset,
      orderBy: query?.orderby,
      omit: {
        userId: true,
      },
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Partial<Merchant>> {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id, deletedAt: null },
      omit: {
        userId: true,
      },
    });
    if (!merchant) throw new BadRequestException('Merchant not found');
    return merchant;
  }

  async update(id: number, data: UpdateMerchantDto) {
    await this.findOne(id);
    return this.prisma.merchant.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async remove(id: number): Promise<Partial<Merchant>> {
    await this.findOne(id);
    return this.prisma.merchant.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
