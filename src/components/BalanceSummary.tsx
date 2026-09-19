interface BalanceSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

function BalanceSummary({ totalIncome, totalExpense, balance }: BalanceSummaryProps) {
  return (
    <div className="summary">
      <div className="summary__card summary__card--balance">
        <span className="summary__label">Balance</span>
        <span className="summary__value">₹{balance.toFixed(2)}</span>
      </div>
      <div className="summary__card">
        <span className="summary__label">Income</span>
        <span className="summary__value summary__value--income">₹{totalIncome.toFixed(2)}</span>
      </div>
      <div className="summary__card">
        <span className="summary__label">Expenses</span>
        <span className="summary__value summary__value--expense">₹{totalExpense.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default BalanceSummary;
