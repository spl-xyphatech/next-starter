import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
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

    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        // Use `pino-pretty` for pretty-printing logs in development
        // Use axiomhq/pino for structured logging in production
        transport:
          process.env.NODE_ENV === 'production'
            ? {
                target: '@axiomhq/pino',
                options: {
                  dataset: process.env.AXIOM_DATASET,
                  token: process.env.AXIOM_TOKEN,
                  // Optional: configure flush interval (default: 1000ms)
                  flushInterval: 2000,
                  // Optional: batch size (default: 100)
                  batchSize: 50,
                },
              }
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
                },
              },
      },
    }),
    HealthModule,

    // Resources
    KycModule,
  ],
})
export class AppModule {}
