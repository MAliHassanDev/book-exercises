import { Insertable, InsertResult } from "kysely";
import { db } from "../db";
import { Cart, CartItem } from "../db/db";

export async function createCart(
  newCart: Insertable<Cart>,
): Promise<InsertResult> {
  try {
    return await db
      .insertInto("cart")
      .values(newCart)
      .executeTakeFirstOrThrow();
  } catch (error: unknown) {
    console.error("Failed to insert cart: ", { error });
    throw error;
  }
}

export async function addCartItem(
  newCartItem: Insertable<CartItem>,
): Promise<InsertResult> {
  try {
    return await db
      .insertInto("cartItem")
      .values(newCartItem)
      .executeTakeFirstOrThrow();
  } catch (error: unknown) {
    console.error("Failed to insert cart item into cart: ", { error });
    throw error;
  }
}
