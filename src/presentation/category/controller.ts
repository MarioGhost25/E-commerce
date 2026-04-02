import { Request, RequestHandler, Response } from "express";
import { CategoryRepository, CreateCategoryDto, CreateCategoryService, CustomError, GetAllCategories } from "../../domain";


export class CategoryController {

    constructor(
        private readonly categoryRepository: CategoryRepository
    ) { }

    private handleError = (error: unknown, res: Response): void => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }

        console.log(`${error}`);
        res.status(500).json({ error: 'Internal server error' });
    };

    createCategory: RequestHandler = (req: Request, res: Response) => {
       
        const userId = req.user?.id;
        if(!userId){
            res.status(401).json({ error: 'Unauthorized user' })
            return;
        }
        const [error, createCategoryDto] = CreateCategoryDto.create({
            ...req.body,
            user: userId,
        })

        if(error){
            res.status(400).json({ error })
            return;
        }

        new CreateCategoryService(this.categoryRepository)
        .execute(createCategoryDto!)
        .then(category => res.json(category))
        .catch(err => this.handleError(err, res))
    }

    getAllCategories: RequestHandler = (req: Request, res: Response) => {
        
        new GetAllCategories(this.categoryRepository)
            .execute()
            .then(category => res.json(category))
            .catch(err => this.handleError(err, res))
    }
}