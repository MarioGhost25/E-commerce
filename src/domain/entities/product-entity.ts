
export class ProductEntity {

    constructor(
        public id: string,
        public name: string,
        public price: number,
        public category: string,
    ) { }
  
    public static fromObject( object: { [ key: string ]: any; } ): ProductEntity {
      const { id, name, price, category } = object;
  
      const userEntity = new ProductEntity(
        id,
        name, 
        price, 
        category,
      );
      
      return userEntity;
  
    }
  
  }