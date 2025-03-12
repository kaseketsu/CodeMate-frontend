import { useEffect, useState } from "react";
import {
  addUserSignInUsingPost,
  getUserSignInUsingGet,
} from "@/api/userController";
import { message } from "antd";

/**
 * 添加用户刷题记录钩子
 */
const useAddUserSignInRecord = () => {
  //定义签到日期列表
  const [loading, setLoading] = useState<boolean>(false);
  //请求签到
  const doSignIn = async () => {
    setLoading(true);
    try {
      await addUserSignInUsingPost({});
    } catch (e) {
      message.error("签到失败, " + e.message);
    }
    setLoading(false);
  };
  //保证只调用一次
  useEffect(() => {
    doSignIn();
  }, []);
  return { loading };
};

export default useAddUserSignInRecord;
