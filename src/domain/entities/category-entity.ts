
export class CategoryEntity {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public slug: string,
        public image: string,
        public isActive: boolean,
        public products?: string[],
    ) { }
  
    public static fromObject( object: { [ key: string ]: any; } ): CategoryEntity {
      const { id, name, description, slug, image, isActive, products } = object;
  
      const categoryEntity = new CategoryEntity(
        id, 
        name, 
        description,
        slug,
        image,
        isActive,
        products
      );
      
      return categoryEntity;
  
    }
  
  }