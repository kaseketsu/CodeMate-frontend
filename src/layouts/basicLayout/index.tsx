"use client";
import {
  GithubFilled,
  LogoutOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input } from "antd";
import React, { useState } from "react";
import { Props } from "next/script";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/globalFooter";
import "./index.css";
import { menus } from "../../../config/menu";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import MdEditor from "@/components/mdEditor";
import MdViewer from "@/components/mdViewer";

/**
 * 搜索栏
 * @constructor
 */
const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索方案"
        variant="borderless"
      />
      <PlusCircleFilled
        style={{
          fontSize: 24,
        }}
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="小花刷题平台"
        layout="top"
        logo={
          <Image
            src="/assets/logo.png"
            width={32}
            height={32}
            alt="小花刷题平台"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "程序员小花",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput />,
            <a key="github" target="_blank" href="https://github.com/kaseketsu">
              <GithubFilled key="GithubFilled" />,
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        //渲染底部栏
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        //定义浏览器菜单
        menuDataRender={() => {
          return getAccessibleMenus(loginUser);
        }}
        //定义菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
