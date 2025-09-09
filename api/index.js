require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");

const app = express();
const port = 4040;

app.use(cors());
app.use(express.json());

// Connect to MongoDB when the server starts
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Could not connect to MongoDB:", error));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Test OK" });
});

// Create a new transaction
app.post("/api/transaction", async (req, res) => {
  try {
    const { name, description, datetime, amount } = req.body;

    const transaction = await Transaction.create({
      name,
      description,
      datetime: new Date(datetime), // ensure Date object
      amount,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
});

// Get all transactions
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

// Delete a transaction
app.delete("/api/transaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
});

// Update a transaction
app.put("/api/transaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
