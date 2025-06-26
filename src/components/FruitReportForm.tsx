"use client";

import { fruitReport } from "@/actions";
import { useFormState } from "react-dom";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Fruit {
    _id: string;
    date: string;
    count: number;
    message: string;
    row: string;
    collumn: string;
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

const FruitReportForm = () => {
    const [fruit, setFruit] = useState<Fruit[]>([]);
    const [filteredFruit, setFilteredFruit] = useState<Fruit[]>([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState(getCurrentDate());
    const [row, setRow] = useState('');
    const [collumn, setCollumn] = useState('');

    const fetchFruit = async () => {
        const response = await fetch('/api/users/fruitReport');
        if (response.ok) {
            const data: Fruit[] = await response.json();
            setFruit(data);
            setFilteredFruit(data);
        } else {
            alert('Failed to fetch fruits');
        }
    };

    useEffect(() => {
        fetchFruit();
    }, []);

    const filterFruit = () => {
        let filtered = fruit;
        if (dateFrom) {
            filtered = filtered.filter((fruit) => new Date(fruit.date) >= new Date(dateFrom));
        }
        if (dateTo) {
            filtered = filtered.filter((fruit) => new Date(fruit.date) <= new Date(dateTo));
        }
        if (row) {
            filtered = filtered.filter((fruit) => fruit.row === row);
        }
        if (collumn) {
            filtered = filtered.filter((fruit) => String(fruit.collumn) === collumn);
        }
        setFilteredFruit(filtered);
    };

    return (
        <div className="reports-container">
            <div className="filter-container">
                <InputField
                    label="Date From"
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
                />
                <InputField
                    label="Date To"
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
                />

                <SelectField
                    label="Row"
                    id="filterRow"
                    value={row}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRow(e.target.value)}
                    options={[
                        { value: "a", label: "a" },
                        { value: "b", label: "b" },
                        { value: "c", label: "c" },
                        { value: "d", label: "d" },
                    ]}
                />
                <SelectField
                    label="Collumn"
                    id="filterCollumn"
                    value={collumn}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCollumn(e.target.value)}
                    options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                        { value: "9", label: "9" },
                        { value: "10", label: "10" },
                        { value: "11", label: "11" },
                        { value: "12", label: "12" },
                        { value: "13", label: "13" },
                        { value: "14", label: "14" },
                        { value: "15", label: "15" },
                        { value: "16", label: "16" },
                        { value: "17", label: "17" },
                        { value: "18", label: "18" },
                        { value: "19", label: "19" },
                        { value: "20", label: "20" },
                        { value: "21", label: "21" },
                        { value: "22", label: "22" },
                        { value: "23", label: "23" },
                        { value: "24", label: "24" },
                    ]}
                    />
                <button onClick={filterFruit} className="filter-button">
                    Filter
                </button>
            </div>

            <table className="reports-table">
            <thead>
                <tr className="table-header">
                    <th className="table-heading">Date</th>
                    <th className="table-heading">Count</th>
                    <th className="table-heading">Row</th>
                    <th className="table-heading">Collumn</th>
                    <th className="table-heading"></th>
                </tr>
            </thead>
                <tbody>
                    {filteredFruit.length > 0 ? (
                        filteredFruit.map((fruit, index) => (
                            <tr key={index} className="table-row">
                                <td className="table-cell">{formatDate(fruit.date)}</td>
                                <td className="table-cell">{fruit.count}</td>
                                <td className="table-cell">{fruit.row}</td>
                                <td className="table-cell">{fruit.collumn}</td>
                                <td className="table-cell">
                                    <Link href={`/fruitEdit/${fruit._id}`} className="edit-link">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="table-cell no-data">No fruits found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FruitReportForm;
