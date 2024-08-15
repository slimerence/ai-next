import { User } from "@prisma/client";
import { TableColumnsType, Tag } from "antd";
import dayjs from "dayjs";

export const userColumns: TableColumnsType<User> = [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 150,
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 200,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "createdAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => {
      return dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (_, record) => {
      const role = record.role === "ADMIN" ? "管理员" : "普通用户";
      return (
        <Tag color={record.role === "ADMIN" ? "red" : "green"}>{role}</Tag>
      );
    },
  },
];
