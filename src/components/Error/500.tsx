import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config";
import "./index.less";

const NotNetwork = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={() => navigate(HOME_URL)}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotNetwork;
