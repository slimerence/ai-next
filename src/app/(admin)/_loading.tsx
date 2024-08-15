import { Spin } from "antd";

export default async function Loading() {
  return <Spin spinning={true} fullscreen />;
}
