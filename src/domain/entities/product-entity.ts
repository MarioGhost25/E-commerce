
export class ProductEntity {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public sku: string,
        public category: string,
        public stock: number,
        public stockStatus: string,
        public isActive: boolean,
        public rating: number,
        public images: string[],
    ) { }
  
    public static fromObject( object: { [ key: string ]: any; } ): ProductEntity {
      const { id, name, description, price, category, stock, sku, isActive, stockStatus,rating, images} = object;
  
      const productEntity = new ProductEntity(
        id, 
        name, 
        description,
        price, 
        sku,
        category,
        stock,
        stockStatus,
        isActive,
        rating,
        images,
      );
      
      return productEntity;
  
    }
  
  }