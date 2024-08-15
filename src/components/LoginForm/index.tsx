"use client";
import { Button, Form, Input, type FormProps } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
  pwd?: string;
  code?: string;
  remember?: string;
};

export default function LoginForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const { email, pwd } = values;
    try {
      const result = await signIn("credentials", {
        email,
        password: pwd,
        redirect: false,
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
    <Form
      name="basic"
      className=""
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 520 }}
      form={form}
      onFinish={onFinish}
      initialValues={{
        email: "admin@admin.com",
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

      <Form.Item<FieldType>
        name="pwd"
        rules={[{ required: true, message: "Please input password" }]}
      >
        <Input.Password
          size="large"
          placeholder="Please input password"
          variant="filled"
        />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit" block size="large">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
