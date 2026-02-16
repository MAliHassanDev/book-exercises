import { getInventory } from "./inventoryControler.js";

describe("getInventory", () => {
  it("should have a generatedAt field", () => {
    const inventory = getInventory();
    expect(inventory.generatedAt).toBeInstanceOf(Date);
  });

  it("should have generatedAt field set to time in past", () => {
    const inventory = getInventory();
    expect(inventory.generatedAt.getTime()).toBeLessThanOrEqual(Date.now());
  });
});
