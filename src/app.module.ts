import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import configuration from './config/configuration';
import { HealthModule } from './core/health/health.module';
import { KycModule } from './modules/kyc/kyc.module';
import { ProductsModule } from './modules/products/products.module';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        // level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
    // LoggerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     pinoHttp: {
    //       level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    //       // Use `pino-pretty` for pretty-printing logs in development
    //       // Use axiomhq/pino for structured logging in production
    //       transport:
    //         process.env.NODE_ENV === 'production'
    //           ? {
    //               target: '@axiomhq/pino',
    //               options: {
    //                 dataset: configService.get<string>('axiom.dataset'),
    //                 token: configService.get<string>('axiom.token'),
    //               },
    //             }
    //           : {
    //               target: 'pino-pretty',
    //               options: {
    //                 colorize: true,
    //                 translateTime: 'SYS:standard',
    //                 ignore: 'pid,hostname',
    //               },
    //             },
    //     },
    //   }),
    // }),

    HealthModule,

    // Resources
    KycModule,
    ProductsModule,
  ],
})
export class AppModule {}
