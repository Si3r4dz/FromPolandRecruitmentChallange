// src/exchange-rate/exchange-rate.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getExchangeRate(): Promise<number> {
    const cachedRate = await this.cacheManager.get<number>('exchangeRate');
    if (cachedRate) {
      return cachedRate;
    }

    const apiKey = this.configService.get<string>('API_KEY');
    const apiUrl = this.configService.get<string>('API_URL');

    try {
      const response = await firstValueFrom(
        this.httpService.get(apiUrl, {
          headers: { 'x-api-key': apiKey },
        }),
      );

      const rate = response.data.exchange_rate;

      if (!rate) {
        throw new Error('Exchange rate not found in response');
      }

      await this.cacheManager.set('exchangeRate', rate, 60 * 100000);
      return rate;
    } catch (error) {
      throw new Error(`Failed to fetch exchange rate: ${error.message}`);
    }
  }

  async getTransaction(amountEUR: number): Promise<Transaction> {
    const rate = await this.getExchangeRate();
    const amountPLN = amountEUR * rate;

    const transaction = new Transaction();
    transaction.amountEUR = amountEUR;
    transaction.amountPLN = amountPLN;
    transaction.rate = rate;

    return this.transactionRepository.save(transaction);
  }
}
