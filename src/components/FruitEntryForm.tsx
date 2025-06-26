"use client";
import { useState } from "react";
import { expenseEntry } from "@/actions";
import { useFormState } from "react-dom";
import React from "react";
import { fruitEntry } from "@/actions";

const FruitEntryForm = () => {
    const [state, formAction] = useFormState<any, FormData>(fruitEntry, undefined);
    console.log(`inside FruitEntryForm`);
    return (
        <form action={formAction} className="container">
            <input type="date" name="date" required />
            <input type="number" name="count" required placeholder="Count" />
            <select id="row" name="row">
                <option value="" disabled hidden>Row</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
            </select>
            <select id="collumn" name="collumn" >
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
            <input type="text" name="message" required placeholder="Fruit Message" />
            <button className="submit-button">Save</button>
            {state?.error && <p className="error-message">{state.error}</p>}
        </form>
    );
};

export default FruitEntryForm;