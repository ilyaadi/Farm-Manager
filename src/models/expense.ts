import mongoose, { Schema, models, model } from "mongoose";

const expenseSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Please provide a date"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide an amount"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  category: {
    type: String,
    enum: ['asset', 'expense'], 
    required: [true, "Please provide a category"],
  },
});

const Expense = models.Expense || model("Expense", expenseSchema);
export default Expense;
