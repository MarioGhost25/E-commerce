import { CreateUserDto, CustomError, UserDatasource, UserEntity } from "../../domain";
import { UserModel, } from "../../data";
import { BcryptAdapter, JwtAdapter } from "../../config";


export class MongoUserDatasourceImpl implements UserDatasource {

    async createUser(createUserDto: CreateUserDto) {

        //* Check if email already exist
        const existUser = await UserModel.findOne({ email: createUserDto.email });
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            //* Create user based on CreateUserDto
            const user = new UserModel(createUserDto);

            //* hash password
            user.password = BcryptAdapter.hash(createUserDto.password);
            await user.save();

            //* Generate token after saving user
            const token = await JwtAdapter.generateToken({ id: user._id });
            if (!token) CustomError.internalServer('Error generating token');

            //* Return userEntity not userSchema with token
            const { ...userEntity } = UserEntity.fromObject(user);

            return {
                 ...userEntity,
                token: { token },
            }

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

    async login(email: string, password: string) {

        try {
            //* First of all, check if user exist
            const user = await UserModel.findOne({ email: email });
            if (!user) throw CustomError.notFound('User not found');

            //* and Check if password is the same
            const arePasswordsvalid = BcryptAdapter.compare(password, user.password);
            if (!arePasswordsvalid) throw CustomError.badRequest('Invalid password');

            const token = await JwtAdapter.generateToken({ id: user._id });
            if (!token) CustomError.internalServer('Error generating token');

            const { ...userEntity } = UserEntity.fromObject(user);

            return {
                 ...userEntity,
                token: { token },
            }

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }
}