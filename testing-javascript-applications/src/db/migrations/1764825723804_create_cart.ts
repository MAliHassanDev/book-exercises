import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("cart")
    .addColumn("id", "integer", (c) => c.primaryKey().notNull().autoIncrement())
    .addColumn("username", "varchar(150)", (c) => c.notNull())
    .addColumn("createdAt", "timestamp", (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addUniqueConstraint("uniqueCartUsername", ["username"])
    .execute();

  await db.schema
    .createTable("cartItem")
    .addColumn("id", "integer", (c) => c.notNull().primaryKey().autoIncrement())
    .addColumn("cartId", "integer", (c) => c.notNull())
    .addForeignKeyConstraint("", ["cartId"], "cart", ["id"])
    .addColumn("name", "varchar(255)", (c) => c.notNull())
    .addColumn("createdAt", "timestamp", (c) =>
      c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("cartItem").execute();
  await db.schema.dropTable("cart").execute();
}
