import { useState, useEffect } from "react";
import "./App.css";
import IncomeSummary from "./components/IncomeSummary";
import ExpenseChart from "./charts/ExpenseChart";
import IncomeExpenseBar from "./charts/IncomeExpenseBar";
import IncomeSetup from "./components/IncomeSetup";

function App() {
  const [initialIncome, setInitialIncome] = useState(0);
  const [name, setName] = useState("");
  const [datetime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch transactions
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL ||
            "http://localhost:4040/api/transactions"
        );
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    fetchTransactions();
  }, []);

  async function addNewTransactions(ev) {
    ev.preventDefault();
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount)) {
      alert("Please enter a valid number for the amount.");
      return;
    }

    const url = editingId
      ? `http://localhost:4040/api/transaction/${editingId}`
      : "http://localhost:4040/api/transaction";
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          datetime,
          amount: transactionAmount,
        }),
      });

      if (!response.ok)
        throw new Error(`${editingId ? "Update" : "Create"} failed`);

      const updatedTransactionsResponse = await fetch(
        process.env.REACT_APP_API_URL ||
          "http://localhost:4040/api/transactions"
      );
      const updatedTransactions = await updatedTransactionsResponse.json();
      setTransactions(updatedTransactions);

      setName("");
      setDateTime("");
      setDescription("");
      setAmount("");
      setEditingId(null);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  }

  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    try {
      const response = await fetch(
        `http://localhost:4040/api/transaction/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete transaction");
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const editTransaction = (transaction) => {
    setName(transaction.name);
    setDescription(transaction.description);
    setDateTime(transaction.datetime.slice(0, 16));
    setAmount(transaction.amount);
    setEditingId(transaction._id);
  };

  return (
    <main className="container">
      <h1>
        Money<span>Tracker</span>
      </h1>

      {/* Set initial income */}
      <IncomeSetup
        initialIncome={initialIncome}
        setInitialIncome={setInitialIncome}
      />

      {/* Summary & Charts */}
      <IncomeSummary
        transactions={transactions}
        initialIncome={initialIncome}
      />
      <div className="charts">
        <ExpenseChart
          transactions={transactions}
          initialIncome={initialIncome}
        />
        <IncomeExpenseBar
          transactions={transactions}
          initialIncome={initialIncome}
        />
      </div>

      {/* Transaction Form */}
      <div className="left-panel">
        <form onSubmit={addNewTransactions}>
          <div className="basics">
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder={"+200 new samsung tv"}
              required
            />
            <input
              value={datetime}
              onChange={(ev) => setDateTime(ev.target.value)}
              type="datetime-local"
              required
            />
            <input
              type="number"
              value={amount}
              onChange={(ev) => setAmount(ev.target.value)}
              placeholder={"Amount"}
              required
            />
          </div>

          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder={"description"}
              required
            />
          </div>

          <button type="submit">
            {editingId ? "Update Transaction" : "Add new Transaction"}
          </button>
        </form>

        {/* Transactions List */}
        <div className="transactions">
          {transactions.length === 0 ? (
            <p>No transactions added yet.</p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction._id} className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div
                    className={`price ${
                      transaction.amount < 0 ? "red" : "green"
                    }`}
                  >
                    {transaction.amount < 0
                      ? `-$${Math.abs(transaction.amount)}`
                      : `+$${transaction.amount}`}
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                  <button
                    className="edit-btn"
                    onClick={() => editTransaction(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTransaction(transaction._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import "./App.css";
// import IncomeSummary from "./components/IncomeSummary";
// import ExpenseChart from "./charts/ExpenseChart";
// import IncomeExpenseBar from "./charts/IncomeExpenseBar";
// import IncomeSetup from "./components/IncomeSetup";
// function App() {
//   const [initialIncome, setInitialIncome] = useState(0);

//   const [name, setName] = useState("");
//   const [datetime, setDateTime] = useState("");
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState(""); // string initially for input handling
//   const [transactions, setTransactions] = useState([]); // store all transactions
//   const [editingId, setEditingId] = useState(null); // for edit mode

//   // Fetch transactions when the component loads
//   useEffect(() => {
//     async function fetchTransactions() {
//       try {
//         const response = await fetch(
//           process.env.REACT_APP_API_URL ||
//             "http://localhost:4040/api/transactions"
//         );
//         const data = await response.json();
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     }
//     fetchTransactions();
//   }, []);

//   async function addNewTransactions(ev) {
//     ev.preventDefault();

//     const transactionAmount = parseFloat(amount);
//     if (isNaN(transactionAmount)) {
//       alert("Please enter a valid number for the amount.");
//       return;
//     }

//     const url = editingId
//       ? `http://localhost:4040/api/transaction/${editingId}`
//       : "http://localhost:4040/api/transaction";
//     const method = editingId ? "PUT" : "POST";

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({
//           name,
//           description,
//           datetime,
//           amount: transactionAmount,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(
//           `${editingId ? "Update" : "Create"} failed: ${response.statusText}`
//         );
//       }

//       const json = await response.json();
//       console.log(`Transaction ${editingId ? "updated" : "created"}:`, json);

//       // Refetch transactions after update/create
//       const updatedTransactionsResponse = await fetch(
//         process.env.REACT_APP_API_URL ||
//           "http://localhost:4040/api/transactions"
//       );
//       const updatedTransactions = await updatedTransactionsResponse.json();
//       setTransactions(updatedTransactions);

//       // Reset form fields
//       setName("");
//       setDateTime("");
//       setDescription("");
//       setAmount("");
//       setEditingId(null);
//     } catch (error) {
//       console.error("Error saving transaction:", error);
//     }
//   }

//   const deleteTransaction = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this transaction?"
//     );
//     if (!confirmed) return;

//     try {
//       const response = await fetch(
//         `http://localhost:4040/api/transaction/${id}`,
//         { method: "DELETE" }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete transaction");
//       }

//       // Remove deleted transaction from state
//       setTransactions(transactions.filter((t) => t._id !== id));
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//     }
//   };

//   const editTransaction = (transaction) => {
//     setName(transaction.name);
//     setDescription(transaction.description);
//     setDateTime(transaction.datetime.slice(0, 16)); // remove seconds
//     setAmount(transaction.amount);
//     setEditingId(transaction._id);
//   };

//   return (
//     <main className="container">
//       <h1>
//         Money<span>Tracker</span>
//       </h1>

//       {/* ✅ Summary & Charts Section */}
//       <IncomeSummary transactions={transactions} />
//       <div className="charts">
//         <ExpenseChart transactions={transactions} />
//         <IncomeExpenseBar transactions={transactions} />
//       </div>

//       <div className="left-panel">
//         <form onSubmit={addNewTransactions}>
//           <div className="basics">
//             <input
//               type="text"
//               value={name}
//               onChange={(ev) => setName(ev.target.value)}
//               placeholder={"+200 new samsung tv"}
//               required
//             />
//             <input
//               value={datetime}
//               onChange={(ev) => setDateTime(ev.target.value)}
//               type="datetime-local"
//               required
//             />
//             <input
//               type="number"
//               value={amount}
//               onChange={(ev) => setAmount(ev.target.value)}
//               placeholder={"Amount"}
//               required
//             />
//           </div>

//           <div className="description">
//             <input
//               type="text"
//               value={description}
//               onChange={(ev) => setDescription(ev.target.value)}
//               placeholder={"description"}
//               required
//             />
//           </div>

//           <button type="submit">
//             {editingId ? "Update Transaction" : "Add new Transaction"}
//           </button>
//         </form>

//         <div className="transactions">
//           {transactions.length === 0 ? (
//             <p>No transactions added yet.</p>
//           ) : (
//             transactions.map((transaction) => (
//               <div key={transaction._id} className="transaction">
//                 <div className="left">
//                   <div className="name">{transaction.name}</div>
//                   <div className="description">{transaction.description}</div>
//                 </div>
//                 <div className="right">
//                   <div
//                     className={`price ${
//                       transaction.amount < 0 ? "red" : "green"
//                     }`}
//                   >
//                     {transaction.amount < 0
//                       ? `-$${Math.abs(transaction.amount)}`
//                       : `+$${transaction.amount}`}
//                   </div>
//                   <div className="datetime">{transaction.datetime}</div>
//                   <button
//                     className="edit-btn"
//                     onClick={() => editTransaction(transaction)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => deleteTransaction(transaction._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
// export default App;
// return (
//   <main className="container">
//     <h1>
//       Money<span>Tracker</span>
//     </h1>

// <div className="left-panel">
//   <form onSubmit={addNewTransactions}>
//     <div className="basics">
//       <input
//         type="text"
//         value={name}
//         onChange={(ev) => setName(ev.target.value)}
//         placeholder={"+200 new samsung tv"}
//         required
//       />
//       <input
//         value={datetime}
//         onChange={(ev) => setDateTime(ev.target.value)}
//         type="datetime-local"
//         required
//       />
//       <input
//         type="number"
//         value={amount}
//         onChange={(ev) => setAmount(ev.target.value)}
//         placeholder={"Amount"}
//         required
//       />
//     </div>

//     <div className="description">
//       <input
//         type="text"
//         value={description}
//         onChange={(ev) => setDescription(ev.target.value)}
//         placeholder={"description"}
//         required
//       />
//     </div>

//     <button type="submit">
//       {editingId ? "Update Transaction" : "Add new Transaction"}
//     </button>
//   </form>

//   <div className="transactions">
//     {transactions.length === 0 ? (
//       <p>No transactions added yet.</p>
//     ) : (
//       transactions.map((transaction) => (
//         <div key={transaction._id} className="transaction">
//           <div className="left">
//             <div className="name">{transaction.name}</div>
//             <div className="description">{transaction.description}</div>
//           </div>
//           <div className="right">
//             <div
//               className={`price ${
//                 transaction.amount < 0 ? "red" : "green"
//               }`}
//             >
//               {transaction.amount < 0
//                 ? `-$${Math.abs(transaction.amount)}`
//                 : `+$${transaction.amount}`}
//             </div>
//             <div className="datetime">{transaction.datetime}</div>
//             <button
//               className="edit-btn"
//               onClick={() => editTransaction(transaction)}
//             >
//               Edit
//             </button>
//             <button
//               className="delete-btn"
//               onClick={() => deleteTransaction(transaction._id)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))
//     )}
//   </div>
// </div>
//     </main>
//   );
// }

// export default App;
