import { IsPassword } from '@app/common/validators/is-password.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @ApiProperty({
    description: 'password',
  })
  password: string;

  @IsPassword()
  @ApiProperty({
    description: 'New password',
  })
  newPassword: string;
}
