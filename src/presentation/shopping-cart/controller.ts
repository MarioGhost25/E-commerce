import { Request, Response } from "express";
import { AddProductsDto, AddProductsService, CreateShoppingCartDto, CreateShoppingCartService, CustomError, GetCartByUserIdService, ShoppingCartRepository } from "../../domain";


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

    createShoppingCart = (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized user' });

        const [error, createShoppingCartDto] = CreateShoppingCartDto.create({
            ...req.body,
            user: userId,
        });

        if (error) return res.status(400).json({ error });

        new CreateShoppingCartService(this.shoppingCartRepository)
            .execute(createShoppingCartDto!)
            .then(cart => res.json(cart))
            .catch(err => this.handleError(err, res))

    }

    getCartByUserId = (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized user' });

        new GetCartByUserIdService(this.shoppingCartRepository)
            .execute(userId)
            .then(cart => res.json(cart))
            .catch(err => this.handleError(err, res));

    }

    addProducts = (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized user' });

        const [error, addProductsDto] = AddProductsDto.add({
            ...req.body,
            user: userId,
        })

        if (error) return res.status(400).json({ error })

        new AddProductsService(this.shoppingCartRepository)
        .execute(addProductsDto!)
        .then(cart => res.json(cart))
        .catch(err => this.handleError(err, res))
    }

    removeProductOnShoppingCart = (req: Request, res: Response) => {
        throw new Error('Not Implemented')


    }
}