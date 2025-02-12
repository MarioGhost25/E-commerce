import { ProductModel} from "../../data";
import { CreateProductDto, ProductDatasource, ProductEntity, UpdateProductDto } from "../../domain";


export class MongoProductDatasourceImpl implements ProductDatasource { 

    async createProduct(createProductDto: CreateProductDto) {
        
        const existProduct = await ProductModel.findOne({name: createProductDto.name});
        if (existProduct) throw new Error('Product already exist');

        try {

            const product = new ProductModel({
                ...createProductDto,
                user: createProductDto.userId
            });

            await product.save();

            return ProductEntity.fromObject(product);

           
        } catch (error) {
            throw new Error('Error creating user' + error);
        }
    }
    async updateProduct(updatedProductDto: UpdateProductDto): Promise<ProductEntity> {

        const existProduct = await ProductModel.findById(updatedProductDto.id);
        if (!existProduct) throw new Error('Product not found');

        try {
            const newUpdateProduct = await ProductModel.findByIdAndUpdate(
                updatedProductDto.id,
                { ...updatedProductDto },
            );

            if (!newUpdateProduct) throw new Error('Error updating product');

            return ProductEntity.fromObject(newUpdateProduct);  
            
        } catch (error) {
            throw new Error('Error updating user' + error);
            
        }
    }
    async searchALL(): Promise<ProductEntity[]>{
       
        try {
            const allProduts = await ProductModel.find({})
            return allProduts.map(product => ProductEntity.fromObject(product));
            
        } catch (error) {
            throw new Error('Products not found' + error);
        }
    }

}