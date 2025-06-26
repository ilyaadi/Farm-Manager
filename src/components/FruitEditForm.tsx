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

      <form onSubmit={handleSubmit}>
      <div className="container">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Count`</label>
        <input
          type="number"
          name="count"
          value={formData.count}
          onChange={handleChange}
          required
        />

        <label>Row</label>
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

        <label>Collumn</label>
        <select
          name="collumn"
          value={formData.collumn}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>Collumn</option>
                <option value="" disabled hidden>Collumn</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
        </select>

        <label>Message</label>
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button className="submit-button">Update Fruit</button>
        <button className="submit-button" onClick={handleDelete}>
          Delete
        </button>
        </div>
        {error ? <p className="error-message">{error}</p> : <p className="success-message">{success}</p>}
      </form>

  );
};

export default FruitEditForm;
