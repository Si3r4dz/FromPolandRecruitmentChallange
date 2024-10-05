import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeRateService: ExchangeService) {}

  @Get('rate')
  async getRate() {
    const rate = await this.exchangeRateService.getExchangeRate();
    return { rate };
  }

  @Post('transaction')
  async getTransaction(@Body('amount') amount: number) {
    return this.exchangeRateService.getTransaction(amount);
  }
}
