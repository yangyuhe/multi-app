import React from "react";
import { MonitorView } from "@ccf2e/arco-material";
import { Button } from "@arco-design/web-react";
import { IconNotification } from "@arco-design/web-react/icon";

export function MonitorViewBasic() {
  const resourceId = "PhysicalServer";
  const resourceType = "resourceType";
  const resourceTab = "system";
  const CustomChart = (props) => {
    console.log("CustomChartProps", props);
    return <div>这是一个自定义组件</div>;
  };
  // 可换成接口，注意接口返回数据结构需要与此相同
  const getMonitorGroup = (param: any) => {
    return new Promise((resolve, reject) => {
      const res = {
        code: "SUCCESS",
        data: [
          {
            groupName: "硬盘",
            chartList: [
              {
                id: "1",
                chartName: "硬盘温度11",
                aggrs: [
                  "val",
                  "avg_over_time",
                  "max_over_time",
                  "min_over_time",
                  "sum",
                  "count",
                ],
                unit: "MB",
                unitList: ["MB"],
                instance: "1",
                instanceList: [
                  {
                    label:
                      "实例1-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
                    value: "1",
                  },
                  { label: "实例2", value: "2" },
                  { label: "实例3", value: "3" },
                  { label: "实例4", value: "4" },
                  {
                    label:
                      "实例5-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
                    value: "5",
                  },
                ],
                chartType: "line",
                metricCode: "ps_temp_hard",
                description: "物理服务器_硬盘温度",
              },
              {
                id: "2",
                chartName: "出网报文数/入网报文数",
                aggrs: [
                  "val",
                  "avg_over_time",
                  "max_over_time",
                  "min_over_time",
                  "sum",
                  "count",
                ],
                unit: "MB",
                unitList: ["MB", "KB", "GB"],
                chartType: "line",
                metricCode: "ps_temp_hard",
                description: "物理服务器_硬盘温度",
              },
              {
                id: "3",
                chartName: "硬盘温度",
                aggrs: [
                  "val",
                  "avg_over_time",
                  "max_over_time",
                  "min_over_time",
                  "sum",
                  "count",
                ],
                chartType: "line",
                metricCode: "ps_temp_hard",
                description: "物理服务器_硬盘温度",
              },
              {
                id: "4",
                chartName: "出网报文数/入网报文数",
                aggrs: [
                  "val",
                  "avg_over_time",
                  "max_over_time",
                  "min_over_time",
                  "sum",
                  "count",
                ],
                chartType: "line",
                metricCode: "ps_temp_hard",
                description: "物理服务器_硬盘温度",
                customChart: <CustomChart />,
              },
            ],
          },
        ],
      };
      resolve(res);
    });
  };
  const getRandArr = (len, max = 101, min = 0) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      const val = Math.floor(Math.random() * (max - min + 1)) + min;
      arr.push("" + val);
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
        // 整体无数据
        resolve({ code: "SUCCESS", data: null });
        return false;
      }
      const res = {
        code: "SUCCESS",
        data: {
          title: {
            text: "信息学3388",
          },
          legend: {
            data: [
              "disks_temp1-xxx",
              "disks_temp2-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
              "disks_temp3",
              "disks_temp4",
              "disks_temp5",
              "disks_temp6",
              "disks_temp7",
              "disks_temp8",
              "disks_temp9-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
              "disks_temp10-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
            ],
          },
          xAxis: {
            data: getDateArr(61, 60),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "disks_temp1-xxx4sdfsfs4",
              type: "line",
              data: getRandArr(61, 100, 80),
            },
            {
              name: "disks_temp2-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
              type: "line",
              data: getRandArr(61, 80, 60),
            },
            {
              name: "disks_temp3",
              type: "line",
              data: getRandArr(61, 60, 40),
            },
            {
              name: "disks_temp4",
              type: "line",
              data: getRandArr(61, 40, 30),
            },
            {
              name: "disks_temp5",
              type: "line",
              data: getRandArr(61, 20, 10),
            },
            {
              name: "disks_temp6",
              type: "line",
              data: getRandArr(61, 10, 0),
            },
            {
              name: "disks_temp7",
              type: "line",
              data: getRandArr(61, 10, 0),
            },
            {
              name: "disks_temp8",
              type: "line",
              data: getRandArr(61, 10, 0),
            },
            {
              name: "disks_temp9-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
              type: "line",
              data: getRandArr(61, 10, 0),
            },
            {
              name: "disks_temp10-假如这个标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。",
              type: "line",
              data: getRandArr(61, 10, 0),
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
    <MonitorView
      getMonitorGroup={getMonitorGroup}
      getMonitorChart={getMonitorChart}
      resourceId={resourceId}
      resourceType={resourceType}
      resourceTab={resourceTab}
      isTwoLegendShow={true}
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
