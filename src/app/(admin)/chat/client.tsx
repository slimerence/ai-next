"use client";

import { Message } from "@prisma/client";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

interface IProps {
  id: string | null;
  messages: Message[];
}
export default function Chat({ id, messages: serverMessages = [] }: IProps) {
  // useEffect(()=>{
  //   console.log(serverMessages);

  // },[])
  const router = useRouter();
  const history: any[] = serverMessages.map((m) => ({
    id: m.id,
    role: m.role,
    content: m.content,
  }));
  const chatId = id || undefined;

  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    error,
    reload,
    data,
  } = useChat({
    // api: "/api/chat",
    id: chatId,
    initialMessages: history,
    initialInput: "",
    body: {
      chatId: id || "",
    },
    onFinish: (message, { usage, finishReason }) => {
      console.log("Finished streaming message:", message);
      console.log("Token usage:", usage);
      console.log("Finish reason:", finishReason);
    },
    // onError: error => {
    //   console.error('An error occurred:', error);
    // },
    // onResponse: response => {
    //   console.log('Received HTTP response from server:', response);
    // },
  });

  useEffect(() => {
    if (data && data.length > 0 && !isLoading && !id) {
      const feedback: any = data[0] || {};
      const tempId = feedback?.chatId || "";
      console.log("🚀 ~ file: client.tsx ~ onFinish ~ tempId", tempId);
      // 重定向到?chatid = chatId
      router.push(`/chat?id=${tempId}`);
    }
  }, [data, isLoading, router, id]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          disabled={isLoading}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
