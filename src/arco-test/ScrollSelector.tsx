import { Select } from "@arco-design/web-react";
import { SelectPopupScroll } from "@ccf2e/arco-material";
import React, { useCallback, useEffect, useState } from "react";
export function ScrollSelector() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const pageSize = 3;

  // 默认生成50条数据
  const getOptionsData = (size, current, searchVal) => {
    const arr: any[] = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        value: i,
        label: `下拉框选项${i}`,
      });
    }
    const data = arr.filter((item) =>
      searchVal ? item.label.includes(searchVal) : true
    );
    return {
      total: data.length,
      list: data.slice((current - 1) * size, current * size),
    };
  };

  // 防抖方法
  function debounce(func, wait) {
    let timeout;

    return function () {
      const context = this;
      const args = arguments;

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  const getScrollDataFn: any = useCallback(
    debounce(async (currentPage, searchVal, isScroll) => {
      const params = {
        size: pageSize,
        current: currentPage || 1,
        searchVal: searchVal || undefined,
      };
      try {
        setLoading(true);
        const res = await getOptions(params);
        if (res) {
          setTotal(res.total);
          setOptions((oldValues) => {
            let data: any[] = [];
            if (isScroll) {
              data = oldValues.concat(res?.list);
            } else {
              data = res?.list;
              // 设置选中
              if (data && data.length) {
                setValue(data[0]?.value);
              }
            }

            return (data || []).map((item) => {
              return {
                ...item,
                label: item.label,
                value: item.value,
              };
            });
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  const getOptions = (params): Promise<any> =>
    new Promise((resolve) => {
      const { size, current, searchVal } = params;
      setTimeout(() => resolve(getOptionsData(size, current, searchVal)), 1000);
    });

  const onChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    getScrollDataFn();
  }, [getScrollDataFn]);

  return (
    <>
      <SelectPopupScroll
        style={{ width: 320 }}
        loading={loading}
        value={value}
        onChange={onChange}
        placeholder={"请选择"}
        options={options}
        openScroll={true}
        pageSize={pageSize}
        total={total}
        getScrollDataFn={(currentPage, searchVal, isScroll) =>
          getScrollDataFn(currentPage, searchVal, isScroll)
        }
      />
      <Select
        options={Array(200)
          .fill(0)
          .map((i, index) => index)}
      ></Select>
    </>
  );
}
