import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function prismaHandler<T>(operation: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    try {
    const result = await operation(prisma);
    return result;
  } catch (error) {
    console.error("Database operation failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export { prismaHandler };
export default prisma;
