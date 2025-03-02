

export class ShoppingCart {
  constructor(
    public idUser: string,
    public idProduct: string,
    public quantity: number,
  ) { }

  public static fromObject(object: { [key: string]: any; }): ShoppingCart {
    const { idUser, idProduct, quantity } = object;

    const shoppingCEntity = new ShoppingCart(
      idUser,
      idProduct,
      quantity
    );

    return shoppingCEntity;

  }
}