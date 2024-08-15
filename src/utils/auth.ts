import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { randomBytes, randomUUID } from "crypto";

const config: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) {
            throw new Error("No user found");
          }

          if (!credentials?.password || !user.password) {
            throw new Error("Password is required");
          }

          // 这里应该有一个密码比较的步骤，这里简单的比较了一下，实际应该使用 bcrypt 或者其他加密算法
          if (credentials?.password !== user.password) {
            throw new Error("Password incorrect");
          }

          return user;
        } catch (error) {
          console.log("🚀 ~ file: route.ts:31 ~ authorize ~ error", error);
          return null;
        } finally {
          prisma.$disconnect();
        }
      },
    }),
  ],
  session: {
    // 默认情况下是 `"jwt"`，即会话信息存储在加密的 JWT (JWE) 中，并存放在会话 cookie 中。
    // 如果使用了 `adapter`，则默认会改为 `"database"`。
    // strategy: "database",
    strategy: "jwt",

    // 秒 - 闲置会话过期时间，超过这个时间未操作会话将不再有效。
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // 秒 - 控制向数据库写入以延长会话的频率。
    // 使用此设置可以限制写入操作。设为0则总是更新数据库。
    // 注意：如果使用 JSON Web Tokens，此选项将被忽略。
    updateAge: 24 * 60 * 60, // 24 hours

    // session token 通常是随机的 UUID 或字符串，但如果你需要更自定义的会话令牌字符串，
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      const returnSession: any = session;
      console.log(
        "🚀 ~ file: auth.ts ~ line 101 ~ session ~ session",
        session,
        token
      );

      // Send properties to the client, like an access_token and user id from a provider.
      returnSession.accessToken = token.jti;
      returnSession.user.id = token.id;
      return returnSession;
    },
  
  },
};

export default NextAuth(config);

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
