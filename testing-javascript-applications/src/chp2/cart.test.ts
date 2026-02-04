import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { addCartItem, createCart } from "./cart.js";
import { closeConnection, db } from "../db/index.js";
import { Insertable } from "kysely";
import { Cart, CartItem } from "../db/db.js";

afterAll(async () => closeConnection());

describe("createCart", () => {
  beforeEach(async () => {
    await db.deleteFrom("cartItem").execute();
    await db.deleteFrom("cart").execute();
  });

  test("should create cart with the given username", async () => {
    const newCart = {
      username: "ali",
    };
    await createCart(newCart);
    const result = await db
      .selectFrom("cart")
      .select("username")
      .where("username", "=", newCart.username)
      .executeTakeFirst();
    expect(result).toEqual(newCart);
  });
});

describe("addCartItem", () => {
  const mockCart = {
    id: 1,
    username: "mockUsername",
  } satisfies Insertable<Cart>;

  beforeAll(async () => {
    await db.deleteFrom("cartItem").execute();
    await db.deleteFrom("cart").execute();
    await db.insertInto("cart").values(mockCart).executeTakeFirstOrThrow();
  });

  beforeEach(async () => {
    await db.deleteFrom("cartItem").execute();
  });

  test("Should add item to cart", async () => {
    const mockItem = {
      name: "fish",
      cartId: mockCart.id,
    } satisfies Insertable<CartItem>;

    await addCartItem(mockItem);
    const result = await db
      .selectFrom("cartItem")
      .select(["name", "cartId"])
      .where("cartId", "=", mockItem.cartId)
      .executeTakeFirst();
    expect(result).toEqual(mockItem);
  });
});
