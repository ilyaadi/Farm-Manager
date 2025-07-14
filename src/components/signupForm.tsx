"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupForm = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [otp, setOtp] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [emailForOtp, setEmailForOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!showOtpField) {
                // Initial signup request
                const response = await axios.post("/api/users/signup", user);
                if (response.data.success) {
                    setShowOtpField(true);
                    setEmailForOtp(user.email);
                    setError("Verification code sent to your email. Please check and enter below.");
                }
            } else {
                // OTP verification
                const response = await axios.post("/api/users/verifyOtp", {
                    email: emailForOtp,
                    otp: otp
                });
                if (response.data.success) {
                    setError("Email verified successfully. Redirecting to login...");
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000);
                }
            }
        } catch (error: any) {
            console.error("Error:", error);
            setError(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                {!showOtpField ? (
                    <>
                        <input 
                            type="text" 
                            name="username" 
                            value={user.username}
                            onChange={handleChange}
                            required 
                            placeholder="username"
                        />
                        <input 
                            type="email" 
                            name="email" 
                            value={user.email}
                            onChange={handleChange}
                            required 
                            placeholder="email"
                        />
                        <input 
                            type="password" 
                            name="password" 
                            value={user.password}
                            onChange={handleChange}
                            required 
                            placeholder="password"
                        />
                        <button 
                            className="submit-button" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Signup"}
                        </button>
                    </>
                ) : (
                    <>
                        <input 
                            type="text" 
                            name="otp" 
                            value={otp}
                            onChange={handleOtpChange}
                            required 
                            placeholder="Enter verification code"
                        />
                        <button 
                            className="submit-button" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                    </>
                )}
                {error && <p className={error.includes("successfully") ? "success-message" : "error-message"}>{error}</p>}
            </div>
        </form>
    );
};

export default SignupForm;
