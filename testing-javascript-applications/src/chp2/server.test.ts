import type { CartItem } from "../server/server.js";
import { describe, expect, it } from "vitest";

describe("Cart API", () => {
  const username = "testuser";

  it("should return 404 for non-existing cart", async () => {
    const response = await getItems("nonexistentuser");
    expect(response.status).toBe(404);
  });

  it("should add an item to the cart", async () => {
    const newItem: CartItem = { name: "Test Item" };
    const response = await addItem(username, newItem);
    console.log("Add Item Response:", response);
    const responseBody = await response.json();
    expect(response.status).toBe(201);
    expect(responseBody).toEqual(newItem);
  });
});

const API_ROOT = "http://localhost:3000";

function addItem(username: string, item: CartItem) {
  return fetch(`${API_ROOT}/carts/${username}/items`, {
    method: "POST",
    body: JSON.stringify(item),
  });
}

function getItems(username: string) {
  return fetch(`${API_ROOT}/carts/${username}/items`, { method: "GET" });
}
