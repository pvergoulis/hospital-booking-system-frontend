import { z } from "zod"

export const userSchema = z.object({
    firstname : z.string().nonempty("fistname is required").min(3),
    lastname : z.string().nonempty("lastname is required").min(3),
    username : z.string().nonempty("username is required").min(3),
    email : z.string().nonempty("Email is required").email("Email is invalid").trim(),
    password : z.string().nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    role : z.enum(['ADMIN', 'PATIENT']).default('PATIENT').optional(),
    vat: z.string().length(9,"Vat must be 9 characters").nonempty("Vat is required"),
    phone : z.string().nonempty("phone is required"),
    amka : z.string().length(11, "AMKA must be 11 characters").nonempty("AMKA is required "),
    age: z.number({required_error: "Age is required"}),
    mothersName : z.string().optional(),
    fathersName : z.string().optional()
})
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type userType = z.infer<typeof userSchema>



export const userLoginSchema = z.object({
    username: z.string().nonempty("Username is required").min(3),
    password : z.string().nonempty("Password is required").min(1)
})


export type userLoginType = z.infer<typeof userLoginSchema>