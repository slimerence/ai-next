import { auth } from "@/utils/auth";

export const getUserIdFromSession = async()=>{
    const session = await auth();
    return session?.user?.id || null;
}