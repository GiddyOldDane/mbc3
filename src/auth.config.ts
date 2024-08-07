import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import { userAgent } from "next/server";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if(!user || !user.password) return  null;   // reject login with credentials if created with social login (i.e. no password)

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    return user;
                };

                return null;
            }
        })
    ],
} satisfies NextAuthConfig;