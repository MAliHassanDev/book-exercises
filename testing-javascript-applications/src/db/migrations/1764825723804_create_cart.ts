import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("cart")
    .addColumn("id", "integer", (c) => c.primaryKey().autoIncrement())
    .addColumn("username", "varchar(150)", (c) => c.notNull())
    .addColumn("created_at", "timestamp", (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addUniqueConstraint("uniqueCartUsername", ["username"])
    .execute();

  await db.schema
    .createTable("cart_item")
    .addColumn("id", "integer", (c) => c.primaryKey().autoIncrement())
    .addColumn("name", "varchar(255)", (c) => c.notNull())
    .addColumn("created_at", "timestamp", (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("cart_item").execute();
  await db.schema.dropTable("cart").execute();
}
