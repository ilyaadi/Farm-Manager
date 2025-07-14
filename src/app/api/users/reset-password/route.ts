import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, otp, password } = reqBody;

        console.log(`Reset password attempt - Email: ${email}, OTP: ${otp}`);
        console.log(`MongoDB connection state: ${mongoose.connection.readyState}`);

        if (!email || !otp || !password) {
            return NextResponse.json({ 
                error: 'Email, verification code, and new password are required' 
            }, { status: 400 });
        }

        // Find the user
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            console.log(`User with email ${email} not found`);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Log all user data to see what's stored
        console.log(`User found: ${user._id}`);
        console.log(`User data: ${JSON.stringify(user.toObject(), null, 2)}`);
        
        // Check exact OTP comparison
        console.log(`OTP comparison: provided="${otp}", stored="${user.resetPasswordOtp}", match=${otp === user.resetPasswordOtp}`);
        
        // Validate OTP
        if (!user.resetPasswordOtp) {
            console.log(`No OTP found for user ${email}`);
            return NextResponse.json({ 
                error: 'No password reset was requested or the reset has expired. Please request a new password reset.' 
            }, { status: 400 });
        }
        
        if (user.resetPasswordOtp !== otp) {
            console.log(`OTP mismatch: "${otp}" !== "${user.resetPasswordOtp}"`);
            return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
        }
        
        if (user.resetPasswordOtpExpiry < new Date()) {
            console.log(`OTP expired at ${user.resetPasswordOtpExpiry}`);
            return NextResponse.json({ error: 'Verification code has expired. Please request a new password reset.' }, { status: 400 });
        }

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        console.log("Updating user password...");
        
        // Try direct update first
        user.password = hashedPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpiry = undefined;
        await user.save();
        
        // Also try updateOne as a backup
        const updateResult = await User.updateOne(
            { email: email },
            { 
                $set: { password: hashedPassword },
                $unset: { resetPasswordOtp: "", resetPasswordOtpExpiry: "" }
            }
        );
        console.log(`Password update result: ${JSON.stringify(updateResult)}`);

        console.log(`Password reset successful for user: ${email}`);
        return NextResponse.json({
            message: "Password has been reset successfully",
            success: true
        });
    } catch (error: any) {
        console.error('Error resetting password:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 