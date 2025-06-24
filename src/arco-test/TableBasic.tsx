import React, { useState } from "react";
import { ColumnSetting, Table } from "@ccf2e/arco-material";
import {
  Button,
  Checkbox,
  Message,
  Radio,
  Space,
} from "@arco-design/web-react";

export function TableBatchCheck() {
  const tableRef = React.useRef<any>(null);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 180,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      width: 180,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 230,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 260,
    },
  ];
  const allData = Array(201)
    .fill("")
    .map((_, index) => ({
      key: `${index}`,
      name: `Kevin Sandra ${index}`,
      salary: 22000,
      address: `${index} Park Road, London`,
      email: `kevin.sandra_${index}@example.com`,
      children: [
        {
          key: `${index}-1`,
          name: `Kevin Sandra ${index}-1`,
          salary: 22000,
          address: `${index}-1 Park Road, London`,
          email: `kevin.sandra_${index}_1@example.com`,
        },
      ],
    }));
  const [data, setData] = useState(allData.slice(0, 10));
  const [pagination, setPagination] = useState({
    total: 96,
    pageSize: 10,
    current: 1,
  });
  const [type, setType] = useState<"checkbox" | "radio">("checkbox");
  const [checkCrossPage, setCheckCrossPage] = useState(false);
  const [controlled, setControlled] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState(["4"]);
  const rowSelectionControlled = controlled
    ? { selectedRowKeys, onChange: setSelectedRowKeys }
    : null;
  const checkbox = type === "checkbox";

  function handleChange(pagination) {
    const { current, pageSize } = pagination;
    setTimeout(() => {
      setData(allData.slice((current - 1) * pageSize, current * pageSize));
      setPagination((pagination) => ({ ...pagination, current, pageSize }));
    }, 300);
  }

  function handleBatch() {
    setSelectedRowKeys(["1", "2", "3"]);
    tableRef.current?.setSelectedRowKeys(["1", "2", "3"]);
  }

  function handleResult(selectedRowKeys, selectedRows) {
    console.log(selectedRowKeys, selectedRows);
    Message.success(
      "已选择222334s44dddd44443433" +
        selectedRowKeys.length +
        "条数据 。已选Name：" +
        selectedRows?.map((item) => item.name)?.join(",")
    );
  }

  debugger;

  return (
    <Space size={12} direction="vertical" style={{ width: "100%" }}>
      <Radio.Group
        type="button"
        options={["checkbox", "radio"]}
        value={type}
        onChange={(v) => setType(v)}
      />
      <span>
        跨页多选：123456
        <Checkbox checked={checkCrossPage} onChange={setCheckCrossPage} />
      </span>
      <span>
        是否受控：
        <Checkbox checked={controlled} onChange={setControlled} />
      </span>
      <Table
        ref={tableRef}
        columns={columns}
        data={data}
        pagination={pagination}
        showRowSelection={checkbox}
        showBottomCheckBox={checkbox}
        onChange={handleChange}
        rowSelection={{
          type,
          checkboxProps: (record) => {
            return {
              disabled: record.key.includes("4"),
            };
          },
          checkCrossPage,
          ...rowSelectionControlled,
          onChange: function (...args) {
            debugger;
            rowSelectionControlled?.onChange(args[0] as any);
          },
        }}
        renderPaginationLabel={(selectedRowKeys, selectedRows) => (
          <Space>
            <Button onClick={handleBatch}>批量选择</Button>
            <Button
              disabled={selectedRowKeys?.length === 0}
              onClick={() => handleResult(selectedRowKeys, selectedRows)}
            >
              选择结果
            </Button>
          </Space>
        )}
      />
    </Space>
  );
}
