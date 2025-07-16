export const dynamic = "force-dynamic";
import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function GET(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Verification token is missing' }, { status: 400 });
        }

        // Verify token
        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const user = await User.findOne({ email: decoded.email, verifyToken: token }).exec();

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
        }

        // Check if token is expired
        if (user.verifyTokenExpiry < new Date()) {
            return NextResponse.json({ error: 'Verification token has expired' }, { status: 400 });
        }

        // Update user verification status
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: 'Email verified successfully', success: true });
    } catch (error: any) {
        console.error('Error verifying email:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 