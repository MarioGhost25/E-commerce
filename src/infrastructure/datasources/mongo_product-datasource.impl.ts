import { randomUUID } from "crypto";
import { ProductModel} from "../../data";
import { CreateProductDto, CustomError, ProductDatasource, ProductEntity, UpdateProductDto } from "../../domain";


export class MongoProductDatasourceImpl implements ProductDatasource {
    
    async createProduct(createProductDto: CreateProductDto) {
        
        const existProduct = await ProductModel.findOne({name: createProductDto.name});
        if (existProduct) throw CustomError.badRequest('Product already exist');
        
        const sku = this.generateSKU(createProductDto);
        
        try {

            const product = new ProductModel({
                ...createProductDto,
                user: createProductDto.user,
                sku,
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
        
        const sku = this.generateSKU(updatedProductDto);
        
        
        try {
            const newUpdateProduct = await ProductModel.findByIdAndUpdate(
                updatedProductDto.id,
                { ...updatedProductDto, sku },
            );
            
            if (!newUpdateProduct) throw CustomError.notFound('Error updating product');
            
            return ProductEntity.fromObject(newUpdateProduct);  
            
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
            
        }
    }
    
    async deleteProduct(productId: string): Promise<ProductEntity> {
        const item = await ProductModel.findByIdAndDelete(productId);
        if (!item) throw CustomError.notFound('Product not found');
        return ProductEntity.fromObject(item);
    }
    async searchAll(): Promise<ProductEntity[]>{
        
        try {
            const allProducts = await ProductModel.find({})
            return allProducts.map(product => ProductEntity.fromObject(product));
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

    generateSKU(generateSKU: CreateProductDto | UpdateProductDto): string {
        const { name, category } = generateSKU;
        const id = randomUUID().substring(0, 4).toUpperCase();
        const sku = `${name.substring(0,3).toUpperCase()}-${category.substring(0,3).toUpperCase()}-${id}`;
        return sku;
    }
    
}