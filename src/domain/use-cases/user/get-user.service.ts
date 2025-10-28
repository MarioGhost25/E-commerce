import { UserEntity, UserRepository } from "../..";


export interface GetUserUC {
    execute(userId: string): Promise<UserEntity>
}

export class GetUserServ implements GetUserUC {

    constructor(
        private readonly userRepository: UserRepository,
    ){}
    
    execute(userId: string): Promise<UserEntity> {
        return this.userRepository.getUserById(userId);
    }
}