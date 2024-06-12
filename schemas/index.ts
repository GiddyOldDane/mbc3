import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email skal angives"}),
    password: z.string().min(1, { message: "Kode skal angives"}),
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Email skal angives"}),
    password: z.string().min(6, { message: "Kode skal være på mindst 6 tegn"}),
    name: z.string().min(1, { message: "Navn skal angives" }),
});