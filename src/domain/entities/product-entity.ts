
export class ProductEntity {

    constructor(
        public id: string,
        public name: string,
        public price: number,
        public category: string,
        public status: string,
        public stock: number,
        public sku: string,
        public isActive: boolean,
        public stockStatus: string,
    ) { }
  
    public static fromObject( object: { [ key: string ]: any; } ): ProductEntity {
      const { id, name, price, category, status, stock, sku, isActive, stockStatus } = object;
  
      const userEntity = new ProductEntity(
        id, 
        name, 
        price, 
        category,
        status,
        stock,
        sku,
        isActive,
        stockStatus,
      );
      
      return userEntity;
  
    }
  
  }