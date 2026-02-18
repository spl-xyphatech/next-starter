import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { KycEntity } from './entities/kyc.entity';

@Injectable()
export class KycService {
  private readonly index = 'kyc';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  search() {
    return this.elasticsearchService.search<KycEntity>({
      index: this.index,
      query: {
        match: {
          name: 'John Doe',
        },
      },
    });
  }

  createIndex(i: string) {
    return this.elasticsearchService.indices.create({
      index: i,
    });
  }

  createKyc(kyc: KycEntity) {
    return this.elasticsearchService.index({
      index: this.index,
      document: kyc,
    });
  }
}
