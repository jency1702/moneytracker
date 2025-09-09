// src/charts/IncomeExpenseBar.js
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function IncomeExpenseBar({ transactions, initialIncome }) {
  const totalExpense = transactions.reduce((acc, t) => acc + t.amount, 0);
  const balance = initialIncome - totalExpense;

  const data = [
    { name: "Expense", amount: totalExpense },
    { name: "Balance", amount: balance > 0 ? balance : 0 },
  ];

  return (
    <div className="chart-container">
      <h2>📈 Expense vs Balance Bar</h2>
      <BarChart width={350} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#60a5fa" />
      </BarChart>
    </div>
  );
}

export default IncomeExpenseBar;
