import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { IsPassword } from 'src/common/validators/is-password.validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 256)
  name: string;

  @IsString()
  @Length(1, 256)
  username: string;

  @IsEmail()
  @Length(1, 256)
  email: string;

  @IsString()
  @IsOptional()
  roleId: string;

  @IsString()
  branchId: string;

  @IsPassword()
  password: string;

  // need to add phno validation
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
