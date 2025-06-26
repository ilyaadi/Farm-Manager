"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const getCurrentDate = () => new Date().toISOString().split('T')[0];
const formatDate = (dateString: string) => new Date(dateString).toISOString().split('T')[0];

const InputField = ({ label, id, type, value, onChange, ...props }: any) => (
    <div className="input-field">
        <label htmlFor={id} className="block mb-1 text-gray-700">{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className="input"
            {...props}
        />
    </div>
);

const SelectField = ({ label, id, value, onChange, options }: any) => (
    <div className="input-field">
        <label htmlFor={id} className="label">{label}</label>
        <select
            id={id}
            value={value}
            onChange={onChange}
            className="input"
        >
            <option value="" disabled hidden>Select {label}</option>
            {options.map((option: any) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const LabourReportForm = () => {
    const [labours, setLabours] = useState<any[]>([]);
    const [filteredLabours, setFilteredLabours] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>(getCurrentDate());
    const [name, setName] = useState<string>("");

    const fetchLabours = async () => {
        try {
            const response = await fetch('/api/users/labourReport');
            if (response.ok) {
                const data = await response.json();
                setLabours(data);
                setFilteredLabours(data); // Initially show all labours
            } else {
                setError('Failed to fetch labour data');
            }
        } catch (error) {
            setError("Failed to fetch labour data.");
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchLabours();
    }, []);

    const filterLabours = () => {
        let filtered = labours;
        if (startDate) {
            filtered = filtered.filter((labour) => new Date(labour.date) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter((labour) => new Date(labour.date) <= new Date(endDate));
        }
        if (name) {
            filtered = filtered.filter((labour) => labour.name === name);
        }
        setFilteredLabours(filtered);
    };

    return (
        <div className="reports-container">
            <div className="filter-container">
            <InputField
                label="Start Date"
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
            />
            <InputField
                label="End Date"
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
            />
                {/* <InputField
                    label="Start Date"
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <InputField
                    label="End Date"
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                /> */}
                <SelectField
                    label="Name"
                    id="filterName"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setName(e.target.value)}
                    options={[
                        { value: "", label: "All" },
                        { value: "sushil", label: "sushil" },
                        { value: "amit", label: "amit" },
                    ]}
                />
                {/* <SelectField
                    label="Name"
                    id="filterName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    options={[
                        { value: "", label: "All" },
                        { value: "sushil", label: "sushil" },
                        { value: "amit", label: "amit" },
                    ]}
                /> */}
                <button onClick={filterLabours} className="filter-button">
                    Filter
                </button>
            </div>

            {/* Table Section */}
            <table className="reports-table">
                <thead>
                    <tr className="table-header">
                        <th className="table-heading">Date</th>
                        <th className="table-heading">Shift</th>
                        <th className="table-heading">Name</th>
                        <th className="table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLabours.length > 0 ? (
                        filteredLabours.map((labour, index) => (
                            <tr key={index} className="table-row">
                                <td className="table-cell">{formatDate(labour.date)}</td>
                                <td className="table-cell">{labour.shift}</td>
                                <td className="table-cell">{labour.name}</td>
                                <td className="table-cell">
                                    <Link href={`/labourEdit/${labour._id}`} className="text-blue-500 hover:underline">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="p-2 text-center border border-gray-300">No labours found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LabourReportForm;
