import { foo } from "./foo";
import * as os from "os";
foo(2);
export function bar() {
  console.log(os);
  import("./bar").then((bar) => bar.bar());
  return foo(22);
}
