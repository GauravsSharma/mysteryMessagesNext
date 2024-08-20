import { z } from "zod";

export const userNameValidation = z.string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be at most 20 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Username must include upper and lower case letters, a number, and a special character");

  export const signUpSchema = z.object({
    username:userNameValidation,
    email:z.string().email({message:"Invalid email"}),
    password:z.string().min(8,{message:"Password must be length 8"})

  })
