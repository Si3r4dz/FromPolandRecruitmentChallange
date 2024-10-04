"use client";

import React from 'react';
import useExchangeRate  from '../hooks/useExchangeRate';

const ExchangeRate: React.FC = () => {
  const { rate, error } = useExchangeRate();

  if (error) {
    return <div>{error}</div>;
  }

  if (rate === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <span>Actual EUR/PLN:</span> {rate?.toFixed(4)}
    </div>
  );
};

export default ExchangeRate;
