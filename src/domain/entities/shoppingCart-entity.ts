// This interface defines the structure of a product within the cart,
// especially after being populated from the database.
interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
  price: number; // Price of the product at the time it was added to the cart
}


export class ShoppingCart {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    // The cart holds an array of products (CartItem)
    public readonly products: CartItem[],
    public readonly total: number,
  ) { }


  public static fromObject(object: { [key: string]: any; }): ShoppingCart {

    const { _id, id, user, products = [], total = 0 } = object;

    // The 'products.product' field is populated by Mongoose, so we map it here.
    const cartItems: CartItem[] = products.map((item: any) => {
      // If for some reason a product in the cart was deleted and is now null
      if (!item.product) {
        return null;
      }
      return {
        product: {
          id: item.product._id || item.product.id,
          name: item.product.name,
          price: item.product.price
        },
        quantity: item.quantity,
        price: item.price,
      };
      // Filter out any items that might have been null
    }).filter((item: CartItem | null): item is CartItem => item !== null); 

    const shoppingCartEntity = new ShoppingCart(
      _id?.toString() || id,
      user.toString(),
      cartItems,
      total
    );

    return shoppingCartEntity;
  }
}
