import {z} from "zod"
export const messageSchema = z.object({
   messages:z.string()
   .min(10,{message:"Message must be of length 10"})
   .max(300,{message:"Content must be no longer than 300 characters."}),
  })