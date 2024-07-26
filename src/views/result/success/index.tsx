import React from "react";
import { Button, Result } from "antd";

const Success: React.FC = () => {
  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          GO Console
        </Button>,
        <Button key="buy">Buy Again</Button>
      ]}
    ></Result>
  );
};

export default Success;
