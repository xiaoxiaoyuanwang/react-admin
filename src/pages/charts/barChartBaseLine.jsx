import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import sty from "./charts.module.css";
function BarChartBaseLine() {
  const chartRef = useRef(null);
  const [echartsOptions, setEchartsOptions] = useState({});
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    initEcharts();
  };
  const initEcharts = () => {
    let dataList = [
      {
        value: Math.floor(Math.random() * 90 + 10),
        name: "Mon",
        base: Math.floor(Math.random() * 80 + 10),
      },
      {
        value: Math.floor(Math.random() * 90 + 10),
        name: "Tue",
        base: Math.floor(Math.random() * 80 + 10),
      },
      {
        value: Math.floor(Math.random() * 90 + 10),
        name: "Web",
        base: Math.floor(Math.random() * 80 + 10),
      },
      {
        value: Math.floor(Math.random() * 90 + 10),
        name: "Thu",
        base: Math.floor(Math.random() * 80 + 10),
      },
      {
        value: Math.floor(Math.random() * 90 + 10),
        name: "Fri",
        base: Math.floor(Math.random() * 80 + 10),
      },
      {
        value: Math.floor(Math.random() * 90 + 10),
        name: "Sat",
        base: Math.floor(Math.random() * 80 + 10),
      },
      {
        value: Math.floor(Math.random() * 90 + 10),
        name: "Sun",
        base: Math.floor(Math.random() * 80 + 10),
      },
    ];
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          axis: "y",
          Z: 10,
        },
        formatter: function (params) {
          var relVal = '<span style="color:#333">' + params[0].name + "</span>";
          params.forEach((item) => {
            // 不显示baseLine1  tooltip
            relVal +=
              '<br/><span style="color:#999">' +
              item.seriesName +
              ': </span><span style="color:#333">' +
              item.value +
              "</span>";
          });
          return relVal;
        },
        backgroundColor: "#fff",
        padding: [5, 10],
      },
      legend: {
        data: [
          {
            name: "Sale",
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAvCAIAAAD7B9ruAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAGeSURBVGiB7Zohb4NAGEA/mrXNsqQJommWjJmmas0EZmSpRsAPQCGxVcXPtwqLRPEDQKArmEEsTFWyZMkqkEvbJczeAc3EuCM97slPwHsJXEj4hKIooEv02hagDQ+ucjiQ12iGw8/fqlf149MJogiiCLZbyDLY7xsREuDMefEiNHL98c1YGkmL+4U6VdWp2u/1axxqDq0sg80GHKcRCexmhINRlk/L1fNKGkmleeWRTlOwbRK1lHFeHTuy06+0NK8Euy74PiUpwvjvvpu4pSEeHATgefSMyOO9ecEuQCd4cBhCnlM1Ikz+nYe7EJ0gwccjxDFtI/LEH1gUElwUkCS0dciTfGJRSPBwSNulDfinJevwYNbhwazDg1mHB7MOD2YdHsw6PJh1eDDr8GDW4cGs0+Xgy/nx/R+QYEEAWW7PhBTyLRaFBA8GoCi0dcij3GFR+DusaSCKVHUII16L2kxDJ3iwroNpUjUijPlo6jMdnVROacsCw6BnRBLjwbBkqzSsbPHM57Bew2Ry6Wse55Za6rZ4oGtrS0zT5S+tbvALPvJySV+miIUAAAAASUVORK5CYII=',
          },
          {
            name: "baseLine",
          },
        ],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: [
        {
          type: "category",
          data: dataList.map((item) => item.name),
          label: {
            fontFamily: "HuanZiKaTong",
          },
        },
        {
          type: "category",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisPointer: {
            type: "none",
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          data: dataList.map((item) => item.name),
        },
      ],
      series: [
        {
          name: "Sale",
          type: "bar",
          // z  属性来调整柱状图的层级
          z: 1,
          data: dataList.map((item) => {
            let cor = "blue";
            if (item.value < item.base) {
              cor = "red";
            } else if (item.value > item.base) {
              cor = "green";
            } else {
              cor = "blue";
            }
            return {
              ...item,
              itemStyle: {
                normal: {
                  color: cor,
                },
              },
            };
          }),
          barWidth: 20,
          label: {
            fontFamily: "HuanZiKaTong",
          },
        },
        // 设置透明，主要是为了占位
        {
          type: 'pictorialBar',
          name: 'baseLine',
          symbol: 'path://M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z',
          symbolSize: [2, 40],
          barWidth: 40,
          symbolPosition: 'end',
          color: 'red',
          z: 2,
          data: dataList.map((item) => { return { value: item.base } })
        }
      ],
    };
    setEchartsOptions(option);
  };

  return (
    <>
      <ReactECharts
        ref={chartRef}
        option={echartsOptions}
        className={sty.echarts_wrapper}
        echarts={echarts}
      />
    </>
  );
}

export default BarChartBaseLine;
