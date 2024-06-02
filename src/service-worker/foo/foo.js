async function exec(require) {
  require("../bar.js");
}

exec(function (module) {
  import(module);
});
