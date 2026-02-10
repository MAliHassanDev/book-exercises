import Express from "express";

export interface CartItem {
  name: string;
}

export const carts = new Map<string, CartItem[]>();

export const inventory = new Map<CartItem["name"], number>();

const app = Express();

app.use(Express.json());

app.get("/", (_, res) => {
  res.json({ message: "Hello, World!" });
});

app.post("/carts/:username/items", async (req, res) => {
  const cartItem = req.body as CartItem;

  console.log("Received cart item:", cartItem);

  if (!inventory.has(cartItem.name)) {
    return res.status(404).json({ error: "Item not in inventory" });
  }

  const itemQuantity = inventory.get(cartItem.name)!;
  if (itemQuantity <= 0) {
    return res.status(409).json({ error: "Item is out of stock" });
  }

  inventory.set(cartItem.name, itemQuantity - 1);

  const { username } = req.params;
  const userCartItems = carts.get(username) || [];
  userCartItems.push(cartItem);
  carts.set(username, userCartItems);
  return res.status(201).json(cartItem);
});

app.get("/carts/:username/items", (req, res) => {
  const { username } = req.params;
  const userCartItems = carts.get(username) || [];
  return res.json(userCartItems);
});

const PORT = 3000;

app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`);
