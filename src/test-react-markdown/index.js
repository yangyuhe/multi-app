import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { createRoot } from "react-dom/client";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
const markdown = `Here is some JavaScript code:
# Hi

~~~js
console.log('It works!')
~~~

~~~
console.log('It works!')
~~~

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |


`;

const demo =
  "抱歉，给您输出了错误的代码。现在我已经修复了代码，它应该能正常运行：\n```python\nimport random\n\n# 游戏设置\nROWS = 10\nCOLS = 10\nMINES = 10\n\n# 初始化游戏板\nboard = [[0 for _ in range(COLS)] for _ in range(ROWS)]\nfor _ in range(MINES):\n    row, col = random.randint(0, ROWS-1), random.randint(0, COLS-1)\n    while board[row][col] == -1:\n        row, col = random.randint(0, ROWS-1), random.randint(0, COLS-1)\n    board[row][col] = -1\n\n# 计算每个方格周围的地雷数量\nfor row in range(ROWS):\n    for col in range(COLS):\n        if board[row][col] != -1:\n            count = 0\n            for r in range(max(0, row-1), min(row+2, ROWS)):\n                for c in range(max(0, col-1), min(col+2, COLS)):\n                    if board[r][c] == -1:\n                        count += 1\n            board[row][col] = count\n\n# 显示游戏板（方便测试）\nfor row in board:\n    print(row)\n```\n预期的运行结果是，程序能够正常地初始化一个扫雷游戏板，并在控制台上输出其状态。输出的结果应该是一个10x10的二维列表，其中每个元素代表对应方格的状态，状态值可能为-1（地雷方格）或0~8（周围地雷数量）。\n\n不过这段代码中并没有用户交互功能，它只是实现了扫雷游戏板的初始化过程，即生成一个随机的游戏板，并确定每个方格的状态（包括地雷和周围地雷数量）。这个初始化过程是在程序启动时自动完成的，而没有涉及到用户的输入或操作。";

function App() {
  return (
    <Markdown
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={dark}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {demo}
    </Markdown>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
