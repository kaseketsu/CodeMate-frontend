import { Button, Result } from "antd";

/**
 * 403页面
 * @constructor
 */
const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您无权访问该页面。"
      extra={
        <Button href="/" typr="primary">
          返回首页
        </Button>
      }
    />
  );
};
export default Forbidden;
