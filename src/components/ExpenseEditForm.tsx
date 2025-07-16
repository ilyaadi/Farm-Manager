"use client";

import { useState, useEffect } from "react";

const ExpenseEditForm = ({ expenseId }: { expenseId: string }) => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "Expense", // default to "Expense"
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch the existing expense data by ID when the component loads
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`/api/users/expenseEdit?id=${expenseId}`);
        if (!response.ok) throw new Error("Failed to fetch expense");
        const expense = await response.json();
        setFormData(expense); // Load the fetched data into the form
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExpense();
  }, [expenseId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/users/expenseEdit?id=${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update expense");
      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Expense updated successfully.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle delete button click
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await fetch(`/api/users/expenseEdit?id=${expenseId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete expense");
        setSuccess("Expense deleted successfully.");
        setFormData({ date: "", amount: "", category: "Expense", description: "" }); // Clear the form
        // Optionally redirect or perform another action here
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

      <form onSubmit={handleSubmit}>
      <div className="container">
        <label className="form-label">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label className="form-label">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label className="form-label">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Asset">Asset</option>
          <option value="Expense">Expense</option>
        </select>

        <label className="form-label">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button className="submit-button">Update Expense</button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        </div>
        {error ? <p className="error-message">{error}</p> : <p className="success-message">{success}</p>}
      </form>

  );
};

export default ExpenseEditForm;
