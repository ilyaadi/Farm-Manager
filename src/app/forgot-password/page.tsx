"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      setLoading(true);
      setMessage("");
      setIsError(false);
      
      console.log(`Submitting forgot password request for email: ${email}`);
      const response = await axios.post("/api/users/forgot-password", { email });
      
      console.log("Response:", response.data);
      
      if (response.data.success) {
        setMessage("Password reset instructions sent to your email");
        // Redirect to reset password page with email parameter
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error:", error);
      setIsError(true);
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else if (error.message) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container">
        <h1 className="title">Forgot Password</h1>
        
        <form onSubmit={handleSubmit}>
          <p className="mb-4">
            Enter your email address and we'll send you a verification code to reset your password.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
          <button
            className="submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
          </button>
          {message && (
            <p className={isError ? "error-message" : "success-message"}>
              {message}
            </p>
          )}
          <div className="mt-4 text-center">
            <Link href="/login" className="forgot-password-link">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 