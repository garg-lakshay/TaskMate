import express from 'express';
import User from '../model/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router1 = express.Router();

router1.post('/register', async (req, res) => {
    try {
        const { name, email, password }:{name:string , email:string , password:string} = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
});

router1.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router1.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const otp =Math.floor(100000 + Math.random()* 900000).toString();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
        user.resetOtp = otp;
        user.resetOtpExpiry = otpExpiry;
        await user.save();

        const transporter =nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            to: user.email, 
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router1.post("/reset-password", async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({
            email,
        })
        if(!user || user.resetOtp !== otp || !user.resetOtpExpiry || user.resetOtpExpiry < new Date()){
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = null;

        user.resetOtpExpiry = null;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    }
    catch(err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router1;


 


