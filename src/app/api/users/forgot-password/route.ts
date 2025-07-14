import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/helpers/sendEmail';
import mongoose from 'mongoose';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Find user with the provided email
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
        }

        console.log(`Found user: ${user._id}, email: ${user.email}`);
        console.log(`MongoDB connection state: ${mongoose.connection.readyState}`);
        
        // Generate OTP (6 digits)
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 600000); // 10 minutes from now

        console.log(`Generated OTP for ${email}: ${otp} (expires: ${otpExpiry})`);

        try {
            // Try direct assignment first
            console.log("Attempting to update user with direct assignment");
            user.resetPasswordOtp = otp;
            user.resetPasswordOtpExpiry = otpExpiry;
            await user.save();
            console.log("After save() call");
            
            // Verify OTP was saved correctly with direct assignment
            const userAfterDirectSave = await User.findOne({ email }).exec();
            console.log(`After direct save - OTP: ${userAfterDirectSave?.resetPasswordOtp}`);
            
            // Also try updateOne as a backup
            console.log("Also trying updateOne method");
            const updateResult = await User.updateOne(
                { email: email },
                { 
                    $set: { 
                        resetPasswordOtp: otp,
                        resetPasswordOtpExpiry: otpExpiry
                    } 
                }
            );
            console.log(`UpdateOne result: ${JSON.stringify(updateResult)}`);
            
            // Final verification
            const updatedUser = await User.findOne({ email }).exec();
            console.log(`Final verification - OTP for ${email}: ${updatedUser?.resetPasswordOtp}`);
            
            if (!updatedUser?.resetPasswordOtp) {
                console.error("Failed to save OTP to database after multiple attempts");
                return NextResponse.json({ 
                    error: "Failed to process password reset. Please try again." 
                }, { status: 500 });
            }
            
            // Send password reset email with OTP
            await sendPasswordResetEmail(email, otp);
            
            return NextResponse.json({
                message: "Password reset instructions sent to your email",
                success: true
            });
        } catch (error: any) {
            console.error("Error in OTP save or email sending:", error);
            
            // Try to reset the OTP if there was an error
            try {
                await User.updateOne(
                    { email: email },
                    { 
                        $unset: { 
                            resetPasswordOtp: "",
                            resetPasswordOtpExpiry: ""
                        } 
                    }
                );
            } catch (cleanupError) {
                console.error("Error cleaning up failed OTP:", cleanupError);
            }
            
            return NextResponse.json({ 
                error: "Failed to process password reset. Please try again later." 
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error in forgot password:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 