"use client";

import { useEffect, useState, useCallback } from "react";

const LabourEditForm = ({ labourId }: { labourId: string }) => {
    const [labour, setLabour] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [shift, setShift] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [success, setSuccess] = useState<string | null>(null);



    // Enum values from the Mongoose schema
    const namesOptions = ["sushil", "amit"]; // Names as per your schema
    const shiftsOptions = ["half", "full"]; // Shifts as per your schema

    // Fetch existing labour data based on the labourId
    const fetchLabour = useCallback(async () => {
        try {
            const response = await fetch(`/api/users/labourEdit/${labourId}`);
            if (response.ok) {
                const data = await response.json();
                setLabour(data);
                setName(data.name);
                setShift(data.shift);
                setDate(new Date(data.date).toISOString().split("T")[0]); // Format date to YYYY-MM-DD
            } else {
                setError('Failed to fetch labour data');
                console.error('Fetch error:', response.status, await response.json()); // Log response details
            }
        } catch (error) {
            setError("Failed to fetch labour data.");
            console.error("Fetch error:", error);
        }
    }, [labourId]);

    useEffect(() => {
        fetchLabour(); // Fetch labour data when component mounts
    }, [fetchLabour]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/users/labourEdit/${labourId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, shift, date }),
            });

            if (response.ok) {
                alert("Labour entry updated successfully!");
            } else {
                setError('Failed to update labour data');
            }
        } catch (error) {
            setError("Failed to update labour data.");
            console.error("Update error:", error);
        }
    };

    // Handle delete action
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this labour entry?")) {
            try {
                const response = await fetch(`/api/users/labourEdit/${labourId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error("Failed to delete labour");
                setSuccess("Labour record deleted successfully.");
                setName("");
                setShift("");
                setDate(new Date().toISOString().split("T")[0]); // Format date to YYYY-MM-DD
                
            } catch (error) {
                setError("Failed to delete labour entry.");
                console.error("Delete error:", error);
            }
        }
    };

    // Render error message if any
    if (error) return <p className="text-red-500">{error}</p>;

    // Show loading message while data is being fetched
    if (!labour) return <p>Loading...</p>;

    // Form for editing the labour entry
    return (
        <form >
            <div className="container">
                <label className="form-label">Name</label>
                <select
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a name</option>
                    {namesOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>


                <label className="form-label">Shift</label>
                <select
                    id="shift"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}

                    required
                >
                    <option value="" disabled>Select a shift</option>
                    {shiftsOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>

                <label className="form-label">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}

                    required
                />


                <button className="submit-button" onClick={handleSubmit}>
                    Save Changes
                </button>
                <button
                    className="delete-button"
                    onClick={handleDelete}>
                    Delete Record
                </button>
            </div>
            {error ? <p className="error-message">{error}</p> : <p className="success-message">{success}</p>}
        </form>
    );
};

export default LabourEditForm;
