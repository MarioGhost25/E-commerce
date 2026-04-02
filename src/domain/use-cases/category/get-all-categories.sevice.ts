import { CategoryRepository } from "../..";
import { CategoryEntity } from "../../entities/category-entity";


interface GetAllCategoriesInterface{
    execute():Promise<CategoryEntity[]>
}

export class GetAllCategories implements GetAllCategoriesInterface{

    constructor(private readonly categoryRepository: CategoryRepository){}

    execute(): Promise<CategoryEntity[]> {
        return this.categoryRepository.getAllCategories();
    }

}