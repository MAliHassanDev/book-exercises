const inventory = new Map<string, number>();

export function addToInventory(item: string, quantity: number) {
  if (typeof quantity !== "number" || quantity < 0) {
    throw new Error("Invalid quantity");
  }

  const currentQuantity = inventory.get(item) ?? 0;
  const newQuantity = currentQuantity + quantity;
  inventory.set(item, newQuantity);
  return newQuantity;
}

export function getInventory() {
  const content = Object.fromEntries(inventory);
  return {
    ...content,
    generatedAt: new Date(new Date().setFullYear(3000)),
  };
}
