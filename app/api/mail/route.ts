// pages/api/send-email.js
import transporter from "@/lib/nodemailer"; // Update the import path
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

function generateRandom6DigitNumber(): number {
    const min = 100000;
    const max = 999999;

    // Generate a random number between min and max (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}


export async function POST(req: Request) {
    try {
        const credentials = await req.json();

        const otp = generateRandom6DigitNumber();
        const mailOptions = {
            from: 'testvaxad@gmail.com',
            to: credentials?.email as string,
            subject: "Email verification for Vshoot",
            text: `Your otp is ${otp}`,
        };
        const updatedUser = await prisma.user.update({
            where: { id: credentials?.id },
            data: {
                otp: otp
            },
        })
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Email sending failed' });
    }
};
