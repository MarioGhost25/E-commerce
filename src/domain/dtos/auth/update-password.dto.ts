
import { Types } from "mongoose";
import { regularExps } from "../../../config";


export class UpdatePasswordDto {

    private constructor(
        public readonly user: string,
        public readonly newPassword: string,
    ) { }

    public static updatePassword(object: { [key: string]: any }): [string?, UpdatePasswordDto?] {
        const { user, newPassword } = object;

        // 1. Required Fields Validation
        if (!user) return ["Missing user", undefined];
        if (!newPassword) return ["Missing newPassword", undefined];

        // 2. Format and Length Validation

        if (!Types.ObjectId.isValid(user)) {
            return ["Invalid user ID", undefined];
        }
        if (!regularExps.password.test(newPassword)) return ["New Password is invalid", undefined];


        return [undefined, new UpdatePasswordDto(
            user,
            newPassword
        )];
    }
}
