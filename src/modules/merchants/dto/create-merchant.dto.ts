import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

enum MerchantStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateMerchantDto {
  @ApiProperty({
    example: 'user_123',
    description: 'The user ID associated with the merchant',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'ABC Restaurant',
    description: 'The name of the Merchant',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'A high-quality restaurant',
    description: 'The description of the Merchant',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: '123 Main St, City',
    description: 'The address of the Merchant',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'The phone number of the Merchant',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: 'PENDING',
    description: 'The status of the Merchant',
    enum: MerchantStatusEnum,
  })
  @IsEnum(MerchantStatusEnum)
  @IsOptional()
  status?: MerchantStatusEnum;
}
