import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      authorize: async (credentials) => {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        if (email !== process.env.ADMIN_EMAIL?.trim()) return null;

        const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
        if (!passwordHash) return null;

        const isValid = await bcrypt.compare(password, passwordHash);
        if (!isValid) return null;

        return {
          id: "1",
          email,
          name: "Soraia Oliveira",
        };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth: session }) => {
      return !!session;
    },
  },
});
