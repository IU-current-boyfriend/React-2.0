import { useEffect, useRef } from "react";
import { Col, Row, Statistic } from "antd";
import { RootState, useSelector } from "@/redux";
import echarts, { ECOption } from "@/utils/echarts";
import CountUp from "react-countup";
import "./index.less";

const formatter = (value: number | string) => <CountUp end={Number(value)} duration={2} separator="," />;

const Analysis: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const countChartRef = useRef<HTMLDivElement>(null);
  const countChartRef1 = useRef<HTMLDivElement>(null);
  const countChartRef2 = useRef<HTMLDivElement>(null);
  const countChartRef3 = useRef<HTMLDivElement>(null);
  const isDark = useSelector((state: RootState) => state.global.isDark);

  /* overview */
  const options: ECOption = {
    title: {
      text: "Product Sale Overview",
      top: 25,
      left: 40
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      axisLine: { show: true }
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
      interval: 50,
      splitLine: {
        show: true,
        lineStyle: {
          color: isDark ? "#484753" : "#dadbde"
        }
      }
    },
    grid: {
      top: 100,
      left: 80,
      right: 50,
      bottom: 50
    },
    tooltip: {
      trigger: "axis"
    },
    series: [
      {
        data: [0, 120, 90, 100, 160, 90, 70, 40, 120, 140, 180, 75],
        type: "line",
        symbolSize: 16,
        smooth: true,
        showSymbol: false,
        symbol: "circle",
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(194,246,235,0.8)"
            },
            {
              offset: 1,
              color: "rgba(194,246,235,0.2)"
            }
          ])
        },
        itemStyle: {
          color: "#fff",
          borderWidth: 4,
          borderColor: "#2fce9e"
        },
        lineStyle: {
          width: 4,
          color: "2fce9e"
        }
      }
    ]
  };

  /* Active Users */
  const options2: ECOption = {
    grid: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    },
    xAxis: {
      show: false,
      type: "category"
    },
    yAxis: {
      type: "value",
      show: false
    },
    series: [
      {
        data: [50, 40, 60, 20, 40, 30, 80, 70, 120, 60, 80, 50],
        type: "line",
        showSymbol: false,
        smooth: true,
        lineStyle: {
          width: 4,
          color: "#fbfdfc"
        }
      }
    ]
  };

  /* bottom1 */
  const options1: ECOption = {
    title: {
      text: "Access From",
      top: "42%",
      left: "34%"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      bottom: "6%",
      itemStyle: {
        borderWidth: 0
      },
      itemGap: 20
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        legendHoverLink: false,
        itemStyle: {
          borderRadius: 12,
          borderColor: "#fff",
          borderWidth: 6
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: 1048,
            name: "Search Engine",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#31c5de" // 0%处的颜色
                  },
                  {
                    offset: 1,
                    color: "#4776f7" // 10%处的颜色
                  }
                ],
                global: false
              }
            }
          },
          {
            value: 735,
            name: "Direct",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#fa9797" // 0%处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ff75b2" // 100%处的颜色
                  }
                ],
                global: false
              }
            }
          },
          {
            value: 580,
            name: "Email",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#3dd3b2" // 0%处的颜色
                  },
                  {
                    offset: 1,
                    color: "#10a0e6" // 100%处的颜色
                  }
                ],
                global: false
              }
            }
          },
          {
            value: 484,
            name: "Union Ads",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#ea83f7" // 0%处的颜色
                  },
                  {
                    offset: 1,
                    color: "#7773f3" // 100%处的颜色
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    ]
  };

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.setOption(options);
    }

    if (chartRef1.current) {
      const myChart = echarts.init(chartRef1.current);
      myChart.setOption(options1);
    }

    if (countChartRef.current && countChartRef1.current && countChartRef2.current && countChartRef3.current) {
      const myChart = echarts.init(countChartRef.current);
      const myChart1 = echarts.init(countChartRef1.current);
      const myChart2 = echarts.init(countChartRef2.current);
      const myChart3 = echarts.init(countChartRef3.current);

      myChart.setOption(options2);
      myChart1.setOption(options2);
      myChart2.setOption(options2);
      myChart3.setOption(options2);
    }
  }, [chartRef, isDark]);

  return (
    <div className="analysis">
      <Row gutter={20} className="analysis-count">
        {/* xxl xl lg md sm sx 代表不同屏幕大小，一共24份划分 */}
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="count mb15">
            <Statistic title="Active Users" value={112893} formatter={formatter} />
            <div className="echarts-line" ref={countChartRef}></div>
          </div>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="count mb15">
            <Statistic title="Active Users" value={219456} formatter={formatter} />
            <div className="echarts-line" ref={countChartRef1}></div>
          </div>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="count mb15">
            <Statistic title="Active Users" value={854972} formatter={formatter} />
            <div className="echarts-line" ref={countChartRef2}></div>
          </div>
        </Col>
        <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="count mb15">
            <Statistic title="Active Users" value={654932} formatter={formatter} />
            <div className="echarts-line" ref={countChartRef3}></div>
          </div>
        </Col>
      </Row>
      <Row gutter={15} className="analysis-overview">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="card overview md15">
            <div className="echarts" ref={chartRef}></div>
          </div>
        </Col>
      </Row>
      <Row gutter={15} className="analysis-bottom">
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <div className="card bottom1 mb15">col3</div>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <div className="card bottom2 mb15">
            <div className="echarts" ref={chartRef1}></div>
          </div>
        </Col>
      </Row>
      <Row gutter={15} className="analysis-bottom1">
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <div className="card bottom1 mb15">col4</div>
        </Col>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <div className="card bottom2">col4</div>
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;
