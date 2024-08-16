import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth";
import { getUserIdFromSession } from "./session";
export const getUserChats = async () => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.email) throw new Error("No session found");

    const chats = await prisma.user.findUnique({
      where: { email: user?.email },
      include: {
        chats: {
          include: {
            messages: true,
          },
        },
      },
    });


    if (!chats) throw new Error("No data found");
    return { success: true, data: chats.chats };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const saveMessagesToChat = async (messages: any[], chatId: string) => {
  const userId = await getUserIdFromSession();
  const filterNoIdMessages = messages.filter((message) => !message.id);
  await prisma.message.deleteMany({
    where: {
      chatId,
    },
  });
  await prisma.message.createMany({
    data: filterNoIdMessages.map((message) => ({
      chatId,
      userId,
      role: message.role,
      content: message.content,
    })),
    skipDuplicates: true,
  });
};
