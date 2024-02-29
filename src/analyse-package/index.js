const fs = require('fs')
const path = require('path')
const { argv } = require('process')


const es6 = []
const cjs = []
const includes = {
    "@antv/data-set": "^0.11.8",
    "@ccf2e/arco-material": "^0.7.2",
    "@codeceptjs/helper": "^1.0.2",
    "@codemirror/lang-sql": "^6.5.4",
    "@fluentui/react": "^8.5.1",
    "@loadable/component": "^5.13.2",
    "@martel/audio-file-decoder": "2.3.15",
    "@novnc/novnc": "^1.2.0",
    "@reduxjs/toolkit": "^1.5.1",
    "@thi.ng/rle-pack": "^2.1.6",
    "@turf/turf": "^6.5.0",
    "@uiw/codemirror-extensions-zebra-stripes": "^4.21.7",
    "@uiw/codemirror-theme-bbedit": "^4.21.7",
    "@uiw/react-codemirror": "^4.21.7",
    "axios": "^0.24.0",
    "bizcharts": "^4.1.11",
    "classnames": "^2.3.1",
    "codemirror": "5.59.4",
    "copy-to-clipboard": "^3.3.1",
    "d3": "^5.16.0",
    "d3-color": "3.1.0",
    "d3-graphviz": "^2.6.1",
    "d3-tip": "^0.9.1",
    "dayjs": "^1.11.10",
    "debounce-promise": "^3.1.2",
    "echarts": "^5.4.2",
    "echarts-for-react": "^3.0.2",
    "i18next": "^23.6.0",
    "lodash": "^4.17.21",
    "magic-wand-js": "^1.0.0",
    "mockjs": "^1.1.0",
    "nprogress": "^0.2.0",
    "papaparse": "^5.3.1",
    "query-string": "^6.13.8",
    "rc-tree": "^5.3.0",
    "react-beautiful-dnd": "^13.1.1",
    "react-codemirror2": "^7.2.1",
    "react-color": "^2.18.1",
    "react-copy-to-clipboard": "^5.0.4",
    "react-flow-renderer": "^9.4.0",
    "react-i18next": "^11.7.3",
    "react-konva-utils": "^0.2.0",
    "react-monaco-editor": "0.44.0",
    "react-virtualized-auto-sizer": "^1.0.6",
    "react-window": "^1.8.6",
    "uuid": "^9.0.0",
    "x-data-spreadsheet": "^1.1.9",
    "@arco-design/web-react": "2.48.0",
    "@arco-themes/react-cecloud-design": "^1.0.41",
    "antd": "^4.3.3",
    "d3": "^5.16.0",
    "date-fns": "^2.20.1",
    "dayjs": "^1.11.10",
    "konva": "^8.1.3",
    "mobx": "^5.15.4",
    "mobx-react": "^6",
    "mobx-state-tree": "^3.16.0",
    "react": "^17.0.1",
    "react-app-polyfill": "^3.0.0",
    "react-dom": "^17.0.1",
    "react-helmet": "^6.1.0",
    "react-konva": "^17.0.2-0",
    "react-redux": "^7.2.6",
    "react-refresh": "^0.11.0",
    "react-router": "5.2.0",
    "react-router-dom": "5.2.0",
    "redux": "^4.1.2",
}
const forcedEs6 = ['@novnc/novnc']
const ignores = ["@babel/", 'babel-plugin']
let includesPackages = Object.keys(includes)
console.log("初始包：", includesPackages.length, "个")
/**
 * 
 * @param {*} dir 绝对路径
 */
