import {z} from 'zod';

export const authRegisterSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().toLowerCase().email("Please provide a valid email"),
    role: z.enum(["ADMIN","USER"]),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
            message: "Password must contain at least one special character",
        }),
    confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const authLoginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Please provide a valid email"),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" }),
})