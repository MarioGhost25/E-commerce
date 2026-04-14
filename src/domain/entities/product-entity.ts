
type ProductReview = {
  user: string | null;
  rating: number | null;
  comment: string | null;
}

export class ProductEntity {

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public longDescription: string | null,
    public originalPrice: number | null,
    public price: number,
    public sku: string,
    public category: string,
    public stock: number,
    public stockStatus: string,
    public isActive: boolean,
    public rating: number,
    public features: string[],
    public images: string[],
    public reviews: ProductReview[] | null,
  ) { }

  public static fromObject(object: { [key: string]: any; }): ProductEntity {
    const {
      id,
      name,
      description,
      longDescription,
      originalPrice,
      price,
      category,
      stock,
      sku,
      isActive,
      stockStatus,
      rating,
      features,
      images,
      reviews,
    } = object;


    const productEntity = new ProductEntity(
      id,
      name,
      description,
      longDescription ?? null,
      originalPrice ?? null,
      price,
      sku,
      category,
      stock,
      stockStatus,
      isActive,
      rating,
      features,
      images,
      reviews,
    );

    return productEntity;

  }

}