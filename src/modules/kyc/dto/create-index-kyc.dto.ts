import { IsString } from 'class-validator';

export class CreateKycIndexDto {
  @IsString()
  index: string;
}
