import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/emailVerificaton";
import { ApiResponse } from "@/types/apiResponse";

export const sendEmailVerification = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    const emailResponse = await resend.emails.send({
      to: email,
      from: "onboarding@resend.dev",
      subject: "Mystery message Verification code",
      react:VerificationEmail({username,otp:verifyCode})
    });

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    return {
        success: false,
        message: "Failed to send verification email.",
    };
  }
};
