import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailRegex = /^(?!.*\.\.)[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const usernameRegex =/^[a-zA-Z0-9_]+$/;

const resetPasswordSchema = z.object({

    erpId: z
    .string()
    .min(3, "ErpId must be at least 3 characters")
    .max(20, "ErpId too long")
    .regex(usernameRegex, "Only letters, numbers, underscore")
    .trim()
    .refine((val) => val === val.toUpperCase(), {
        message: "ERPID must be all capital letters",
    }),

    email: z
        .string()
        .regex(emailRegex, "Invalid email format")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .regex(passwordRegex, "Password must include uppercase, lowercase, number, and special character")
})

export default resetPasswordSchema;