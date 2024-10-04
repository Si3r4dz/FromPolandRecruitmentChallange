"use client";

import React, { useState } from 'react';
import { createTransaction } from '../services/api';
import styles from './CurrencyConverter.module.css';

const CurrencyConverter: React.FC = () => {
  const [amountEUR, setAmountEUR] = useState<string>('');
  const [amountPLN, setAmountPLN] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(amountEUR);

    if (!amountEUR || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const amountPLN = await createTransaction(amount);
      setAmountPLN(amountPLN);
      setError(null);
    } catch (e) {
      setError(`${e}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.formLabel}>
          EUR:
          <input
            type="number"
            step="0.01"
            value={amountEUR}
            onChange={(e) => setAmountEUR(e.target.value)}
            required
            className={styles.formInput}
          />
        </label>
        <button type="submit" className={styles.formButton}>
          Count
        </button>
      </form>

      {amountPLN !== null && !error && (
        <div className={styles.responseContainer}>
          <strong>PLN:</strong> {amountPLN.toFixed(2)} PLN
        </div>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
