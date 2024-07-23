import { Spin } from "antd";
import "./index.less";

const Loading = () => {
  return (
    <div className="loading-box">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
