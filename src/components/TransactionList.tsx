import type { Transaction } from '../types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

function TransactionList({ transactions, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p className="transaction-list__empty">No transactions yet. Add your first one above.</p>;
  }

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ul className="transaction-list">
      {sorted.map((t) => (
        <li key={t.id} className={`transaction-item transaction-item--${t.type}`}>
          <div className="transaction-item__info">
            <span className="transaction-item__category">{t.category}</span>
            {t.note && <span className="transaction-item__note">{t.note}</span>}
            <span className="transaction-item__date">
              {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
          </div>
          <div className="transaction-item__right">
            <span className="transaction-item__amount">
              {t.type === 'income' ? '+' : '-'}₹{t.amount.toFixed(2)}
            </span>
            <button
              className="transaction-item__delete"
              onClick={() => onDelete(t.id)}
              aria-label="Delete transaction"
            >
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
