import React from "react";
import { Descriptions, Tag, Typography } from "antd";
import "./index.less";

const { Link } = Typography;
const style = { width: "280px" };

const About: React.FC = () => {
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies, version } = pkg;
  return (
    <React.Fragment>
      <div className="card mb10">
        <h4 className="title">简介</h4>
        <span className="text">
          Hooks-Admin 一款基于 React18、React-RouterV6、React-Hooks、Redux-Toolkit、TypeScript、Vite4、Ant-Design5
          开源的后台管理框架。
        </span>
      </div>
      <div className="card mb10">
        <h4 className="title">项目信息</h4>
        <Descriptions column={2} bordered size="middle" labelStyle={style}>
          <Descriptions.Item label="版本号">
            <Tag color="processing">{version}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="发布时间">
            <Tag color="processing">{lastBuildTime}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Gitee">
            <Link href="https://gitee.com/HalseySpicy/Hooks-Admin" target="_blank">
              Gitee
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Github">
            <Link href="https://github.com/HalseySpicy/Hooks-Admin" target="_blank">
              Github
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="文档地址">
            <Link href="#" target="_blank">
              文档地址（暂无）
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="预览地址">
            <Link href="https://hooks.spicyboy.cn" target="_blank">
              预览地址
            </Link>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="card mb10">
        <h4 className="title">生产环境依赖</h4>
        <Descriptions column={3} bordered size="middle" labelStyle={style}>
          {Object.keys(dependencies).map(key => {
            return (
              <Descriptions.Item label={key} key={key}>
                <Tag color="default">{dependencies[key]}</Tag>
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </div>
      <div className="card">
        <h4 className="title">开发环境依赖</h4>
        <Descriptions column={3} bordered size="middle" labelStyle={style}>
          {Object.keys(devDependencies).map(key => {
            return (
              <Descriptions.Item label={key} key={key}>
                <Tag color="default">{devDependencies[key]}</Tag>
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </div>
    </React.Fragment>
  );
};

export default About;
