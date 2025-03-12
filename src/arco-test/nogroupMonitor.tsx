import React from "react";
import { SingleChart } from "@ccf2e/arco-material";
import { Button } from "@arco-design/web-react";
import { IconNotification } from "@arco-design/web-react/icon";
export function MonitorViewBasic() {
  const resourceId = "PhysicalServer";
  const resourceType = "tabKey";
  const resourceTab = "tabKey";
  // 可换成接口，注意接口返回数据结构需要与此相同

  const res = {
    requestId: "7e35a748-2bcd-4145-a513-eaedf78b2ddd",
    code: "SUCCESS",
    message: "",
    data: [
      {
        code: "cc_cluster_rp_cpu_usage_rate",
        codeName: "计算集群_CPU使用率2",
        isChart: true,
        threshold: [
          {
            name: "P1",
            value: "10",
            level: 1,
          },
          {
            name: "P2",
            value: "20",
            level: 2,
          },
          {
            name: "P3",
            value: "30",
            level: 3,
          },
        ],
      },
      {
        code: "ps_load1",
        codeName: "物理服务器_CPU1分钟平均负载",
        isChart: true,
        threshold: [
          {
            name: "P1",
            value: "100",
            level: 1,
          },
          {
            name: "P2",
            value: "80",
            level: 2,
          },
          {
            name: "P3",
            value: "50",
            level: 3,
          },
        ],
      },
      {
        code: "ps_load5",
        codeName: "物理服务器_CPU5分钟平均负载",
        isChart: true,
        threshold: [
          {
            name: "P1",
            value: "100",
            level: 1,
          },
          {
            name: "P2",
            value: "80",
            level: 2,
          },
        ],
      },
      {
        code: "ps_memory_usage_rate",
        codeName: "物理服务器_内存使用率",
        isChart: false,
        threshold: [
          {
            name: "P1",
            value: "0",
            level: 1,
          },
        ],
      },
    ],
  };

  const getMonitorGroup = Promise.resolve(res);

  const getRandArr = (len, max = 100, min = 0) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      const val = Math.floor(Math.random() * (max - min + 1)) + min;
      arr.push(val);
    }
    return arr;
  };
  const getRandMapArr = (len, max = 100, min = 0) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      const val = Math.floor(Math.random() * (max - min + 1)) + min;
      arr.push({
        value: val,
        status: "一般",
        resion: `原因-${i}`,
        suggest: `建议-${Math.floor(Math.random() * (max - min + 1)) + min}`,
        used: Math.floor(Math.random() * (max - min + 1)) + min,
        free: Math.floor(Math.random() * (max - min + 1)) + min,
      });
    }
    return arr;
  };
  const getDateArr = (len, sep = 60) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      const val = new Date().getTime() - sep * (len - i) * 1000;
      arr.push(val);
    }
    return arr;
  };
  // 可换成接口，注意接口返回数据结构需要与此相同
  const getMonitorChart = (param: any) => {
    return new Promise((resolve, reject) => {
      if (param.chartId === "2") {
        // 有X轴数据，没有图表数据
        resolve({
          code: "SUCCESS",
          data: {
            type: "",
            title: {
              text: "硬盘温度(℃)",
            },
            legend: {
              data: [
                "disks_temp1",
                "disks_temp2-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
              ],
            },
            xAxis: {
              data: getDateArr(61, 60),
            },
            yAxis: {
              type: "value",
              name: "",
              enum: { 0: "故障", 1: "亚健康", 2: "健康" },
            },
          },
        });
        return false;
      }
      const res = {
        code: "SUCCESS",
        data: {
          type: "",
          title: {
            text: "计算集群_CPU使用率(%)",
          },
          legend: {
            data: ["计算集群_CPU使用率"],
          },
          xAxis: {
            data: [
              1732087715, 1732087775, 1732087835, 1732087895, 1732087955,
              1732088015, 1732088075, 1732088135, 1732088195, 1732088255,
              1732088315, 1732088375, 1732088435, 1732088495, 1732088555,
              1732088615, 1732088675, 1732088735, 1732088795, 1732088855,
              1732088915, 1732088975, 1732089035, 1732089095, 1732089155,
              1732089215, 1732089275, 1732089335, 1732089395, 1732089455,
              1732089515, 1732089575, 1732089635, 1732089695, 1732089755,
              1732089815, 1732089875, 1732089935, 1732089995, 1732090055,
              1732090115, 1732090175, 1732090235, 1732090295, 1732090355,
              1732090415, 1732090475, 1732090535, 1732090595, 1732090655,
              1732090715, 1732090775, 1732090835, 1732090895, 1732090955,
              1732091015, 1732091075, 1732091135, 1732091195, 1732091255,
              1732091315,
            ],
          },
          yAxis: {
            type: "value",
            name: "",
            enum: {},
          },
          series: [
            {
              name: "计算集群_CPU使用率",
              type: "line",
              data: [
                "20.74",
                "22.97",
                "22.63",
                "21.85",
                "20.74",
                "23.68",
                "22.90",
                "19.79",
                "20.99",
                "24.21",
                "21.92",
                "20.61",
                "21.87",
                "24.63",
                "21.34",
                "21.35",
                "23.06",
                "22.69",
                "20.82",
                "21.16",
                "23.22",
                "22.18",
                "20.51",
                "22.74",
                "23.53",
                "20.79",
                "20.86",
                "23.66",
                "22.46",
                "20.69",
                "21.06",
                "23.21",
                "21.42",
                "21.67",
                "21.43",
                "24.07",
                "22.23",
                "20.69",
                "22.96",
                "26.12",
                "21.73",
                "21.76",
                "24.51",
                "23.26",
                "20.22",
                "21.77",
                "23.37",
                "21.20",
                "21.10",
                "21.78",
                "23.75",
                "20.93",
                "20.10",
                "22.80",
                "24.13",
                "20.26",
                "19.78",
                "22.30",
                "22.91",
                "20.37",
                "20.60",
              ],
            },
          ],
        },
      };
      resolve(res);
    });
  };

  const createCustomAlert = (a, b) => {
    alert(
      `自定义操作\n参数1:${JSON.stringify(a)},\n参数2:${JSON.stringify(b)}`
    );
  };
  return (
    <SingleChart
      getMonitorGroup={getMonitorGroup}
      getMonitorChart={getMonitorChart}
      resourceId={resourceId}
      resourceType={resourceType}
      resourceTab={resourceTab}
      showGroupToggle={true}
      styleType="radio"
      //isEdit={true}
      rangePickerProps={{ style: { width: 275 } }}
      areaMin={2}
      xAxisDateFormat="MM-DD"
      showGroup={true}
      iconActionList={[
        {
          name: "创建告警规则",
          icon: (
            <Button
              className="icon-button"
              type="text"
              icon={<IconNotification />}
            />
          ),
          tooltip: "对该指标创建自定义告警规则",
          isExtend: false,
          callback: createCustomAlert,
        },
      ]}
    />
  );
}
