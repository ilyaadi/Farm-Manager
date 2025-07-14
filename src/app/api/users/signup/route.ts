import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from '@/helpers/sendEmail';
import crypto from 'crypto';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log("Received request body:", reqBody);

        // Check if the user already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Generate verification token and expiry
        const verificationToken = jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
        const verificationTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Generate OTP (6 digits)
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 600000); // 10 minutes from now

        // Create temporary user
        const tempUser = new User({
            username,
            email,
            password: hashedPassword,
            verifyToken: verificationToken,
            verifyTokenExpiry: verificationTokenExpiry,
            otp: otp,
            otpExpiry: otpExpiry,
            isVerified: false
        });

        // Save temporary user to the database
        const savedTempUser = await tempUser.save();
        console.log("Saved temporary user:", savedTempUser);

        try {
            // Send verification email with OTP
            await sendVerificationEmail(email, verificationToken, otp);
            
            // Return success response without setting cookies
            return NextResponse.json({
                message: "Verification code sent to your email",
                success: true,
                email: email,
                requiresVerification: true
            });
        } catch (emailError: any) {
            console.error("Error sending verification email:", emailError);
            
            // Delete the user if email sending fails
            await User.findByIdAndDelete(savedTempUser._id);
            
            return NextResponse.json({ 
                error: "Failed to send verification email. Please try again later." 
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error in user registration:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
