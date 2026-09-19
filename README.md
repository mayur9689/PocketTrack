# PocketTrack — Expense Tracker

A React + TypeScript app to track income and expenses. All data is saved in the
browser's localStorage, so it stays there even after you close and reopen the page.

## Features
- Add income or expense transactions with amount, category, and an optional note
- See total income, total expenses, and running balance calculated live
- Delete any transaction
- Data persists using localStorage — no backend or database needed
- Fully typed with TypeScript

## Tech Stack
- React 18
- TypeScript
- Vite
- Plain CSS
- Browser localStorage API

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed localhost link.

## Project Structure
```
src/
  components/
    BalanceSummary.tsx   # Shows income, expense, and balance totals
    TransactionForm.tsx  # Form to add a new transaction
    TransactionList.tsx  # Shows all transactions, newest first
  types/
    transaction.ts        # TypeScript types (Transaction, Category)
  App.tsx                  # Main logic: state, localStorage sync, calculations
  App.css                  # Styling
  main.tsx                 # React entry point
```

## How It Works (for interview explanation)
1. When a transaction is added, it's stored in React state (`useState`).
2. A `useEffect` runs every time the transaction list changes, saving it to
   `localStorage` as a JSON string.
3. When the app first loads, another `useEffect` reads from `localStorage` and
   restores any saved transactions.
4. Totals (income, expense, balance) are calculated using `useMemo`, so they only
   recalculate when the transaction list actually changes — not on every render.

## Possible Next Steps
- Add a chart showing spending by category (e.g. using Chart.js)
- Add monthly filtering
- Add editing an existing transaction, not just delete
