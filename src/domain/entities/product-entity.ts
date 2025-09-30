
export class ProductEntity {

    constructor(
        public id: string,
        public name: string,
        public price: number,
        public category: string,
        public sku: string,
    ) { }
  
    public static fromObject( object: { [ key: string ]: any; } ): ProductEntity {
      const { id, name, price, category, sku } = object;
  
      const userEntity = new ProductEntity(
        id,
        name, 
        price, 
        category,
        sku,
      );
      
      return userEntity;
  
    }
  
  }