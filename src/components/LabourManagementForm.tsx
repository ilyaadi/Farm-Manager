"use client";

import { labourManagement } from "@/actions";
import { useFormState } from "react-dom";
import React from "react";

const LabourManagementForm = () => {
    const [state, formAction] = useFormState<any, FormData>(labourManagement, undefined);
    console.log("inside labourManagementForm");

    return (
        <form action={formAction} className="container">
            <input type="date" name="date" required placeholder="date" />
            <select id="name" name="name" required>
                <option value="" disabled hidden>Name</option>
                <option value="sushil">sushil</option>
                <option value="amit">amit</option>
            </select>
            <select id="shift" name="shift" required>
                <option value="" disabled hidden>Shift</option>
                <option value="full">full</option>
                <option value="half">half</option>
            </select>
            <button className="submit-button">Save</button>
            {state?.error && <p className="error-message">{state.error}</p>}
        </form>
    );
};

export default LabourManagementForm;
