"use client";

import { login } from "@/actions";
import { useFormState } from "react-dom";
import Link from "next/link";

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
            <div className="mt-2 text-center">
              <Link href="/forgot-password" className="forgot-password-link">
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
    );
};

export default LoginForm;
