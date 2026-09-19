import { useState, type FormEvent } from 'react';
import type { Category, Transaction, TransactionType } from '../types/transaction';

interface TransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const CATEGORIES: Category[] = ['Food', 'Rent', 'Transport', 'Shopping', 'Entertainment', 'Salary', 'Other'];

function TransactionForm({ onAdd }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [note, setNote] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount <= 0) return;

    onAdd({ type, amount: numericAmount, category, note: note.trim() });

    setAmount('');
    setNote('');
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="transaction-form__type-toggle">
        <button
          type="button"
          className={`type-btn ${type === 'expense' ? 'type-btn--active-expense' : ''}`}
          onClick={() => setType('expense')}
        >
          Expense
        </button>
        <button
          type="button"
          className={`type-btn ${type === 'income' ? 'type-btn--active-income' : ''}`}
          onClick={() => setType('income')}
        >
          Income
        </button>
      </div>

      <div className="transaction-form__row">
        <input
          type="number"
          step="0.01"
          min="0"
          className="transaction-form__input"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="transaction-form__select"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <input
        type="text"
        className="transaction-form__input"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button type="submit" className="transaction-form__submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
