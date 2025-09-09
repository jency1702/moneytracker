import { useState } from "react";

function IncomeSetup({ initialIncome, setInitialIncome }) {
  const [incomeInput, setIncomeInput] = useState("");

  const handleSetIncome = () => {
    const value = parseFloat(incomeInput);
    if (isNaN(value) || value <= 0)
      return alert("Enter a valid positive income");
    setInitialIncome(value);
    setIncomeInput("");
  };

  return (
    <div className="income-setup">
      <input
        type="number"
        placeholder="Set initial income"
        value={incomeInput}
        onChange={(e) => setIncomeInput(e.target.value)}
      />
      <button onClick={handleSetIncome}>Set Income</button>
    </div>
  );
}

export default IncomeSetup;
