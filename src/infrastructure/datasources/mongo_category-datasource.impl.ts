import { CategoryModel } from "../../data";
import { CategoryDatasource, CategoryEntity, CreateCategoryDto, CustomError } from "../../domain";




export class MongoCategoryDatasourceImpl implements CategoryDatasource {
    
    async createCategory(createCategoryDto: CreateCategoryDto) {
        
        try {
            const existCategory = await CategoryModel.findOne({ name: createCategoryDto.name })
            if (existCategory) throw CustomError.badRequest('Category already exist')

                const category = new CategoryModel({
                    ...createCategoryDto,
               user: createCategoryDto.user
            });
            
            await category.save()
            
            return CategoryEntity.fromObject(category);
            
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
            
        }
    }
    async getAllCategories() {
        try {
            const allCategories = await CategoryModel.find({})
            return allCategories.map(category => CategoryEntity.fromObject(category));
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }
    getCategoryById(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }

}