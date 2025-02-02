import { Request, Response } from 'express';
import { CreateUserDto } from '../../domain/dtos';
import { CreateUserServ, UserRepository } from '../../domain';


export class AuthController{


    constructor(
        private readonly userRepository: UserRepository,
    ){}

    // loginUser = (req:Request, res:Response) => {

    // }

    public createUser = ( req:Request, res:Response ): any => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error ) return res.status(400).json({ error });

        new CreateUserServ( this.userRepository )
        .execute( createUserDto! )
        .then( user => {
            res.json( user );
            console.log('User:', user);
        })
        .catch( err => res.status(400).json({ err }) );

    }
}