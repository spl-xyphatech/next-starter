import { IsString } from 'class-validator';

export class CreateKycDto {
  @IsString()
  name: string;
}
