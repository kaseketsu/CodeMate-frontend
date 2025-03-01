import React from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { findAllMenuByPath, findMenuByPath } from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";

/**
 * 全局权限校验拦截器
 * @param children
 */
const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  // 权限校验
  const pathName = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const menu = findAllMenuByPath(pathName);
  const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
  let res = checkAccess(loginUser, needAccess);
  if (!res) {
    return <Forbidden />;
  }
  return children;
};
export default AccessLayout;
