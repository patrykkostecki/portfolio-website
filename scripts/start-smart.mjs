import net from "node:net";
import { spawn } from "node:child_process";
import process from "node:process";

const START_PORT = Number(process.env.PORT ?? 3000);
const MAX_ATTEMPTS = 20;

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => {
      resolve(false);
    });

    server.listen(port, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findOpenPort(startPort) {
  for (let i = 0; i < MAX_ATTEMPTS; i += 1) {
    const candidate = startPort + i;
    const free = await canListen(candidate);
    if (free) {
      return candidate;
    }
  }

  return null;
}

const port = await findOpenPort(START_PORT);

if (!port) {
  console.error(`Could not find an open port in range ${START_PORT}-${START_PORT + MAX_ATTEMPTS - 1}.`);
  process.exit(1);
}

if (port !== START_PORT) {
  console.log(`Port ${START_PORT} is busy. Starting on port ${port} instead.`);
}

const nextBin = "./node_modules/.bin/next";
const child = spawn(nextBin, ["start", "-p", String(port)], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
