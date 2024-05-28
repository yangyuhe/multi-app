const fs = require("fs");

const stat = fs.lstatSync("./foo.js");
console.log(stat.isSymbolicLink(), stat.isFile(), fs.realpathSync("./foo.js"));
