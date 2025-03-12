import "./index.css";
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import { getUserSignInUsingGet } from "@/api/userController";
import { message } from "antd";

/**
 * 刷题日历
 * @constructor
 */
const CalendarChart = () => {
  const year = new Date().getFullYear();
  //定义签到日期列表
  const [dataList, setDataList] = useState<number[]>([1, 200]);
  //获取签到数据
  const fetchDataList = async () => {
    try {
      const res = await getUserSignInUsingGet({
        year,
      });
      setDataList(res.data);
    } catch (e) {
      message.error("获取签到数据失败, " + e.message);
    }
  };
  //保证只调用一次
  useEffect(() => {
    fetchDataList();
  }, []);
  //计算图表所需数据
  const optionData = dataList.map((dayOfYear) => {
    //计算日期字符串
    const dataStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dataStr, 1];
  });
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 20,
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year}刷题记录`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionData,
    },
  };
  return <ReactECharts className="calendar-chart" option={options} />;
};

export default CalendarChart;
