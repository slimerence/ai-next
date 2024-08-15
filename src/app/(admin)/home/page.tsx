import { getHomeProps } from "@/actions/global";
import { auth } from "@/utils/auth";

export default async function Home() {
  // server component
  const homeProps = await getHomeProps();
  const sessions = await auth();
  console.log("🚀 ~ file: page.tsx ~ line 5 ~ Home ~ sessions", sessions);
  
  return <main>{homeProps?.name}</main>;
}
