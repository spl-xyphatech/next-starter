import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PrismaModule } from '@app/common/prisma/prisma.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [PrismaModule],
  exports: [RolesService],
})
export class RolesModule {}
