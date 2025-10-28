
import { UserEntity, UserRepository } from "../..";

export interface UpdatePasswordUC {
    execute(userId: string, newPassword: string): Promise<UserEntity>
}

export class UpdatePasswordServ implements UpdatePasswordUC {

    constructor(
        private readonly userRepository: UserRepository,
    ){}

    execute(userId: string, newPassword: string ): Promise<UserEntity> {
        return this.userRepository.updatePassword(userId, newPassword);
    }

}