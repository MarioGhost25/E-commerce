import { CreateUserDto, UserEntity } from "..";


export abstract class UserDatasource{
    abstract createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    abstract login(email:string, password:string): Promise<UserEntity>;
    // abstract findById(id: number): Promise<UserEntity>;
    // abstract findEmail(email:string):  Promise<UserEntity>;
}