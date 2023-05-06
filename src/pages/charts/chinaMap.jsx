import React, { useEffect } from "react";
import * as echarts from "echarts";
import sty from "./charts.module.css";
import "../../components/Charts/map/js/china.js";
function ChinaMap() {
  useEffect(() => {
    initEcharts();
  }, []);
  const initEcharts = () => {
    // 渲染echarts-地图
    let dataList = [
      {
        name: "南海诸岛",
        value: 0,
        eventTotal: 100,
        specialImportant: 10,
        import: 10,
        compare: 10,
        common: 40,
        specail: 20,
      },
      {
        name: "北京",
        value: 0,
      },
      {
        name: "天津",
        value: 0,
      },
      {
        name: "上海",
        value: 10,
      },
      {
        name: "重庆",
        value: 20,
      },
      {
        name: "河北",
        value: 30,
      },
      {
        name: "河南",
        value: 0,
      },
      {
        name: "云南",
        value: 0,
      },
      {
        name: "辽宁",
        value: 0,
      },
      {
        name: "黑龙江",
        value: 40,
      },
      {
        name: "湖南",
        value: 0,
      },
      {
        name: "安徽",
        value: 0,
      },
      {
        name: "山东",
        value: 50,
      },
      {
        name: "新疆",
        value: 0,
      },
      {
        name: "江苏",
        value: 0,
      },
      {
        name: "浙江",
        value: 0,
      },
      {
        name: "江西",
        value: 0,
      },
      {
        name: "湖北",
        value: 0,
      },
      {
        name: "广西",
        value: 0,
      },
      {
        name: "甘肃",
        value: 0,
      },
      {
        name: "山西",
        value: 0,
      },
      {
        name: "内蒙古",
        value: 0,
      },
      {
        name: "陕西",
        value: 0,
      },
      {
        name: "吉林",
        value: 0,
      },
      {
        name: "福建",
        value: 0,
      },
      {
        name: "贵州",
        value: 0,
      },
      {
        name: "广东",
        value: 0,
      },
      {
        name: "青海",
        value: 0,
      },
      {
        name: "西藏",
        value: 0,
      },
      {
        name: "四川",
        value: 0,
      },
      {
        name: "宁夏",
        value: 0,
      },
      {
        name: "海南",
        value: 0,
      },
      {
        name: "台湾",
        value: 0,
      },
      {
        name: "香港",
        value: 0,
      },
      {
        name: "澳门",
        value: 0,
      },
    ];
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
    var chartDom = document.getElementById("echarts_wrapper");
    var myChart = echarts.init(chartDom);

    option && myChart.setOption(option);
  };
  return <div id="echarts_wrapper" className={sty.echarts_wrapper}></div>;
}
export default ChinaMap;