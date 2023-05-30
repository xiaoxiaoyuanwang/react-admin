import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { getMap } from "../../services/chinaMap";
import sty from "./charts.module.css";
import "../../components/Charts/map/js/china.js";
function ChinaMap() {
  const [echartsOptions, setEchartsOptions] = useState({});
  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getInfo = () => {
    getMap().then((res) => {
      initEcharts(res.chartData.series);
    });
  };
  const initEcharts = (list = []) => {
    // 渲染echarts-地图
    list.forEach((element) => {
      if (element.name === "南海诸岛") {
        element.eventTotal = 100;
        element.specialImportant = 10;
        element.import = 10;
        element.compare = 10;
        element.common = 40;
        element.specail = 20;
      }
    });
    let dataList = list;
    let option = {
      tooltip: {
        triggerOn: "mousemove", //mousemove、click
        padding: 8,
      },
      visualMap: {
        show: true,
        type: "continuous",
        min: 0,
        max: 100,
        left: 0,
        top: 0,
        itemGap: 0,
        showLabel: true,
        realtime: false,
        itemWidth: 12,
        itemHeight: 90,
        calculable: true,
      },
      geo: {
        map: "china",
        scaleLimit: {
          min: 1,
        },
        zoom: 1,
        roam: true,
        top: 30,
        bottom: 10,
        label: {
          normal: {
            show: true,
            fontSize: "8",
            color: "rgba(0,0,0)",
          },
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(0, 0, 0, 0.2)",
          },
          emphasis: {
            areaColor: "#f2d5ad",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            borderWidth: 0,
          },
        },
      },
      series: [
        {
          name: "地区分布",
          type: "map",
          roam: true,
          geoIndex: 0,
          data: dataList,
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
export default ChinaMap;
