import  { isValidObjectId } from "mongoose";




export class GetUserDto {

    private constructor(
        public readonly userId: string,
    ){}

    public static getUserDto(object:{[ key: string]: any}): [string?, GetUserDto?] {
        const { userId } = object;

        if(!userId) return ["ID is required", undefined];
        if(typeof userId !== 'string') return ["ID must be a string", undefined];
        if(!isValidObjectId(userId)) return ["ID is not valid", undefined];
        
        return [undefined, new GetUserDto(userId)];
    }
}