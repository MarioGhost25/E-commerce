import { ProductModel} from "../../data";
import { CreateProductDto, CustomError, ProductDatasource, ProductEntity, UpdateProductDto } from "../../domain";


export class MongoProductDatasourceImpl implements ProductDatasource { 

    async createProduct(createProductDto: CreateProductDto) {
        
        const existProduct = await ProductModel.findOne({name: createProductDto.name});
        if (existProduct) throw CustomError.badRequest('Product already exist');

        try {

            const product = new ProductModel({
                ...createProductDto,
                user: createProductDto.seller
            });

            await product.save();

            return ProductEntity.fromObject(product);

           
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }
    async updateProduct(updatedProductDto: UpdateProductDto): Promise<ProductEntity> {

        const existProduct = await ProductModel.findById(updatedProductDto.id);
        if (!existProduct) throw CustomError.badRequest('Product not found');

        try {
            const newUpdateProduct = await ProductModel.findByIdAndUpdate(
                updatedProductDto.id,
                { ...updatedProductDto },
            );

            if (!newUpdateProduct) throw CustomError.notFound('Error updating product');

            return ProductEntity.fromObject(newUpdateProduct);  
            
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
            
        }
    }
    async searchALL(): Promise<ProductEntity[]>{
       
        try {
            const allProduts = await ProductModel.find({})
            return allProduts.map(product => ProductEntity.fromObject(product));
            
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

}