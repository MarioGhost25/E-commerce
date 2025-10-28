import { Request, Response } from 'express';
import { CreateUserDto, CreateUserServ, CustomError, GetUserDto, GetUserServ, LoginUserDto, LoginUserServ, UpdatePasswordDto, UpdatePasswordServ, UserRepository } from '../../domain';





export class AuthController {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };

    getUserById = (req: Request, res: Response): any => {

        const userId = req.params.id;
        const [error, getUserDto] = GetUserDto.getUserDto({ userId });
        if (error) return res.status(400).json({ error });

        new GetUserServ(this.userRepository)
            .execute(getUserDto!.userId)
            .then(user => res.json(user))
            .catch(err => this.handleError(err, res));
    }

    loginUser = (req: Request, res: Response): any => {
        const [error, loginUserDto] = LoginUserDto.loginUser(req.body);
        if (error) return res.status(400).json({ error });

        new LoginUserServ(this.userRepository)
            .execute(loginUserDto!)
            .then(user => res.json(user))
            .catch(err => this.handleError(err, res));
    }

    createUser = (req: Request, res: Response): any => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateUserServ(this.userRepository)
            .execute(createUserDto!)
            .then(user => res.json(user))
            .catch(err => this.handleError(err, res));

    }

    updatePassword = (req: Request, res: Response): any => {
        // To be implemented
        const [error, updatePasswordDto] = UpdatePasswordDto.updatePassword({
            ...req.body,
            user: req.body.user.id,
        });

        if (error) return res.status(400).json({ error });
        const { user, newPassword } = updatePasswordDto!;

        new UpdatePasswordServ(this.userRepository)
            .execute(user, newPassword)
            .then(user => res.json(user))
            .catch(err => this.handleError(err, res));
    }
}