"use Client"

import React from 'react';
import ExchangeRate from './components/ExchangeRate';
import CurrencyConverter from './components/CurrencyConverter';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.main}>
      <h1>Euro to PLN currency converter</h1>

      <ExchangeRate />

      <CurrencyConverter />
    </div>
  );
};

export default HomePage;
