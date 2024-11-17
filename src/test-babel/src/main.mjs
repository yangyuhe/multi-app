import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import t from "@babel/types";

const code = `
let a='a';
function test(){
  let c=new Worker("url");
  c=2;
  let d=e;
  lanl=''

}


`;

const ast = parser.parse(code);
traverse.default(ast, {
  NewExpression(path) {
    if (path.node.callee.name === "Worker") {
      path.node.arguments.push(t.stringLiteral("hello"));
      console.log(path.scope);
    }
  },
  Identifier(path) {
    if (path.node.name === "a") {
      debugger;
    }
  },
  Program(path) {
    if (!path.scope.globals.Worker) {
      path.stop();
    }
  },
});

const output = generate.default(ast);
console.log(output.code);
