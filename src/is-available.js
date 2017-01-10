import { spawnSync } from "child_process";

export default function isAvailable() {
  return spawnSync("gsettings", ["help"]).status === 0;
}
