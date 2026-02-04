import SQLite from "better-sqlite3";
import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import type { DB } from "./db.js";
import { join } from "path";

export const sqlitedialect = new SqliteDialect({
  database: new SQLite(join(import.meta.dirname, "sqlite.db")),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect: sqlitedialect,
  plugins: [new CamelCasePlugin()],
});

export async function closeConnection() {
  await db.destroy();
}
