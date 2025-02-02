import { CreateUserDto } from "../dtos/auth/create-user.dto";
import { UserEntity } from "../entities/user-entity";


export abstract class UserRepository{
    abstract createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    // abstract login(email:string, password:string): Promise<UserEntity>;
    // abstract findById(id: number): Promise<UserEntity>;
    // abstract findEmail(email:string):  Promise<UserEntity>;
}