async function checkPackage(dir, first = false) {
    if (dir.endsWith("/@types")) return;
    const packageJSONPath = path.resolve(dir, 'package.json')
    let promises = []
    const exist = fs.existsSync(packageJSONPath)
    if (exist) {
        const package = await fs.promises.readFile(packageJSONPath, { encoding: "utf-8" })
        const packageJson = JSON.parse(package)
        if (first) {
            includesPackages.push(packageJson.name);
        } else {
            if (includesPackages.includes(packageJson.name)) {
                includesPackages.push(...Object.keys(packageJson.dependencies || {}))
            }
        }
        // ignores.push(...Object.keys(packageJson.devDependencies || {}))
        if (packageJson.module || packageJson.type === 'module' || packageJson['jsnext:main'] || forcedEs6.includes(packageJson.name)) {
            let item = [packageJson.name]
            const alreadyDetect = es6.find(i => i[0] === packageJson.name)
            if (!alreadyDetect) {
                es6.push(item);
                promises.push(countFiles(dir, packageJson.module || packageJson['jsnext:main'] || packageJson.main).then(num => {
                    item[1] = num
                }))
            }

        } else {
            const alreadyDetect = cjs.find(i => i[0] === packageJson.name)
            if (!alreadyDetect) {
                let item = [packageJson.name]
                cjs.push(item)
                promises.push(countFiles(dir, packageJson.main).then(num => {
                    item[1] = num
                }))
            }
        }
        const nodemodulePath = path.resolve(dir, "node_modules")
        const nodemoduleExist = fs.existsSync(nodemodulePath)
        if (nodemoduleExist) {
            const nodemodulesDirs = await fs.promises.readdir(nodemodulePath)
            nodemodulesDirs.forEach(async nodemoduleDir => {
                promises.push((async () => {
                    const subdir = path.resolve(dir, "node_modules", nodemoduleDir)
                    const substats = await fs.promises.stat(subdir)
                    if (substats.isDirectory())
                        await checkPackage(subdir)
                })())
            })
        }
    } else {
        const subdirs = await fs.promises.readdir(dir)
        subdirs.forEach(async subdir => {
            promises.push((async () => {
                const subPath = path.resolve(dir, subdir)
                try {
                    const stat = await fs.promises.stat(subPath)
                    if (stat.isDirectory()) await checkPackage(subPath)
                } catch (err) {
                    try {
                        await fs.promises.lstat(subPath)
                    } catch (err) {
                        console.error("不是文件也不是链接", err)
                    }
                }
            })())
        })
    }

    await Promise.all(promises)
}

async function countFiles(dir, main) {
    if (!main) {
        const counter = await countAllFiles(dir)
        return counter;
    } else {
        const subdir = path.dirname(path.resolve(dir, main))
        const counter = await countAllFiles(subdir)
        return counter;
    }
}
/**dir 绝对路径 */
async function countAllFiles(dir) {
    let counter = 0
    const dirs = await fs.promises.readdir(dir)
    let promises = []
    dirs.forEach(async item => {
        if (item === 'node_modules' || item.startsWith(".")) return;
        promises.push((async () => {
            if (item.endsWith(".js")) {
                counter++;
            }

            else {
                const subdir = path.resolve(dir, item)
                try {
                    const stat = await fs.promises.stat(subdir)
                    if (stat.isDirectory()) {
                        let n = await countAllFiles(subdir)
                        counter += n
                    }
                } catch (err) {
                    try {
                        await fs.promises.lstat(subdir)
                    } catch (err) {
                        console.error("不是文件也不是链接", err)
                    }
                }
            }
        })())
    })
    await Promise.all(promises)
    return counter;
}

checkPackage(argv[2], true).then(() => {
    includesPackages = [...new Set(includesPackages)].filter(item => !ignores.some(ig => item.startsWith(ig)))
    const filteredEs6 = es6.filter(item => includesPackages.includes(item[0]))

    const filteredCjs = cjs.filter(item => includesPackages.includes(item[0]))
    let res = {
        "检测包数量": includesPackages.length + "个",
        "检测包": includesPackages,
        "es6包数": filteredEs6.length + '个,包含js文件：' + filteredEs6.map(item => item[1]).reduce((a, c) => a + c, 0),
        "es6": filteredEs6,
        "cjs包数": filteredCjs.length + "个,包含js文件：" + filteredCjs.map(item => item[1]).reduce((a, c) => a + c, 0),
        "cjs": filteredCjs
    }
    fs.writeFileSync(path.resolve(__dirname, "res.json"), JSON.stringify(res, "", "  "), { encoding: "utf-8" })

    const duplicated = filteredCjs.filter(item => filteredEs6.some(i => i[0] === item[0]))
    console.log(duplicated)
}).catch(err => {
    console.error(err)
})
