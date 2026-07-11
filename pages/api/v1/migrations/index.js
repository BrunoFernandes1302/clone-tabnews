import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const migrationRunner = require("node-pg-migrate").default;

export default async function migrations(request, response) {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations,",
  });
  response.status(200).json(migrations);
}
