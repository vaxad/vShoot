import prisma from "@/prisma/client";
import transporter from "../nodemailer";

const sendOtp = async (credentials: { id: string, email:string }) => {
function generateRandom6DigitNumber(): number {
    const min = 100000;
    const max = 999999;
  
    // Generate a random number between min and max (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomNumber;
  }

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
        }

export default sendOtp;