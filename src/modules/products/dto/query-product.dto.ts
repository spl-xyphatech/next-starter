import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  offset: number;
}
