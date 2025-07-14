"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL query parameter
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setIsError(true);
      setMessage("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await axios.post("/api/users/reset-password", {
        email,
        otp,
        password
      });
      
      if (response.data.success) {
        setMessage("Password has been reset successfully");
        // Redirect to login page after successful password reset
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error:", error);
      setIsError(true);
      setMessage(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <p className="mb-4 text-gray-600">
          Enter the verification code sent to your email and your new password.
        </p>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
          className="w-full p-2 border rounded mb-4"
        />
        
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="Verification code"
          className="w-full p-2 border rounded mb-4"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="New password"
          className="w-full p-2 border rounded mb-4"
        />
        
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm new password"
          className="w-full p-2 border rounded mb-4"
        />
        
        <button
          className="submit-button w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        
        {message && (
          <p className={`mt-4 text-center ${isError ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ResetPasswordForm; 