import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Prisma } from 'generated/prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class QueryRoleDto extends PartialType(PaginationDto) {
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform((params) => JSON.parse(params.value))
  orderby?: Prisma.RoleOrderByWithRelationInput;
}
