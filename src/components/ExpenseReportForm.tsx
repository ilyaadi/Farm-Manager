"use client";

import { expenseReport } from "@/actions";
import { useFormState } from "react-dom";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
//import Expense from "@/models/expense";

interface Expense {
    _id: string;
    date: string;
    amount: number;
    description: string;
    category: string;
  }
  

const getCurrentDate = () => new Date().toISOString().split('T')[0];
const formatDate = (dateString: string) => new Date(dateString).toISOString().split('T')[0];

const InputField = ({ label, id, type, value, onChange, ...props }: any) => (
    <div className="input-field">
        <label htmlFor={id} className="label">{label}</label>
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
            className="select"
        >
            <option value="" disabled hidden>Select {label}</option>
            {options.map((option: any) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const ExpenseReportForm = () => {
    const [state, formAction] = useFormState<any, FormData>(expenseReport, undefined);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState(getCurrentDate());
    const [category, setCategory] = useState('');

    const fetchExpenses = async () => {
        const response = await fetch('/api/users/expenseReport', { credentials: 'include' });
        if (response.ok) {
            const data: Expense[] = await response.json();
            setExpenses(data);
            setFilteredExpenses(data);
        } else {
            alert('Failed to fetch expenses');
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const filterExpenses = () => {
        let filtered = expenses;
        if (dateFrom) {
            filtered = filtered.filter((expense) => new Date(expense.date) >= new Date(dateFrom));
        }
        if (dateTo) {
            filtered = filtered.filter((expense) => new Date(expense.date) <= new Date(dateTo));
        }
        if (category) {
            filtered = filtered.filter((expense) => expense.category === category);
        }
        setFilteredExpenses(filtered);
    };

    return (
        <div className="reports-center">
            <div className="reports-container">
                <div className="filter-container">
                    <InputField
                        label="From"
                        id="dateFrom"
                        type="date"
                        value={dateFrom}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
                    />
                    <InputField
                        label="To"
                        id="dateTo"
                        type="date"
                        value={dateTo}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
                    />
                    <SelectField
                        label="Category"
                        id="filterCategory"
                        value={category}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                        options={[
                            { value: "asset", label: "Asset" },
                            { value: "expense", label: "Expense" },
                        ]}
                    />
                    <button onClick={filterExpenses} className="filter-button">
                        Filter
                    </button>
                </div>

                <table className="reports-table">
                    <thead>
                        <tr className="table-header">
                            <th className="table-heading">Date</th>
                            <th className="table-heading">Amount</th>
                            <th className="table-heading">Description</th>
                            <th className="table-heading">Category</th>
                            <th className="table-heading"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((expense, index) => (
                                <tr key={index} className="table-row">
                                    <td className="table-cell">{formatDate(expense.date)}</td>
                                    <td className="table-cell">{expense.amount}</td>
                                    <td className="table-cell">{expense.description}</td>
                                    <td className="table-cell">{expense.category}</td>
                                    <td className="table-cell">
                                        <Link href={`/expenseEdit/${expense._id}`} className="edit-link">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="table-cell no-data">No expenses found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseReportForm;
