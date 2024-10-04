// src/exchange-rate/exchange-rate.module.ts
import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    CacheModule.register(),
    TypeOrmModule.forFeature([Transaction]),
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeRateModule {}
