
export class CategoryEntity {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public isActive: boolean,
        public image: string,
        public slug: string,
    ) { }
  
    public static fromObject( object: { [ key: string ]: any; } ): CategoryEntity {
      const { id, name, description, isActive, image, slug} = object;
  
      const categoryEntity = new CategoryEntity(
        id, 
        name, 
        description,
        isActive,
        image,
        slug,
      );
      
      return categoryEntity;
  
    }
  
  }