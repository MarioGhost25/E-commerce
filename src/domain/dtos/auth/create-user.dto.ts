
import { regularExps } from "../../../config";

// Define a type for the address structure for clarity and reusability.
export type Address = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
};

export class CreateUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role?: string,
        public readonly contactPhone?: string,
        public readonly shippingAddresses?: Address[],
    ) {}

    public static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
        const {
            name,
            email,
            password,
            role,
            contactPhone,
            shippingAddresses
        } = object;

        // 1. Required Fields Validation
        if (!name) return ["Missing name", undefined];
        if (!email) return ["Missing email", undefined];
        if (!password) return ["Missing password", undefined];

        // 2. Format and Length Validation
        if (typeof name !== 'string') return ["Name must be a string", undefined];
        if (name.length < 2) return ["Name is too short", undefined];

        if (!regularExps.email.test(email)) return ["Email is not valid", undefined];

        if (password.length < 6) return ["Password must be at least 6 characters", undefined];

        // 3. Optional Fields Validation
        if (role) {
            if (typeof role !== 'string') return ["Role must be a string", undefined];
            if (role !== 'admin' && role !== 'user') {
                return ["Invalid role. Must be 'admin' or 'user'", undefined];
            }
        }

        if (contactPhone) {
             if (typeof contactPhone !== 'string') return ["Contact phone must be a string", undefined];
        }

        if (shippingAddresses) {
            if (!Array.isArray(shippingAddresses)) {
                return ["Shipping addresses must be an array", undefined];
            }
            for (const address of shippingAddresses) {
                if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
                    return ["All fields in a shipping address are required", undefined];
                }
            }
        }

        return [undefined, new CreateUserDto(
            name,
            email,
            password,
            role,
            contactPhone,
            shippingAddresses
        )];
    }
}
