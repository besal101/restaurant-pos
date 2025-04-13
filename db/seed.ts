import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log("Seeding started");

  const hashedPassword = await bcrypt.hash("password123", 10);

  try {
    await db.delete(schema.users);
    await db.insert(schema.users).values({
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      password: hashedPassword,
    });

    console.log("Default user created successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }

  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed");
  console.error(err);
  process.exit(1);
});
