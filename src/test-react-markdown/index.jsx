import Markdown from "react-markdown";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import remarkGfm from "remark-gfm";
import RemarkBreaks from "remark-breaks";
import RemarkMath from "remark-math";
import RehypeKatex from "rehype-katex";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierHeathLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./index.css";
import { marked } from "marked";

const capitalizationLanguageNameMap = {
  sql: "SQL",
  javascript: "JavaScript",
  java: "Java",
  typescript: "TypeScript",
  vbscript: "VBScript",
  css: "CSS",
  html: "HTML",
  xml: "XML",
  php: "PHP",
  python: "Python",
  yaml: "Yaml",
  mermaid: "Mermaid",
  markdown: "MarkDown",
  makefile: "MakeFile",
};
const getCorrectCapitalizationLanguageName = (language) => {
  if (!language) return "Plain";

  if (language in capitalizationLanguageNameMap)
    return capitalizationLanguageNameMap[language];

  return language.charAt(0).toUpperCase() + language.substring(1);
};

function App() {
  const value =
    "很抱歉，但由于我是一个虚拟的AI助手，并且没有即时的数据查询能力，所以我无法直接提供一个包含不同时期世界人口总数的表格。不过，我可以为您提供一个关于世界不同时期的人口变化概览的例子：\n\n| 时期 | 1950年（数据未公开） |\n| :--: | :--: |\n| **1950年代** (25-30岁) | 13.4亿人 |\n| **60年代-70年代** (30-40岁) | 16.8亿人 |\n| **80年代-90年代** (40-60岁) | 7.15亿人 |\n\n请注意，这些数字仅供参考，并且随着时间的推移和人口统计数据的公开透明性提高，这个数据可能会有所变化。如果您需要特定时期的数据，请告诉我，我可以提供您所需的信息。\n\n另外，世界上的人口总数在不断发生变化，不同的历史时期所记录的人口数量也可能有所不同。如果您有更具体的时间段需求，请提供更多信息，我将尽力为您提供最新的数据。";
  const v2 = `
  ### hello
  * ccc
  * ddd
   
  
  | 姓名 | 年龄 |
  |---|----|
  |小|23|
  |小明|24|

  这是第一行
  这是第二行

  行内公式：$E=mc^2$

  块级公式：
$$
\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}
$$


Here is some JavaScript code:

~~~javascript
console.log('It works!')
~~~

Here is some python code:
~~~python
print("xxx")
~~~

这是行内代码\`console.log('hello')\`

~~~mermaid
graph LR
    A[开始] --> B(处理步骤)
    B --> C{判断条件}
    C -->|是| D[结果 1]
    C -->|否| E[结果 2]



  `;
  const v3 = `在Mermaid语法中，我们可以将文本和图例结合使用来创建图表。下面是一个简单的例子，展示如何在一个图形上放置文字并表示其图例：

\`\`\`mermaid
graph TD
    A[第一个节点] --> B[第二个节点]
    A --> C[第三个节点]
    B --> D[第四个节点]
    C --> E[第五个节点]
    D --> F[第六个`;

  useEffect(() => {
    const marked = require("marked");

    // 示例 Markdown 文本
    const markdownText = `# 这是一个标题
这是一段普通的文本。

- 列表项 1
- 列表项 2

~~~javascript
console.log('hello');

console.log('xx')
~~~

~~~mermaid
graph TD
    A[第一个节点] --> B[第二个节点]
    A --> C[第三个节点]
    B --> D[第四个节点]
    C --> E[第五个节点]
`;

    // 使用 marked.lexer 解析 Markdown 文本
    const tokens = marked.lexer(markdownText);

    // 打印解析后的标记数组
    console.log(tokens);
  }, []);
  return (
    <Markdown
      remarkPlugins={[
        remarkGfm,
        RemarkBreaks,
        [RemarkMath, { singleDollarTextMath: true }],
      ]}
      rehypePlugins={[RehypeKatex]}
      // components={{
      //   code: ({ node, inline, className, children, ...props }) => {
      //     debugger;
      //     const match = /language-(\w+)/.exec(className || "");
      //     const language = match?.[1];
      //     const languageShowName = getCorrectCapitalizationLanguageName(
      //       language || ""
      //     );
      //     return !inline && match ? (
      //       <div>
      //         <div
      //           className="flex h-8 items-center justify-between border-b p-1 pl-3"
      //           style={{
      //             borderColor: "rgba(0, 0, 0, 0.05)",
      //           }}
      //         >
      //           <div className="text-[13px] font-normal text-gray-500">
      //             {languageShowName}
      //           </div>
      //           <div style={{ display: "flex" }}></div>
      //         </div>
      //         {
      //           <SyntaxHighlighter
      //             {...props}
      //             style={atelierHeathLight}
      //             customStyle={{
      //               paddingLeft: 12,
      //               backgroundColor: "#fff",
      //             }}
      //             language={match[1]}
      //             showLineNumbers
      //             PreTag="div"
      //           >
      //             {String(children).replace(/\n$/, "")}
      //           </SyntaxHighlighter>
      //         }
      //       </div>
      //     ) : (
      //       <code {...props} className={className}>
      //         {children}
      //       </code>
      //     );
      //   },
      // }}
    >
      {v3}
    </Markdown>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
