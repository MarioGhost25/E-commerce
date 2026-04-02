import { CategoryDatasource, CategoryEntity, CategoryRepository, CreateCategoryDto } from "../../domain";


export class CategoryRepositoryImpl implements CategoryRepository {

    constructor(
        private readonly categoryDatasource: CategoryDatasource 
    ){}
    getAllCategories(): Promise<CategoryEntity[]> {
        return this.categoryDatasource.getAllCategories();
    }
    getCategoryById(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(categoryId: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoryDatasource.createCategory(createCategoryDto);
    }
}