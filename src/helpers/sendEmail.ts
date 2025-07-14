import nodemailer from 'nodemailer';

export async function sendVerificationEmail(to: string, token: string, otp: string) {
    console.log(`Attempting to send verification email to ${to} with OTP: ${otp}`);
    
    // Check if email credentials are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email credentials are missing. Please set EMAIL_USER and EMAIL_PASS in your .env file');
        throw new Error('Email configuration is incomplete');
    }

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false // Helps in development environments
        }
    });

    // Verify transporter configuration
    try {
        await transporter.verify();
        console.log('SMTP connection verified successfully');
    } catch (error) {
        console.error('SMTP verification failed:', error);
        throw new Error('Failed to connect to email server');
    }

    // Email content
    const mailOptions = {
        from: `"Farm Manager" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verify your email address',
        text: `Your OTP for email verification is: ${otp}\n\nPlease use this code to verify your email address. This code will expire in 10 minutes.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <h2 style="color: #333;">Email Verification</h2>
                <p>Thank you for signing up! Please use the following OTP to verify your email address:</p>
                <div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                    ${otp}
                </div>
                <p>This code will expire in 10 minutes.</p>
                <p>If you did not request this verification, please ignore this email.</p>
            </div>
        `,
    };

    // Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
} 