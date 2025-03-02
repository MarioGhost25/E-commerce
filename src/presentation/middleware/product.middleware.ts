import { NextFunction, Request, RequestHandler, Response } from "express";


export class ProductMiddleware{

    static sendIds: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

        const user = req.body
        


        next();
    }
}