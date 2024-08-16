"use client";
import { Button, Form, Input, type FormProps } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
};

export default function EmailForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const { email } = values;
    try {
      const result = await signIn("email", {
        email,
        redirect: true,
        callbackUrl: "/home",
      });
      if (result?.ok && result?.status === 200) {
        // message.success("Login Success");
        router.push("/home");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="">
      <h2 className="text-xl font-bold">Email</h2>
      <Form
        name="basic"
        className=""
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 520 }}
        form={form}
        onFinish={onFinish}
        initialValues={{
          email: "475111519@qq.com",
          pwd: "",
        }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[
            {
              type: "email",
              message: "Email is not valid!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="email address" size="large" variant="filled" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block size="large">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
