"use client";
import { userColumns } from "@/utils/columns";
import { User } from "@prisma/client";
import { Button, message, Table } from "antd";
import { useMemo, useState } from "react";
import { useRouter } from 'next/navigation';

interface IProps {
  data: User[];
}

export default function Client(props: IProps) {
  const router = useRouter();

  const { data = [] } = props;
  const [users, setUsers] = useState<User[]>(data);
  const handleInitUser = async () => {
    fetch("/api/user/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          message.success("初始化用户成功");
          setUsers([...users, ...data.users]);
          router.refresh();
        } else {
          message.error(data.error.name);
        }
      })
      .catch((error) => {
        // console.error(error);
      });
  };

  const columns = useMemo(() => {
    return userColumns;
  }, []);

  return (
    <section>
      <div className="mb-3 flex justify-end">
        <Button type="primary" onClick={handleInitUser}>
          初始化用户
        </Button>
      </div>
      <Table
        dataSource={users}
        rowKey={(record) => record.id}
        columns={columns}
      />
    </section>
  );
}
