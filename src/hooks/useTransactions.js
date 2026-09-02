import { useState } from "react";

const STORAGE_KEY = "budget-transactions";

function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  const saveTransactions = (updatedTransactions) => {
    setTransactions(updatedTransactions);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedTransactions)
    );
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    const updatedTransactions = [
      ...transactions,
      newTransaction,
    ];

    saveTransactions(updatedTransactions);
  };

  const updateTransaction = (id, updatedTransaction) => {
    const updatedTransactions = transactions.map(
      (transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...updatedTransaction,
            }
          : transaction
    );

    saveTransactions(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    saveTransactions(updatedTransactions);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}

export default useTransactions;