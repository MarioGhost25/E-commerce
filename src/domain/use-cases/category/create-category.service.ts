import { CategoryEntity, CategoryRepository, CreateCategoryDto } from "../..";

interface CreateCategoryUseCase {
    execute(dto: CreateCategoryDto): Promise<CategoryEntity>;
}

export class CreateCategoryService implements CreateCategoryUseCase {

    constructor(private readonly categoryRepository: CategoryRepository  ){}

    execute(dto: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoryRepository.createCategory(dto);
    }
}
