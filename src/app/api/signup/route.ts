import { sendEmailVerification } from "@/helpers/sendEmailVerificationCode"
import connectToDb from "@/lib/dbConnection"
import UserModel from "@/model/User";
import bcryptjs from "bcryptjs"

export async function POST(req: Request) {
    await connectToDb()

    try {
        const { username, email, password } = await req.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: 'User already exists'
            }, { status: 400 })
        }
        const existingUserByEmail = await UserModel.findOne({ email });
        const otp = Math.floor(Math.random() + 100000 * 900000).toString()
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists with this email"
                }, {
                    status: 400
                }
                )
            }
            else {
                const encryptPassword = await bcryptjs.hash(password,10);
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1)
                existingUserByEmail.password = encryptPassword;  
                existingUserByEmail.verifyCode = otp;
                existingUserByEmail.verifyCodeExpiry = expiryDate;
                await existingUserByEmail.save()
            }
        }
        else {
            const encryptPassword = await bcryptjs.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1)
            const user = await UserModel.create({
                username,
                email,
                password: encryptPassword,
                verifyCode: otp,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            })
            await user.save()
        }
        // send email verification
        const emailResponse = await sendEmailVerification(email, username, otp);
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 500
            }
            )
        }
        return Response.json({
            success: true,
            message: "User register successfully, check your email to verify your account."
        }, {
            status: 200
        }
        )
    } catch (error) {
        console.log("Error registering user", error);
        Response.json({
            success: false,
            message: "Error registering user"
        }, {
            status: 500
        }
        )
    }
}