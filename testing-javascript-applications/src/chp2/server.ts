import Express from "express";

const server = Express();

export interface CartItem {
  name: string;
}

const cartItems = new Map<string, CartItem[]>();
const inventory = new Map<CartItem["name"], number>();

server.get("/", (_, res) => {
  res.json({ message: "Hello, World!" });
});

server.post("/carts/:username/items", async (req, res) => {
  const cartItem = req.body as CartItem;

  if (!inventory.has(cartItem.name)) {
    return res.status(404).json({ error: "Item not in inventory" });
  }

  const itemQuantity = inventory.get(cartItem.name)!;
  if (itemQuantity <= 0) {
    return res.status(409).json({ error: "Item is out of stock" });
  }

  inventory.set(cartItem.name, itemQuantity - 1);

  const { username } = req.params;
  const userCartItems = cartItems.get(username) || [];
  userCartItems.push(cartItem);
  cartItems.set(username, userCartItems);
  return res.status(201).json(cartItem);
});

server.get("/carts/:username/items", (req, res) => {
  const { username } = req.params;
  const userCartItems = cartItems.get(username) || [];
  return res.json(userCartItems);
});

const PORT = 3000;

server.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`);
