import { Request, Response } from "express";
import { CreateShoppingCartDto, CreateShoppingCartService, CustomError, GetCartByUserIdService, ShoppingCartRepository } from "../../domain";
import { error } from "console";


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

    createProductOnShoppingCart = (req: Request, res: Response) => {

        const [error, createShoppingCartDto] = CreateShoppingCartDto.create({
            ...req.body,
            user: req.body.user.id,
        });

        if (error) res.status(400).json({ error });


        new CreateShoppingCartService(this.shoppingCartRepository)
            .execute(createShoppingCartDto!)
            .then(cart => res.json(cart))
            .catch(err => this.handleError(err, res))

    }


    getCartByUserId = (req: Request, res: Response) => {

        const { _id: id } = req.body.user.id;
        if (!id) res.status(400).json({ error: 'User ID is required ' })

        new GetCartByUserIdService(this.shoppingCartRepository)
            .execute(id)
            .then(cart => res.json(cart))
            .catch(err => this.handleError(err, res));

    }

    updateProductOnShoppingCart = (req: Request, res: Response) => {
        throw new Error('Not Implemented')
    }

    removeProductOnShoppingCart = (req: Request, res: Response) => {
        throw new Error('Not Implemented')


    }
}