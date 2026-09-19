export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food'
  | 'Rent'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Salary'
  | 'Other';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  note: string;
  date: string; // ISO date string
}
