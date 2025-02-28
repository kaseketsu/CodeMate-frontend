"use client";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React, { useCallback, useEffect } from "react";
import BasicLayout from "@/layouts/basicLayout";
import {Provider, useDispatch} from "react-redux";
import store, {AppDispatch} from "@/stores";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";

/**
 * 初始化
 * @param children
 */
const InitLayOut: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  //创建触发器
  const dispatch = useDispatch<AppDispatch>();
  //初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    const loginUser = await getLoginUserUsingGet();
    if (loginUser.data) {
      //设置全局用户状态
    } else {
      //跳转到登录页面
    }
  }, []);

  //只执行一次初始化
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayOut>
              <BasicLayout>{children}</BasicLayout>
            </InitLayOut>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
