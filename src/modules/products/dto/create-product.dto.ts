import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the Product',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 99.99,
    description: 'The price of the Product',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'A detailed description of the product',
    description: 'The description of the Product',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  description: string;
}
