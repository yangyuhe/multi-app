import { foo } from "../foo";

foo(2);
console.log(document.getElementById("app"));
export default function say() {
  return foo(2);
}
