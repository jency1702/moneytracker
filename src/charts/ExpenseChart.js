import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ExpenseChart({ transactions, initialIncome }) {
  const totalExpense = transactions.reduce((acc, t) => acc + t.amount, 0);
  const balance = initialIncome - totalExpense;

  const data = [
    { name: "Expense", value: totalExpense },
    { name: "Remaining Balance", value: balance > 0 ? balance : 0 },
  ];

  const COLORS = ["#ef4444", "#3b82f6"];

  return (
    <div className="chart-container">
      <h2>📊 Expense vs Balance</h2>
      <PieChart width={350} height={250}>
        <Pie
          data={data}
          cx={150}
          cy={100}
          outerRadius={90}
          dataKey="value"
          label={({ name, value }) => `${name}: $${value}`}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseChart;
