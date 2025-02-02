import { CreateUserDto, UserDatasource, UserEntity  } from "../../domain";
import { UserModel, } from "../../data";
import { BcryptAdapter } from "../../config";


export class MongoUserDatasourceImpl implements UserDatasource {

    

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

        //* Check if email already exist
        const existUser = await UserModel.findOne({email: createUserDto.email});
        if(existUser) throw new Error('Email already exist');

        try {
            //* Create user based on CreateUserDto
            const user = new UserModel(createUserDto);

            //* hash password
            user.password = BcryptAdapter.hash(createUserDto.password);
            await user.save();

            return UserEntity.fromObject(user);
            
        } catch (error) {
            throw new Error('Error creating user');
        }
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