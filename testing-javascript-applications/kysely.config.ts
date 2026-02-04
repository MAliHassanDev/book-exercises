import { defineConfig } from "kysely-ctl";
import { CamelCasePlugin } from "kysely";
import { dirname, join, resolve } from "path";
import { sqlitedialect } from "./src/db/index";

export default defineConfig({
  dialect: sqlitedialect,
  plugins: [new CamelCasePlugin()],
  migrations: {
    migrationFolder: join("src/db", "migrations"),
  },
});
