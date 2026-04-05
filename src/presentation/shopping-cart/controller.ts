import { Request, RequestHandler, Response } from "express";
import { AddProductsDto, AddProductsService, CreateShoppingCartDto, CreateShoppingCartService, CustomError, GetCartByUserIdService, RemoveProductsDto, RemoveProductsService, ShoppingCartRepository } from "../../domain";


export class ShoppingCartController {

    constructor(
        private readonly shoppingCartRepository: ShoppingCartRepository,
    ) { }

    private handleError = (error: unknown, res: Response): void => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }

        console.log(`${error}`);
        res.status(500).json({ error: 'Internal server error' });
    };

    createShoppingCart: RequestHandler = (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized user' });
            return;
        }

        const [error, createShoppingCartDto] = CreateShoppingCartDto.create({
            ...req.body,
            user: userId,
        });

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new CreateShoppingCartService(this.shoppingCartRepository)
            .execute(createShoppingCartDto!)
            .then(cart => res.json(cart))
            .catch(err => this.handleError(err, res))

    }

    getCartByUserId: RequestHandler = (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized user' });
            return;
        }

        new GetCartByUserIdService(this.shoppingCartRepository)
            .execute(userId)
            .then(cart => res.json(cart))
            .catch(err => this.handleError(err, res));

    }

    addProducts: RequestHandler = (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized user' });
            return;
        }

        const [error, addProductsDto] = AddProductsDto.add({
            ...req.body,
            user: userId,
        })

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new AddProductsService(this.shoppingCartRepository)
            .execute(addProductsDto!)
            .then(cart => res.json(cart))
            .catch(err => this.handleError(err, res))
    }

    removeProducts : RequestHandler = (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized user' });
            return;
        }

        const [error, removeProductsDto] = RemoveProductsDto.remove({
            ...req.body,
            user: userId,
        });

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new RemoveProductsService(this.shoppingCartRepository)
            .execute(removeProductsDto!)
            .then(cart => res.json(cart))
            .catch(err => this.handleError(err, res));

    }

    
}