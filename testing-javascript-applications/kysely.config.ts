import { defineConfig } from "kysely-ctl";
import { CamelCasePlugin } from "kysely";
import { dirname, join, resolve } from "path";
import database from "better-sqlite3";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  dialect: "better-sqlite3",
  dialectConfig: {
    database: database(resolve(__dirname, "./src/db/sqlite.db")),
  },
  plugins: [new CamelCasePlugin()],
  migrations: {
    migrationFolder: join("src/db", "migrations"),
  },
});
