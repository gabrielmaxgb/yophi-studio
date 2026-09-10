#!/usr/bin/env node
require("dotenv").config({
  path: require("path").resolve(process.cwd(), ".env.production.local"),
  override: true,
});

if (!process.env.DIRECT_URL && !process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL / DIRECT_URL in .env.production.local");
  process.exit(1);
}

const { spawnSync } = require("node:child_process");
const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  env: process.env,
});
process.exit(result.status ?? 1);
