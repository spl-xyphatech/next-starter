import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ValidateAuthDto {
  @IsOptional()
  @ApiProperty({ required: true })
  token: string;
}
