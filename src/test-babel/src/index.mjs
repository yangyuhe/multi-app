import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

const code = `
let a='a';

let c=new Worker();
function Worker(){
  let dd=b;
}
`;

const ast = parser.parse(code);
traverse.default(ast, {
  Identifier(path) {
    if (path.node.name === "b") {
      console.log(path);
    }
  },
});
