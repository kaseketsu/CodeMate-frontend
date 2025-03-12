import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import AccessEnum from "@/access/accessEnum";

//菜单数据
export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access: AccessEnum.ADMIN,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: AccessEnum.ADMIN,
      },
      {
        path: "/admin/bank",
        name: "题库管理",
        access: AccessEnum.ADMIN,
      },
      {
        path: "/admin/question",
        name: "题目管理",
        access: AccessEnum.ADMIN,
      },
    ],
  },
] as MenuDataItem[];

//根据全部路径查找菜单
export const findAllMenuByPath = (path: string): MenuDataItem | null => {
  return findMenuByPath(menus, path);
};

//根据路径查找菜单
export const findMenuByPath = (
  menus: MenuDataItem,
  path: string,
): MenuDataItem | null => {
  if (menus.path === path) {
    return menus;
  }
  if (menus.children) {
    for (const child of menus.children) {
      const result = findMenuByPath(child, path);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
