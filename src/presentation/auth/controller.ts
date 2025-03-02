import { Request, Response } from 'express';
import { CreateUserDto, CreateUserServ, CustomError, LoginUserDto, LoginUserServ, UserRepository } from '../../domain';




export class AuthController{
    
    constructor(
        private readonly userRepository: UserRepository,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
      };

    loginUser = (req:Request, res:Response): any => {
        const [error, loginUserDto] = LoginUserDto.loginUser(req.body);
        if (error) return res.status(400).json({ error });

        new LoginUserServ( this.userRepository )
        .execute( loginUserDto! )
        .then( user => res.json(user))
        .catch( err => this.handleError( err, res) );
    }

    createUser = ( req:Request, res:Response ): any => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error ) return res.status(400).json({ error });

        new CreateUserServ( this.userRepository )
        .execute( createUserDto! )
        .then( user => res.json( user ))
        .catch( err => this.handleError( err, res ) );

    }
}