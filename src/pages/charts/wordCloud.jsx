import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import "echarts-wordcloud";
import { getTechnical } from "../../services/wordCloud";
import sty from "./charts.module.css";
function WordCloud() {
  const [echartsOptions, setEchartsOptions] = useState({});
  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getInfo = () => {
    getTechnical().then((res) => {
      initEcharts(res.chartData.series);
    });
  };
  const initEcharts = (list = []) => {
    var keywords = [];
    for (let index = 0; index < list.length; index++) {
      let item = list[index];
      keywords.push({
        name: item.name,
        value: item.textSize,
      });
    }
    var option = {
      series: [
        {
          type: "wordCloud",
          sizeRange: [12, 50],
          rotationRange: [-90, 90],
          rotationStep: 45,
          gridSize: 20,
          shape: "pentagon",
          width: "100%",
          height: "100%",
          drawOutOfBound: true,
          textStyle: {
            color: function () {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(",") +
                ")"
              );
            },
          },
          emphasis: {
            textStyle: {
              shadowBlur: 10,
              shadowColor: "#333",
              color: "red",
            },
          },
          data: keywords,
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
export default WordCloud;
