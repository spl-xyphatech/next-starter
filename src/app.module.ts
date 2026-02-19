import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HealthModule } from './core/health/health.module';
import { KycModule } from './modules/kyc/kyc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      // Cache environment variables
      cache: true,
      // Load custom configuration file
      load: [configuration],
      // Disable env variables loading in production from `.env` file
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
    }),

    HealthModule,

    // Resources
    KycModule,
  ],
})
export class AppModule {}
