import { useState, useEffect } from 'react';
import { getExchangeRate } from '../services/api';

const useExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const rate = await getExchangeRate();
        setRate(rate);
        setError(null);
      } catch(e: unknown) {
        setError(`${e}`);
      }
    };

    fetchRate();
  }, []);

  return { rate, error };
};

export default useExchangeRate;