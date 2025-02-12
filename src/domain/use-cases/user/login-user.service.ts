import { LoginUserDto, UserEntity, UserRepository } from "../..";


export interface LoginUserUC {
    execute(dto: LoginUserDto): Promise<UserEntity>
}

export class LoginUserServ implements LoginUserUC {

    constructor(
        private readonly userRepository: UserRepository,
    ){}
    
    execute(dto: LoginUserDto): Promise<UserEntity> {
        return this.userRepository.login(dto.email, dto.password);
    }
}