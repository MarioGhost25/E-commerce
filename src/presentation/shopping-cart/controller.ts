import { Request, Response } from "express";
import { CreateShoppingCartDto, CreateShoppingCartService, CustomError, ShoppingCartRepository } from "../../domain";


export class ShoppingCartController {

    constructor(
        private readonly shoppingCartRepository: ShoppingCartRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };

    createProductOnShoppingCart = async (req: Request, res: Response): Promise<void>=> {
        
        const productIds: Array<string> = req.params.id.split(',').filter((id) => id.trim() !== '');

        const [error, createShoppingCartDto] = CreateShoppingCartDto.create({
            user: req.body.user.id.toString(),
            quantity: req.body.quantity,
            productIds,
        })

        if (error) {
            res.status(400).json({ error });
            return;
        }

        try {
            const shoppingC = await new CreateShoppingCartService(this.shoppingCartRepository).execute(createShoppingCartDto!);
            res.status(201).json(shoppingC);
        } catch (error) {
            this.handleError(error, res);
        }
    }
    
    removeProductOnShoppingCart = (req: Request, res: Response) => {

    }
}