import { CartItem } from "./cart.type";

export class Cart {
  private readonly items: CartItem[];
  public constructor() {
    this.items = [];
  }

  /**
   * Adds the given item to cart
   * @param {CartItem} item The item to be added to cart.
   * @returns {void}
   */
  public addToCart(item: CartItem): void {
    this.items.push(item);
  }

  /**
   * Returns the items in the cart
   * @returns {CartItem[]} The items in the cart.
   */
  public getItems(): CartItem[] {
    return this.items;
  }

  /**
   * Removes the given item from the cart
   * @param {CartItem} item - The item to be removed from cart.
   * @returns {boolean} True if the item was removed, false otherwise.
   */
  public removeCartItem(item: CartItem): boolean {
    const itemIndex = this.items.indexOf(item);
    const isInCart = itemIndex !== -1;
    if (!isInCart) return false;
    this.items.splice(itemIndex, 1);
    return true;
  }
}
