"use client";

import { login } from "@/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
    const [state, formAction] = useFormState<any, FormData>(login, undefined);
    console.log(`inside LoginForm`)

    return (
        <form action={formAction}>
          <div className="container">
            <input type="text" name="username" required placeholder="username"/>
            <input type="password" name="password" required placeholder="password"/>
            <button className="submit-button">Login</button>
            {state?.error && <p>{state.error}</p>}
          </div>
        </form>
    );
};

export default LoginForm;
