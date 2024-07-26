import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";

const { Paragraph, Text } = Typography;

const Fail: React.FC = () => {
  return (
    <div className="card">
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button type="primary" key="console">
            GO Console
          </Button>,
          <Button key="buy">Buy Again</Button>
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text strong style={{ fontSize: 16 }}>
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been frozen.{" "}
            <a>Thaw immediately &gt;</a>
          </Paragraph>
        </div>
      </Result>
    </div>
  );
};

export default Fail;
