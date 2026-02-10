import { CartItem } from "../server/server.js";
import { carts, inventory } from "../server/server.js";

describe("addItem", () => {
  const mockItem: CartItem = {
    name: "testItem",
  };
  const mockUser = "testUser";

  beforeEach(() => {
    carts.clear();
  });
  beforeEach(() => inventory.set(mockItem.name, 1));

  it("should add an item to the cart", async () => {
    const response = await addItem(mockUser, mockItem);
    const res = await response.json();
    expect(response.status).toBe(201);
    expect(res).toEqual(mockItem);
  });

  it("should update the inventory count", async () => {
    await addItem("testuser", mockItem);
    expect(inventory.get(mockItem.name)).toBe(0);
  });

  it("should create new cart for new user", async () => {
    const response = await addItem(mockUser, mockItem);
    expect(response.status).toBe(201);
    expect(await getItems(mockUser)).toEqual([mockItem]);
  });

  it("should return 409 for sold out items", async () => {
    inventory.set(mockItem.name, 0);
    const response = await addItem(mockUser, mockItem);
    expect(response.status).toBe(409);
  });
});

const API_ROOT = "http://localhost:3000";

function addItem(username: string, item: CartItem) {
  return fetch(`${API_ROOT}/carts/${username}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

function getItems(username: string) {
  return fetch(`${API_ROOT}/carts/${username}/items`, { method: "GET" }).then(
    (res) => res.json(),
  );
}
