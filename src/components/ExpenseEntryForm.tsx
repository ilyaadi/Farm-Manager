"use client";

import { expenseEntry } from "@/actions";
import { useFormState } from "react-dom";
import React from "react";

const ExpenseEntryForm = () => {
    const [state, formAction] = useFormState<any, FormData>(expenseEntry, undefined);
    console.log(`inside ExpenseEntryForm`);

    return (
        <form action={formAction} className="container">
            <input type="date" name="date" required />
            <input type="number" name="amount" required placeholder="Amount" />
            <select id="category" name="category">
                <option value="" disabled hidden>Category</option>
                <option value="asset">Asset</option>
                <option value="expense">Expense</option>
            </select>
            <input type="text" name="description" required placeholder="Expense Description" />
            <button className="submit-button">Save</button>
            {state?.error && <p className="error-message">{state.error}</p>}
        </form>
    );
};

export default ExpenseEntryForm;
