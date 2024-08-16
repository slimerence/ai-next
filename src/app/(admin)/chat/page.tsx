import { message } from "antd";
import Chat from "./client";
import { getUserChats } from "@/actions/chat";
import prisma from "@/lib/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  console.log("🚀 ~ file: page.tsx:7 ~ Page ~ params:", searchParams);
  const chatId = searchParams.id || null;
  const chats = await getUserChats();

  let messages: any[] = [];
  if (chatId) {
    const chatDetail = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });
    messages = chatDetail?.messages || [];
  }

  return (
    <div className="w-full h-full">
      <Chat id={chatId} messages={messages} />
    </div>
  );
}
