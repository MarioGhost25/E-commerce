import { Request, Response } from 'express';
import { CreateUserDto, CreateUserServ, LoginUserDto, LoginUserServ, UserRepository } from '../../domain';




export class AuthController{
    
    constructor(
        private readonly userRepository: UserRepository,
    ){}

    loginUser = (req:Request, res:Response): any => {
        const [error, loginUserDto] = LoginUserDto.loginUser(req.body);
        if (error) return res.status(400).json({ error });

        new LoginUserServ( this.userRepository )
        .execute( loginUserDto! )
        .then( user => res.json(user))
        .catch( err => res.status(400).json({ err }) );
    }

    createUser = ( req:Request, res:Response ): any => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error ) return res.status(400).json({ error });

        new CreateUserServ( this.userRepository )
        .execute( createUserDto! )
        .then( user => res.json( user ))
        .catch( err => res.status(400).json({ err }) );

    }
}