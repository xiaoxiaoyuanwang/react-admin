import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { getRanking } from "../../services/barChartRanking";
import sty from "./charts.module.css";
function BarChartRanking() {
  const [echartsOptions, setEchartsOptions] = useState({});
  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getInfo = () => {
    getRanking().then((res) => {
      initEcharts(res.chartData.series);
    });
  };
  const initEcharts = (list = []) => {
    const dt = list.sort((a, b) => a.value - b.value);
    let option = {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "80",
        right: "20",
        bottom: "20",
        top: "20",
        containLabel: false,
      },
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: {
        type: "category",
        data: dt.map((item) => item.name),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 70,
          width: 60,
          align: "left",
          overflow: "truncate",
          formatter: function (value, index) {
            let ind = index + 1;
            let dtLength = dt.length;
            if (ind === dtLength) {
              return "{one|" + (dtLength - index) + "} {a|" + value + "}";
            } else if (ind + 1 === dtLength) {
              return "{two|" + (dtLength - index) + "} {b|" + value + "}";
            } else if (ind + 2 === dtLength) {
              return "{three|" + (dtLength - index) + "} {c|" + value + "}";
            }
            if (dtLength - index > 9) {
              return "{five|" + (dtLength - index) + "} {d|" + value + "}";
            }
            return "{four|" + (dtLength - index) + "} {d|" + value + "}";
          },
          rich: {
            a: {
              color: "#59c9f9",
            },
            b: {
              color: "#59c9f9",
            },
            c: {
              color: "#59c9f9",
            },
            d: {
              color: "#59c9f9",
            },
            // 第一名
            one: {
              backgroundColor: "#E86452",
              color: "white",
              width: 12,
              height: 16,
              padding: [1, 0, 0, 5],
              borderRadius: 10,
              fontSize: 11,
            },
            // 第二名
            two: {
              backgroundColor: "#FF9845",
              color: "white",
              width: 12,
              height: 16,
              padding: [1, 0, 0, 5],
              borderRadius: 10,
              fontSize: 11,
            },
            // 第三名
            three: {
              backgroundColor: "#F6BD16",
              color: "white",
              width: 12,
              height: 16,
              padding: [1, 0, 0, 5],
              borderRadius: 10,
              fontSize: 11,
            },
            // 一位数
            four: {
              backgroundColor: "rgba(0,0,0,0.15)",
              color: "white",
              width: 12,
              height: 16,
              padding: [1, 0, 0, 5],
              borderRadius: 10,
              fontSize: 11,
            },
            // 两位数
            five: {
              backgroundColor: "rgba(0,0,0,0.15)",
              color: "white",
              width: 16,
              height: 16,
              padding: [1, 0, 0, 1],
              borderRadius: 10,
              fontSize: 11,
            },
          },
        },
      },
      series: [
        {
          type: "bar",
          showBackground: true,
          label: {
            show: true,
            position: "right",
            color: "rgba(0,0,0,0.45)",
          },
          barWidth: 20,
          itemStyle: {
            color: "#5B8FF9",
          },
          data: dt,
        },
      ],
    };
    option && setEchartsOptions(option);
  };
  return (
    <ReactECharts
      option={echartsOptions}
      className={sty.echarts_wrapper}
      echarts={echarts}
    />
  );
}
export default BarChartRanking;
