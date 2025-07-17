import "./global.mjs";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import t from "@babel/types";
import "@babel/preset-react";
import * as Babel from "@babel/core";

Babel.transform();

const code = `
    let r;
    r=require("hello");




  
`;
const ast = parser.parse(code, {
  plugins: ["jsx"],
});

traverse.default(ast, {
  CallExpression(path) {
    const p = path.findParent((p) => {
      return p.isAssignmentExpression();
    });
    console.log(p.node.left);
    console.log(p.get("left").toString());
  },
});
