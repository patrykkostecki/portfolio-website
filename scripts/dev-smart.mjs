import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const lockPath = path.resolve(".next/dev/lock");

function run(command, args) {
  return spawnSync(command, args, { encoding: "utf8" });
}

function pidsHoldingLock(filePath) {
  const result = run("lsof", ["-t", filePath]);
  if (result.status !== 0 || !result.stdout.trim()) {
    return [];
  }

  return result.stdout
    .split("\n")
    .map((line) => Number(line.trim()))
    .filter((pid) => Number.isInteger(pid) && pid > 0);
}

function stopPid(pid) {
  try {
    process.kill(pid, "SIGTERM");
  } catch {
    return;
  }

  const start = Date.now();
  while (Date.now() - start < 1500) {
    try {
      process.kill(pid, 0);
    } catch {
      return;
    }
  }

  try {
    process.kill(pid, "SIGKILL");
  } catch {
    // Ignore if process already exited.
  }
}

if (fs.existsSync(lockPath)) {
  const pids = pidsHoldingLock(lockPath);
  for (const pid of pids) {
    stopPid(pid);
  }

  try {
    fs.rmSync(lockPath, { force: true });
  } catch (error) {
    console.warn(`Could not remove lock file at ${lockPath}:`, error);
  }
}

const nextBin = path.resolve("node_modules/.bin/next");
const child = spawn(nextBin, ["dev"], {
  stdio: "inherit",
  shell: false,
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
