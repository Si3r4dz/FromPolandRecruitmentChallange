// src/app/services/api.ts
import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getExchangeRate = async (): Promise<number>  => {
    try {
      const response = await api.get('/exchange/rate');
      return response.data.rate;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        throw new Error(`Server error: ${err.response.status}`);
      } else {
        throw new Error('Connection error');
      }
    }
  };

export const createTransaction = async (amountEUR: number): Promise<number> => {
  try {
    const response = await api.post('/exchange/transaction', {
      amount: amountEUR,
    });
    return response.data.amountPLN;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      throw new Error(`Server error: ${err.response.status}`);
    } else {
      throw new Error('Connection error');
    }
  }
};
