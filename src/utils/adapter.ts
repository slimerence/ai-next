import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

export function CustomPrismaAdapter(p: PrismaClient): Adapter {
  let origin = PrismaAdapter(p);
  return {
    ...origin,
    // fix: Record to delete does not exist. https://github.com/nextauthjs/next-auth/issues/4495
    deleteSession: async (sessionToken: any) => {
      try {
        return await p.session.delete({ where: { sessionToken } });
      } catch (e) {
        console.error("Failed to delete session", e);
        return null;
      }
    },
    
  } as unknown as Adapter;
}
