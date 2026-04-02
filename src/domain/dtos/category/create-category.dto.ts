import { Types } from 'mongoose';

export class CreateCategoryDto {

    private constructor(
        public readonly user: string,
        public readonly name: string,
        public readonly description: string,
        public readonly image: string,
        public readonly isActive?: boolean,
        public readonly slug?: string,
    ) { }

    public static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
        const {
            user,
            name,
            description,
            image,
            isActive,
            slug = name,
        } = object;

        // 1. Required Fields Validation
        if (!user) return ["Missing seller ID", undefined];
        if (!name) return ["Missing name", undefined];
        if (!description) return ["Missing description", undefined];
        if (!image) return ["Missing image", undefined];

        

        // 2. Type and Value Validation
        if (typeof name !== 'string') return ["Name must be a string", undefined];
        if (typeof description !== 'string') return ["Description must be a string", undefined];
        if (typeof image !== 'string') return ["image must be a string", undefined];
      
        if (!Types.ObjectId.isValid(user)) {
            return ["Invalid user ID", undefined];
        }

        return [undefined, new CreateCategoryDto(
            user,
            name,
            description,
            image,
            isActive,
            slug,
        )];
    }
}
