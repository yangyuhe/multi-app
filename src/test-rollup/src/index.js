import mode from "consts:mode";
import "./bar";
if (mode === "production") {
  console.log(1);
} else {
  console.log(2);
}
