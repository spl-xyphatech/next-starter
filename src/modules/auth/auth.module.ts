import { PrismaModule } from '@app/common/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/roles/roles.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [Logger, AuthService],
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    RolesModule,
    UsersModule,
  ],
})
export class AuthModule {}
