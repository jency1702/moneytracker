function IncomeSummary({ transactions, initialIncome }) {
  // Total expense is sum of all transaction amounts (all are expenses)
  const totalExpense = transactions.reduce((acc, t) => acc + t.amount, 0);

  // Balance = initial income - total expenses
  const balance = initialIncome - totalExpense;

  return (
    <div className="income-summary">
      <h2>💰 Income & Expense Summary</h2>
      <div className="summary-cards">
        <div className="card income">Initial Income: ${initialIncome}</div>
        <div className="card expense">Expense: ${totalExpense}</div>
        <div className="card balance">Balance: ${balance}</div>
      </div>
    </div>
  );
}

export default IncomeSummary;
