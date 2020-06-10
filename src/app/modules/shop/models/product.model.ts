
export class CartProductDetails {
  sku: string;
  name: string;
  color: string;
  category: string;
  image: string;
  price: number;
  currency: string;
  gender: string;
}

export class Product extends CartProductDetails {

  constructor(
    details?: string[],
    stock?: {},
    description?: string,
    materials?: string[],
    care?: string) {
      super();
    }

  // get cartDetails() {
  //   return {
  //     sku: this.sku,
  //     name: this.name,
  //     color: this.name,
  //     category: this.category,
  //     image: this.image,
  //     price: this.price,
  //     currency: this.currency,
  //     gender: this.gender
  //   }
  // }
}

