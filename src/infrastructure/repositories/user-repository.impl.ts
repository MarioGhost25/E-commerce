
import { CreateUserDto, UserEntity, UserRepository, UserDatasource } from "../../domain";


export class UserRepositoryImpl implements UserRepository{

    constructor(
        private readonly userDataSource: UserDatasource,
    ){}
    getUserById(userId: string): Promise<UserEntity> {
        return this.userDataSource.getUserById(userId);
    }
    createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userDataSource.createUser(createUserDto);
    }
    
    login(email: string, password: string): Promise<UserEntity> {
        return this.userDataSource.login(email, password);
    }
    updatePassword(userId: string, newPassword: string): Promise<UserEntity> {
        return this.userDataSource.updatePassword(userId, newPassword);
    }

    // findEmail(email: string): Promise<UserEntity> {
    //     throw new Error("Method not implemented.");
    // }
    
    
    
}