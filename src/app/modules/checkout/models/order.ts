import { BillingForm } from './billing-form';
import { ShippingForm } from './shipping-form';
import { Cart } from './cart';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(
    public userId: string,
    public shipping: ShippingForm,
    public billing: BillingForm,
    public cart: Cart
  ) {
    this.datePlaced = new Date().getTime();

  //   this.items = shoppingCart.items.map( p => {
  //     return {
  //       product: {
  //         sku: p.sku,
  //         name: p.name,
  //         image: p.image,
  //         price: p.price
  //       },
  //       quantity: p.quantity,
  //       totalPrice: p.totalPrice
  //     };
  //   });
  }
}
