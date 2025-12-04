import { defineConfig } from "kysely-ctl";
import { CamelCasePlugin } from "kysely";
import { join } from "path";

export default defineConfig({
  dialect: "better-sqlite3",
  plugins: [new CamelCasePlugin()],
  migrations: {
    migrationFolder: join("src/db", "migrations"),
  },
});
