import CountUp from "react-countup";
import { Col, Row, Statistic, Tabs, Table } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { RootState, useSelector } from "@/redux";
import Echarts from "@/components/Echarts";
import { trendOptionsFn } from "./config/trend";
import { pieOptionsFn } from "./config/proportion";
import { overviewTabs, overviewOptionsFn } from "./config/overview";
import { columns, data } from "./config/table";

import "./index.less";

const formatter = (value: number | string) => <CountUp end={Number(value)} duration={2} separator="," />;

const Analysis: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.global.isDark);

  return (
    <div className="analysis">
      {/* analysis-count */}
      <Row gutter={20} className="analysis-count">
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="count-item mb15">
            <Statistic className="count-number" title="New Customers" value={132893} formatter={formatter} />
            <div className="count-trend">
              <div className="count-echarts">
                <Echarts option={trendOptionsFn([50, 40, 60, 20, 40, 30, 80, 70, 120, 60, 80, 50])} />
              </div>
              <Statistic className="count-percentage" value={14.52} prefix={<ArrowUpOutlined />} suffix="%" />
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="count-item mb15">
            <Statistic className="count-number" title="Active Users" value={219456} formatter={formatter} />
            <div className="count-trend">
              <div className="count-echarts">
                <Echarts option={trendOptionsFn([10, 50, 40, 100, 50, 120, 35, 40, 15, 80, 10, 20])} />
              </div>
              <Statistic className="count-percentage" value={58.36} prefix={<ArrowUpOutlined />} suffix="%" />
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="count-item mb15">
            <Statistic className="count-number" title="Total Profit" value={854972} formatter={formatter} />
            <div className="count-trend">
              <div className="count-echarts">
                <Echarts option={trendOptionsFn([30, 10, 40, 70, 40, 60, 20, 110, 40, 80, 40, 10])} />
              </div>
              <Statistic className="count-percentage" value={36.28} prefix={<ArrowUpOutlined />} suffix="%" />
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="count-item mb15">
            <Statistic className="count-number" title="Sales Volume" value={654932} formatter={formatter} />
            <div className="count-trend">
              <div className="count-echarts">
                <Echarts option={trendOptionsFn([25, 70, 50, 80, 120, 60, 90, 30, 45, 20, 90, 40])} />
              </div>
              <Statistic className="count-percentage" value={24.35} prefix={<ArrowUpOutlined />} suffix="%" />
            </div>
          </div>
        </Col>
      </Row>

      {/* analysis-overview */}
      <Row gutter={15} className="analysis-overview">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="card overview-box">
            <div className="overview-head">
              <span className="overview-title">Product Sale Overview</span>
              <div className="overview-tabs">
                <Tabs defaultActiveKey="1" size="middle" items={overviewTabs} />
              </div>
            </div>
            <div className="overview-echarts">
              <Echarts option={overviewOptionsFn(isDark)}></Echarts>
            </div>
          </div>
        </Col>
      </Row>

      {/* analysis-record */}
      <Row gutter={15} className="analysis-record">
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <div className="card record-table mt15">
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <div className="card record-proportion mt15">
            <Echarts option={pieOptionsFn(isDark)} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;
