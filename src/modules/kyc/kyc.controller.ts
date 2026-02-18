import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateKycIndexDto } from './dto/create-index-kyc.dto';
import { CreateKycDto } from './dto/create-kyc.dto';
import { KycService } from './kyc.service';

@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post()
  createIndex(@Body() createKycIndex: CreateKycIndexDto) {
    return this.kycService.createIndex(createKycIndex.index);
  }

  @Post()
  createKyc(@Body() createKycDto: CreateKycDto) {
    return this.kycService.createKyc(createKycDto);
  }

  @Get()
  search() {
    return this.kycService.search();
  }
}
