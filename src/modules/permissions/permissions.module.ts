import { PrismaModule } from '@app/common/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [PrismaModule],
})
export class PermissionsModule {}
