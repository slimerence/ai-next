import { PrismaClient } from "@prisma/client";

export const initUser = async () => {
  const prisma = new PrismaClient();
  try {
    // 校验重复数据
    let user = await prisma.user.findUnique({
      where: {
        email: "admin@admin.com",
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "admin",
          email: "admin@admin.com",
          password: "123456",
          role: "ADMIN",
        },
      });
    }

    // 创建一些随机用户数据
    const randomUsers: any[] = Array.from({ length: 10 }).map((_, index) => {
      const randomNum = Math.floor(Math.random() * 1000000); // 生成一个随机数
      const randomEmail = `user_${randomNum}_${index}@demo.com`;
      return {
        name: `user${index}`,
        email: randomEmail,
        password: "123456",
        role: "USER",
      };
    });

    const batchUsers = await prisma.user.createManyAndReturn({
      data: randomUsers,
      skipDuplicates: true,
    });

    console.log("🚀 init user success");
    return { success: true, users: [user, ...batchUsers] };
  } catch (error) {
    console.error(error);
    return { success: false, error }; // 返回错误信息
  } finally {
    await prisma.$disconnect();
  }
};
export const fetchUsers = async (params: { page?: number }) => {
  const prisma = new PrismaClient();

  const currentPage = params.page || 1;
  const pageSize = 10;
  try {
    const users = await prisma.user.findMany({
      // take: pageSize,
      // skip: pageSize * (currentPage - 1 || 0),
      orderBy: {
        role: "desc",
      },
    });
    const total = await prisma.user.count();

    // const users = await prisma.$executeRaw`SELECT * FROM user LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1 || 0)}`;
    // const total = await prisma.$executeRaw`SELECT COUNT(*) FROM user`;
    return {
      data: users,
      total,
    };
  } catch (error) {
    console.error(error);
    return { data: [], total: 0 };
  } finally {
    // prisma.$disconnect();
  }
};

export const deleteUser = async (id: string) => {
  const prisma = new PrismaClient();
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  } finally {
    await prisma.$disconnect();
  }
};
