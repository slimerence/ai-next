import {
  BarChartOutlined,
  DesktopOutlined,
  UserOutlined,
  OpenAIOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React from "react";

const getNavList = () => {
  return [
    {
      key: "/home",
      icon: <DesktopOutlined />,
      label: "Home",
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "Users",
    },
    {
      key: "/chat",
      icon: <OpenAIOutlined />,
      label: "AI",
    },
  ];
};

export default getNavList;
