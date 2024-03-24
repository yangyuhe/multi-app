const Module = require("module")


const old = Module._load
Module._load = function () {
    console.log("____")
    old.apply(this, arguments)
}