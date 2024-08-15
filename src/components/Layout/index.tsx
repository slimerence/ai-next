"use client";
import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  ConfigProvider,
  type MenuProps,
  Spin,
  Skeleton,
} from "antd";
import getNavList from "./menu";
import { usePathname, useRouter } from "next/navigation";
import { BellOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { getThemeBg } from "@/utils";
import styles from "./index.module.less";

const { Header, Content, Footer, Sider } = Layout;

interface IProps {
  children: React.ReactNode;
  defaultOpen?: string[];
  count: number;
}

const onLogout = () => {
  signOut({ redirect: true, callbackUrl: "/" });
};

const items: MenuProps["items"] = [
  {
    key: "3",
    label: (
      <a
        target="_self"
        onClick={onLogout}
        rel="noopener noreferrer"
      >
        退出登录
      </a>
    ),
  },
];

const CommonLayout: React.FC<IProps> = ({
  children,
  count = 0,
  defaultOpen = ["/"],
}) => {
  // const { data: session, status } = useSession();

  const {
    token: { borderRadiusLG, colorTextBase, colorWarningText },
  } = theme.useToken();

  const router = useRouter();
  const curActive = usePathname();
  const navList = getNavList();

  const [curTheme, setCurTheme] = useState<boolean>(false);
  const toggleTheme = () => {
    const _curTheme = !curTheme;
    setCurTheme(_curTheme);
    localStorage.setItem("isDarkTheme", _curTheme ? "true" : "");
  };

  const handleSelect = (row: { key: string }) => {
    router.push(row.key);
  };

  useEffect(() => {
    const isDark = !!localStorage.getItem("isDarkTheme");
    setCurTheme(isDark);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: curTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme={curTheme ? "dark" : "light"}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <span className={styles.logo} style={getThemeBg(curTheme)}>
            NEXT
          </span>
          <Menu
            theme={curTheme ? "dark" : "light"}
            mode="inline"
            defaultSelectedKeys={[curActive]}
            items={navList}
            defaultOpenKeys={defaultOpen}
            onSelect={handleSelect}
          />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, ...getThemeBg(curTheme), display: "flex" }}
          >
            <div className="">{count}</div>
            <div className={styles.rightControl}>
              <span onClick={toggleTheme} className={styles.theme}>
                {!curTheme ? (
                  <SunOutlined style={{ color: colorWarningText }} />
                ) : (
                  <MoonOutlined />
                )}
              </span>
              <div className={styles.avatar}>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Avatar
                    style={{ color: "#fff", backgroundColor: colorTextBase }}
                  >
                    Admin
                  </Avatar>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 520,
                ...getThemeBg(curTheme),
                borderRadius: borderRadiusLG,
              }}
            >
              <Skeleton loading={false}>{children}</Skeleton>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default CommonLayout;
