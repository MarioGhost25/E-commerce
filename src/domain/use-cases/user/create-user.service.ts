
import { CreateUserDto, UserEntity, UserRepository } from "../..";

export interface CreateUserUC {
    execute(dto: CreateUserDto): Promise<UserEntity>
}

export class CreateUserServ implements CreateUserUC {

    constructor(
        private readonly userRepository: UserRepository,
    ){}

    execute( dto: CreateUserDto ): Promise<UserEntity> {
        return this.userRepository.createUser(dto);
    }

}