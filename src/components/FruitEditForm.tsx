"use client";

import { useState, useEffect } from "react";

const FruitEditForm = ({ fruitId }: { fruitId: string }) => {
  const [formData, setFormData] = useState({
    date: "",
    count: "",
    row: "", // default to "Expense"
    collumn: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch the existing expense data by ID when the component loads
  useEffect(() => {
    const fetchFruit = async () => {
      try {
        const response = await fetch(`/api/users/fruitEdit?id=${fruitId}`);
        if (!response.ok) throw new Error("Failed to fetch fruit");
        const fruit = await response.json();
        setFormData(fruit); // Load the fetched data into the form
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFruit();
  }, [fruitId]);

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
      const response = await fetch(`/api/users/fruitEdit?id=${fruitId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update fruit");
      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Fruit updated successfully.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle delete button click
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this fruit?")) {
      try {
        const response = await fetch(`/api/users/fruitEdit?id=${fruitId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete fruit");
        setSuccess("Fruit deleted successfully.");
        setFormData({ date: "", count: "", row: "", collumn: "", message: "" }); // Clear the form
        // Optionally redirect or perform another action here
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

 if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;

return (
  <form onSubmit={handleSubmit} className="container">
    <label className="form-label">Date</label>
    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      required
    />

    <label className="form-label">Count</label>
    <input
      type="number"
      name="count"
      value={formData.count}
      onChange={handleChange}
      required
    />

    <label className="form-label">Row</label>
    <select
      name="row"
      value={formData.row}
      onChange={handleChange}
      required
    >
      <option value="" disabled hidden>Row</option>
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
      <option value="d">D</option>
    </select>

    <label className="form-label">Collumn</label>
    <select
      name="collumn"
      value={formData.collumn}
      onChange={handleChange}
      required
    >
      <option value="" disabled hidden>Collumn</option>
      {[...Array(24)].map((_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>

    <label className="form-label">Message</label>
    <input
      type="text"
      name="message"
      value={formData.message}
      onChange={handleChange}
      required
    />

    <button className="submit-button">Update Fruit</button>
    <button type="button" className="delete-button" onClick={handleDelete}>
      Delete
    </button>
    {error ? <p className="error-message">{error}</p> : <p className="success-message">{success}</p>}
  </form>
);
};

export default FruitEditForm;
