import { saveMessagesToChat } from "@/actions/chat";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth";
import { registry } from "@/utils/registry";
import { openai } from "@ai-sdk/openai";
import { StreamData, streamText } from "ai";
import { message } from "antd";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // 从header中获取当前session
  const session: any = await auth();
  const id = session?.user?.id;
  console.log("🚀 ~ file: route.ts ~ line 22 ~ POST ~ id", id);

  const { messages, chatId = null } = await req.json();
  let currentChatId = chatId;

  if (!chatId) {
    const newChat = await prisma.chat.create({
      data: {
        user: {
          connect: {
            id,
          },
        },
        // userId:id
      },
    });
    currentChatId = newChat.id;
  }
  const data = new StreamData();
  if (!chatId) {
    data.append({ chatId: currentChatId });
  }

  const result = await streamText({
    // mode: openai("gpt-4o"),
    // model: registry.languageModel("openai:deepseek-chat"),
    model: registry.languageModel("openai:gpt-4o"),
    messages,
    onChunk: async (event) => {
    },
    onFinish: async (event) => {
      // 保存对话到数据库
      const { text } = event;
      await saveMessagesToChat(
        [...messages, { role: "assistant", content: text }],
        currentChatId
      );
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}
