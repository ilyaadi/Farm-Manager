import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, otp } = reqBody;

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        // Find user with the provided email and OTP
        const user = await User.findOne({ 
            email: email,
            otp: otp,
            otpExpiry: { $gt: new Date() } // Check if OTP has not expired
        }).exec();

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
        }

        // Update user verification status
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        // Generate JWT token for authentication
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // Prepare response with the token set in cookies
        const response = NextResponse.json({
            message: "Email verified successfully",
            success: true,
            userId: user._id,
        });

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure the cookie is secure in production
            sameSite: "strict",
            path: "/",
            maxAge: 24 * 60 * 60, // 1 day
        });

        return response;
    } catch (error: any) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 