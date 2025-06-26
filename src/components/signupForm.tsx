"use client";

import { signup } from "@/actions";
import { useFormState } from "react-dom";

const SignupForm = () => {
    const [state, formAction] = useFormState<any, FormData>(signup, undefined);
    console.log(`inside SignupForm`)

    return (
        <form action={formAction}>
          <div className="container">
            <input type="text" name="username" required placeholder="username"/>
            <input type="text" name="email" required placeholder="email"/>
            <input type="password" name="password" required placeholder="password"/>
            <button className="submit-button">Signup</button>
            {state?.error && <p>{state.error}</p>}
          </div>
        </form>
    );
};

export default SignupForm;
