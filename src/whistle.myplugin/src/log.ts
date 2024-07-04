import fs from "fs";
import path from "path";

const logFile = path.resolve(__dirname, "./log.txt");
export function log(str: string, append = true) {
  let size;
  try {
    const stats = fs.statSync(logFile);
    size = stats.size;
  } catch (err) {}

  if (size > 2 ** 20 || !append) {
    fs.writeFileSync(logFile, new Date().toString() + " " + str + "\n");
  } else fs.appendFileSync(logFile, new Date().toString() + " " + str + "\n");
}
