import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, otp, password } = reqBody;

        if (!email || !otp || !password) {
            return NextResponse.json({ 
                error: 'Email, verification code, and new password are required' 
            }, { status: 400 });
        }

        // Find user with the provided email and OTP
        const user = await User.findOne({ 
            email: email,
            resetPasswordOtp: otp,
            resetPasswordOtpExpiry: { $gt: new Date() } // Check if OTP has not expired
        }).exec();

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
        }

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Update user password and clear reset tokens
        user.password = hashedPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password has been reset successfully",
            success: true
        });
    } catch (error: any) {
        console.error('Error resetting password:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 