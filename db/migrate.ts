import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log("Migration started");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migration completed");
  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed");
  console.error(err);
  process.exit(1);
});
