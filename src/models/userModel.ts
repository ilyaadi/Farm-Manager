import mongoose, { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
 
    verifyToken: String,
    verifyTokenExpiry: Date,
    otp: String,
    otpExpiry: Date,
});

const User = models.User || model("User", userSchema);

export default User;
