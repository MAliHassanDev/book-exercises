export interface CartItem {
  name: string;
}

const cartItems = new Map<string, CartItem[]>();

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": () => {
      return new Response("Hello, World!");
    },
    "/carts/:username/items": {
      POST: async (req) => {
        const cartItem = (await req.json()) as CartItem;

        const { username } = req.params;
        const userCartItems = cartItems.get(username) || [];
        userCartItems.push(cartItem);
        cartItems.set(username, userCartItems);
        return Response.json(cartItem, { status: 201 });
      },

      GET: (req) => {
        const { username } = req.params;
        const cart = cartItems.get(username);
        if (!cart) {
          return Response.json({ error: "Cart not found" }, { status: 404 });
        }
        return Response.json(cart);
      },
    },
  },
});

console.log(`Server running on ${server.url}`);
