import { Controller, Get, Param } from '@nestjs/common';
import { KycService } from './kyc.service';

@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Get(':q')
  search(@Param('q') search: string) {
    console.log('search :>> ', search);
    return this.kycService.searchKyc(search);
  }

  @Get('init')
  init() {
    return this.kycService.bulkIndexUsers();
  }
}
