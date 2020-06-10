export class CartItem {
  sku: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;

  constructor(init?: Partial<CartItem>) {
    Object.assign(this, init);
  }
}
