import { fetchUsers } from "@/actions/user";
import Client from "./client";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {  
  const currentPage = Number(searchParams?.page) || 1;
  // const pageSize = 10;
  const { data } = await fetchUsers({ page: currentPage });
  console.log("💤 ~ file: page.tsx ~ data", data);

  return (
    <main>
      <Client data={data} />
    </main>
  );
}
