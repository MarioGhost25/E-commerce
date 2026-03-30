

export class ShoppingCart {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly products: [],
    public readonly total: number,
  ) { }


  public static fromObject(object: { [key: string]: any; }): ShoppingCart {

    const { _id, id, user, products = [], total = 0 } = object;

    const cartProducts = products.map((item: any) => {
      return {
        product: item.product, //! viene todo el productSchema
        quantity: item.quantity,
        price: item.price,
      }
    })

    const shoppingCartEntity = new ShoppingCart(
      _id?.toString() || id,
      user.toString(),
      cartProducts,
      total
    );

    return shoppingCartEntity;
  }
}
