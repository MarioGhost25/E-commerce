import { CategoryEntity, CreateCategoryDto } from "..";


export abstract class CategoryRepository {
  abstract createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
  abstract getAllCategories(): Promise<CategoryEntity[]>;
  abstract getCategoryById(categoryId: string): Promise<CategoryEntity>;
  //abstract updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity>;
  abstract deleteCategory(categoryId: string): Promise<CategoryEntity>;
  
}