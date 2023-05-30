import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import sty from "./charts.module.css";
function BarChartBaseLine() {
  const chartRef = useRef(null);
  const [echartsOptions, setEchartsOptions] = useState({});
  useEffect(() => {
    getInfo();
    // 通过  getEchartsInstance  方法获取了图表实例
    const chart = chartRef.current.getEchartsInstance();
    // 监听了图例的  legendselectchanged  事件，
    // 并在事件处理函数中使用  setOption  方法重新设置了另一个图表的  legend  以隐藏或显示对应的图例
    chart.on("legendselectchanged", handleLegendSelectChanged);
    return () => {
      if (chart) {
        chart.off("legendselectchanged", handleLegendSelectChanged);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLegendSelectChanged = (params) => {
    const chart = chartRef.current.getEchartsInstance();
    if (params.name === "baseLine") {
      if (!params.selected.baseLine) {
        chart.setOption({
          legend: {
            selected: {
              baseLine1: false,
            },
          },
        });
      } else {
        chart.setOption({
          legend: {
            selected: {
              baseLine1: true,
            },
          },
        });
      }
    }
  };
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
            if (item.seriesName !== "baseLine1") {
              relVal +=
                '<br/><span style="color:#999">' +
                item.seriesName +
                ': </span><span style="color:#333">' +
                item.value +
                "</span>";
            }
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
            icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAvCAIAAAD7B9ruAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAGeSURBVGiB7Zohb4NAGEA/mrXNsqQJommWjJmmas0EZmSpRsAPQCGxVcXPtwqLRPEDQKArmEEsTFWyZMkqkEvbJczeAc3EuCM97slPwHsJXEj4hKIooEv02hagDQ+ucjiQ12iGw8/fqlf149MJogiiCLZbyDLY7xsREuDMefEiNHL98c1YGkmL+4U6VdWp2u/1axxqDq0sg80GHKcRCexmhINRlk/L1fNKGkmleeWRTlOwbRK1lHFeHTuy06+0NK8Euy74PiUpwvjvvpu4pSEeHATgefSMyOO9ecEuQCd4cBhCnlM1Ikz+nYe7EJ0gwccjxDFtI/LEH1gUElwUkCS0dciTfGJRSPBwSNulDfinJevwYNbhwazDg1mHB7MOD2YdHsw6PJh1eDDr8GDW4cGs0+Xgy/nx/R+QYEEAWW7PhBTyLRaFBA8GoCi0dcij3GFR+DusaSCKVHUII16L2kxDJ3iwroNpUjUijPlo6jMdnVROacsCw6BnRBLjwbBkqzSsbPHM57Bew2Ry6Wse55Za6rZ4oGtrS0zT5S+tbvALPvJySV+miIUAAAAASUVORK5CYII=",
          },
          {
            name: "baseLine",
            icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAA5CAIAAABCjmltAAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAACaSURBVHic7drBCcAwDACxpHT/lZ0Rer8SkCYwh3/2npnFl+fvAe4gUyJTIlMiUyJTIlMiUyJTIlMiUyJTIlMiUyJTIlMiUyJTIlMiUyJTIlMiUyJTIlOy3XwL25TIlMiUyJS8y+NOYJsSmRKZEpkSmRKZEpkSmRKZEpkSmRKZEpkSmRKZEpkSmRKZEpkSmRKZEpkSmRKZEpmSA40hBm2PYOIHAAAAAElFTkSuQmCC",
            itemStyle: {
              color: "red",
            },
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
        boundaryGap: [0, 0.01],
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
          name: "baseLine",
          stack: "baseLineGroup" /*数据组，需要设置才能将两个bar堆积在一起*/,
          type: "bar",
          // z  属性来调整柱状图的层级,防止 name: "Sale"高量时baseline被遮盖
          z: 2,
          yAxisIndex: 1,
          barWidth: 30,
          itemStyle: {
            normal: {
              color: "transparent" /*设置bar为隐藏，撑起下面横线*/,
            },
          },
          data: dataList.map((item) => item.base),
        },
        {
          /*这个bar是横线的显示*/
          name: "baseLine1",
          stack: "baseLineGroup" /*数据组，需要设置才能将两个bar堆积在一起*/,
          type: "bar",
          // z  属性来调整柱状图的层级,防止 name: "Sale"高量时baseline被遮盖
          z: 2,
          yAxisIndex: 1,
          barWidth: 30,
          itemStyle: {
            normal: {
              borderColor: "red",
              borderWidth: 1,
              borderType: "dotted",
              color: "red",
            },
          },
          data: Array(dataList.length).fill(0.1),
        },
      ],
    };
    setEchartsOptions(option);
  };
console.log('====================================');
console.log(1111);
console.log('====================================');
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
