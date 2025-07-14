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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-600 mb-4">
            Enter your email address and we'll send you a verification code to reset your password.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
          </button>
          {message && (
            <p className={isError ? "text-red-500" : "text-green-500"}>
              {message}
            </p>
          )}
          <div className="mt-4 text-center">
            <Link href="/login" className="text-blue-500 hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 