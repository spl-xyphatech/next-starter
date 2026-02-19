import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 10;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  offset: number;
}
