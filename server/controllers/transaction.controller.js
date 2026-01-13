import Transaction from '../models/Transaction.js'



// ADD TRANSACTION
export const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, note, date } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      note,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET USER TRANSACTIONS
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    // Ownership check
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const { type, amount, category, note, date } = req.body

    transaction.type = type ?? transaction.type
    transaction.amount = amount ?? transaction.amount
    transaction.category = category ?? transaction.category
    transaction.note = note ?? transaction.note
    transaction.date = date ?? transaction.date

    const updatedTransaction = await transaction.save()

    res.json(updatedTransaction)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}
