import { getServerProps } from "@/actions/global";
import Auth from "@/components/Auth";
import Layout from "@/components/Layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Skeleton } from "antd";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  params: null | undefined;
};
export default async function BasicLayout({ children, params }: Props) {
  // server - client - server
  const serverProps = await getServerProps();
  console.log(
    "🚀 ~ file: layout.tsx:14 ~ BasicLayout ~ serverProps:",
    serverProps
  );

  return (
    <AntdRegistry>
      {/* <Auth> */}
      <Layout count={serverProps?.count}>
        <Suspense fallback={<Skeleton avatar paragraph={{ rows: 4 }} />}>
          {children}
        </Suspense>
      </Layout>
      {/* </Auth> */}
    </AntdRegistry>
  );
}
