import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { KycEntity } from './entities/kyc.entity';
import users from './kyc.json';
@Injectable()
export class KycService {
  private readonly index = 'kyc';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  searchKyc(search: string) {
    return this.elasticsearchService.search<KycEntity>({
      index: this.index,
      query: {
        multi_match: {
          query: search,
          fields: [
            'firstName',
            'lastName',
            'university',
            'email',
            'company.name',
            'address.city',
          ],
          operator: 'or',
          type: 'best_fields',
        },
      },
    });
  }

  bulkIndexUsers() {
    const mockData = users.flatMap((user) => [
      { index: { _index: 'kyc', _id: user.id } },
      user,
    ]);

    return this.elasticsearchService.bulk({
      body: mockData,
    });
  }
}
