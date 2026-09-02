import { useEffect, useState } from "react";

const STORAGE_KEY = "budget-transactions";

function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    setTransactions((currentTransactions) => [
      ...currentTransactions,
      newTransaction,
    ]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...updatedTransaction,
            }
          : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}

export default useTransactions;