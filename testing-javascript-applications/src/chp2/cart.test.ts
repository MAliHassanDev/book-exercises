import { Cart } from "./cart";
import { describe, expect, test } from "vitest";

describe("addToCart", () => {
  test("should add given item to cart", () => {
    const cartItem = "cheesecake";
    const cart = createCartWithItems(cartItem);
    const cartItems = cart.getItems();
    expect(cartItems).toEqual([cartItem]);
  });

  test("should remove the given item from cart", () => {
    const cartItem = "cheesecake";
    const cart = createCartWithItems(cartItem);
    const removed = cart.removeCartItem(cartItem);
    expect(removed).toBe(true);
    expect(cart.getItems().length).toBe(0);
  });
});

function createCartWithItems(...items: string[]): Cart {
  const cart = new Cart();
  items.forEach((item) => cart.addToCart(item));
  return cart;
}
