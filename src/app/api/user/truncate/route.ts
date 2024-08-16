import { trunkAllUsers } from "@/actions/user";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const result = await trunkAllUsers();
    if (!result.success) {
      throw result.error; // 如果不成功，则抛出错误
    }
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
