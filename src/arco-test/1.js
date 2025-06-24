"use strict";
self["webpackHotUpdatemulti_app"](
  "arco-test/index",
  {
    /***/ "./src/arco-test/TableBasic.tsx":
      /*!**************************************!*\
  !*** ./src/arco-test/TableBasic.tsx ***!
  \**************************************/
      /***/ (module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TableBatchCheck: () =>
            /* binding */ TableBatchCheck,
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! react */ "./node_modules/react/index.js");
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            react__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _ccf2e_arco_material__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @ccf2e/arco-material */ "./node_modules/@ccf2e/arco-material/es/components/Table/index.js"
          );
        /* harmony import */ var _arco_design_web_react__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @arco-design/web-react */ "./node_modules/@arco-design/web-react/es/Message/index.js"
          );
        /* harmony import */ var _arco_design_web_react__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @arco-design/web-react */ "./node_modules/@arco-design/web-react/es/Space/index.js"
          );
        /* harmony import */ var _arco_design_web_react__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @arco-design/web-react */ "./node_modules/@arco-design/web-react/es/Radio/index.js"
          );
        /* harmony import */ var _arco_design_web_react__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! @arco-design/web-react */ "./node_modules/@arco-design/web-react/es/Checkbox/index.js"
          );
        /* harmony import */ var _arco_design_web_react__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @arco-design/web-react */ "./node_modules/@arco-design/web-react/es/Button/index.js"
          );
        /* provided dependency */ var __react_refresh_utils__ =
          __webpack_require__(
            /*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"
          );
        /* provided dependency */ var __react_refresh_error_overlay__ =
          __webpack_require__(
            /*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js"
          );
        __webpack_require__.$Refresh$.runtime = __webpack_require__(
          /*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js"
        );

        function TableBatchCheck() {
          const tableRef =
            react__WEBPACK_IMPORTED_MODULE_0___default().useRef(null);
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
          const [data, setData] = (0,
          react__WEBPACK_IMPORTED_MODULE_0__.useState)(allData.slice(0, 10));
          const [pagination, setPagination] = (0,
          react__WEBPACK_IMPORTED_MODULE_0__.useState)({
            total: 96,
            pageSize: 10,
            current: 1,
          });
          const [type, setType] = (0,
          react__WEBPACK_IMPORTED_MODULE_0__.useState)("checkbox");
          const [checkCrossPage, setCheckCrossPage] = (0,
          react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
          const [controlled, setControlled] = (0,
          react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
          const [selectedRowKeys, setSelectedRowKeys] = (0,
          react__WEBPACK_IMPORTED_MODULE_0__.useState)(["4"]);
          const rowSelectionControlled = controlled
            ? {
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }
            : null;
          const checkbox = type === "checkbox";
          function handleChange(pagination) {
            const { current, pageSize } = pagination;
            setTimeout(() => {
              setData(
                allData.slice((current - 1) * pageSize, current * pageSize)
              );
              setPagination((pagination) => ({
                ...pagination,
                current,
                pageSize,
              }));
            }, 300);
          }
          function handleBatch() {
            setSelectedRowKeys(["1", "2", "3"]);
            tableRef.current?.setSelectedRowKeys(["1", "2", "3"]);
          }
          function handleResult(selectedRowKeys, selectedRows) {
            console.log(selectedRowKeys, selectedRows);
            _arco_design_web_react__WEBPACK_IMPORTED_MODULE_1__[
              "default"
            ].success(
              "已选择" +
                selectedRowKeys.length +
                "条数据 。已选Name：" +
                selectedRows?.map((item) => item.name)?.join(",")
            );
          }
          return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
            _arco_design_web_react__WEBPACK_IMPORTED_MODULE_2__["default"],
            {
              size: 12,
              direction: "vertical",
              style: {
                width: "100%",
              },
            },
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
              _arco_design_web_react__WEBPACK_IMPORTED_MODULE_3__["default"]
                .Group,
              {
                type: "button",
                options: ["checkbox", "radio"],
                value: type,
                onChange: (v) => setType(v),
              }
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
              "span",
              null,
              "\u8DE8\u9875\u591A\u9009\uFF1A123",
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
                _arco_design_web_react__WEBPACK_IMPORTED_MODULE_4__["default"],
                {
                  checked: checkCrossPage,
                  onChange: setCheckCrossPage,
                }
              )
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
              "span",
              null,
              "\u662F\u5426\u53D7\u63A7\uFF1A",
              /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
                _arco_design_web_react__WEBPACK_IMPORTED_MODULE_4__["default"],
                {
                  checked: controlled,
                  onChange: setControlled,
                }
              )
            ),
            /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
              _ccf2e_arco_material__WEBPACK_IMPORTED_MODULE_5__["default"],
              {
                ref: tableRef,
                columns: columns,
                data: data,
                pagination: pagination,
                showRowSelection: checkbox,
                showBottomCheckBox: checkbox,
                onChange: handleChange,
                rowSelection: {
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
                    rowSelectionControlled?.onChange(args[0]);
                  },
                },
                renderPaginationLabel: (selectedRowKeys, selectedRows) =>
                  /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
                    _arco_design_web_react__WEBPACK_IMPORTED_MODULE_2__[
                      "default"
                    ],
                    null,
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
                      _arco_design_web_react__WEBPACK_IMPORTED_MODULE_6__[
                        "default"
                      ],
                      {
                        onClick: handleBatch,
                      },
                      "\u6279\u91CF\u9009\u62E9"
                    ),
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
                      _arco_design_web_react__WEBPACK_IMPORTED_MODULE_6__[
                        "default"
                      ],
                      {
                        disabled: selectedRowKeys?.length === 0,
                        onClick: () =>
                          handleResult(selectedRowKeys, selectedRows),
                      },
                      "\u9009\u62E9\u7ED3\u679C"
                    )
                  ),
              }
            )
          );
        }

        const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
        const $ReactRefreshCurrentExports$ =
          __react_refresh_utils__.getModuleExports($ReactRefreshModuleId$);

        function $ReactRefreshModuleRuntime$(exports) {
          if (true) {
            let errorOverlay;
            if (typeof __react_refresh_error_overlay__ !== "undefined") {
              errorOverlay = __react_refresh_error_overlay__;
            }
            let testMode;
            if (typeof __react_refresh_test__ !== "undefined") {
              testMode = __react_refresh_test__;
            }
            return __react_refresh_utils__.executeRuntime(
              exports,
              $ReactRefreshModuleId$,
              module.hot,
              errorOverlay,
              testMode
            );
          }
        }

        if (
          typeof Promise !== "undefined" &&
          $ReactRefreshCurrentExports$ instanceof Promise
        ) {
          $ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
        } else {
          $ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
        }

        /***/
      },
  },
  /******/ function (__webpack_require__) {
    // webpackRuntimeModules
    /******/ /* webpack/runtime/getFullHash */
    /******/ (() => {
      /******/ __webpack_require__.h = () => "b84e0f19aab4c3f1b4a4";
      /******/
    })();
    /******/
    /******/
  }
);
//# sourceMappingURL=index.4da35f7bda206ba34297.hot-update.js.map
