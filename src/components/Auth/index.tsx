"use server";
// import { auth } from "@/utils/auth";
// import { redirect } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}
const Auth: React.FC<IProps> = async ({ children }) => {
  //   const session = await auth();
  console.log("🚀 ~ file: index.tsx ~ line 1 ~ Auth");

  //   console.log("🚀 ~ file: index.tsx ~ line 1 ~ Auth ~ session", session);

  //   if (!session) {
  //     // 如果未登录，重定向到登录页面
  //     // router.push("/user/login");
  //     redirect("/user/login");
  //   }

  return <>{children}</>;
};

export default Auth;
