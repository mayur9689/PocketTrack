import { useEffect, useMemo, useState } from 'react';
import type { Transaction } from './types/transaction';
import BalanceSummary from './components/BalanceSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import './App.css';

const STORAGE_KEY = 'expense-tracker-transactions';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load saved transactions from localStorage when the app first opens.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTransactions(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Could not load saved transactions:', err);
    }
  }, []);

  // Save transactions to localStorage every time they change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (err) {
      console.error('Could not save transactions:', err);
    }
  }, [transactions]);

  const handleAdd = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome: income, totalExpense: expense, balance: income - expense };
  }, [transactions]);

  return (
    <div className="app">
      <header className="app__hero">
        <p className="app__eyebrow">Personal Finance</p>
        <h1 className="app__title">PocketTrack</h1>
        <p className="app__subtitle">Track your income and expenses, right in your browser.</p>
      </header>

      <div className="app__body">
        <BalanceSummary totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
        <TransactionForm onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
