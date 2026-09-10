#!/usr/bin/env node
require("dotenv").config({
  path: require("path").resolve(process.cwd(), ".env.production.local"),
  override: true,
});

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL in .env.production.local");
  process.exit(1);
}

const { spawnSync } = require("node:child_process");
const result = spawnSync("npx", ["tsx", "prisma/seed.ts"], {
  stdio: "inherit",
  env: process.env,
});
process.exit(result.status ?? 1);
