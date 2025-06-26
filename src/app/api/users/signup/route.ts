import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to the database
        const savedUser = await newUser.save();
        console.log("Saved user:", savedUser);

        // Generate JWT token
        const tokenData = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // Prepare response with the token set in cookies
        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
            userId: savedUser._id,
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
        console.error("Error in user registration:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
