import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUserIfNotExists } from "@/lib/actions/auth-user";
import env from "@/lib/env";

export const authOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  events: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google" && user?.email) {
        await createUserIfNotExists({
          email: user.email,
          name: user.name,
          image: user.image,
        });
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
