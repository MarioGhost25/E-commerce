
import { CreateUserDto, UserEntity, UserRepository, UserDatasource } from "../../domain";


export class UserRepositoryImpl implements UserRepository{

    constructor(
        private readonly userDataSource: UserDatasource,
    ){}
    createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userDataSource.createUser(createUserDto);  
    }

   

    // login(email: string, password: string): Promise<UserEntity> {
    //     throw new Error("Method not implemented.");
    // }
    // findById(id: number): Promise<UserEntity> {
    //     throw new Error("Method not implemented.");
    // }
    // findEmail(email: string): Promise<UserEntity> {
    //     throw new Error("Method not implemented.");
    // }
    
    
    
}