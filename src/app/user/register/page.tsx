"use client";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {LoginForm, ProFormText,} from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {userRegisterUsingPost} from "@/api/userController";
import {message} from "antd";
import {ProForm} from "@ant-design/pro-form/lib";
import {useRouter} from "next/navigation";

/**
 * 用户注册页面
 * @constructor
 */
const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const router = useRouter();
  /**
   * 提交表单
   */
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功, 请登录");
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e) {
      message.error("注册失败, " + e.message);
    }
  };
  return (
    <div id="userRegisterPage">
      <LoginForm
        form={form}
        logo={
          <Image
            src="/assets/logo5.png"
            alt="小花刷题平台"
            width={44}
            height={44}
          />
        }
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        title="小花刷题平台 - 用户注册"
        subTitle="程序员面试刷题网站"
        onFinish={doSubmit}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入账号"}
          rules={[
            {
              required: true,
              message: "请输入账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"清输入确认密码"}
          rules={[
            {
              required: true,
              message: "请输入确认密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          已有账号?
          <Link href={"/user/login"}> 去注册</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
