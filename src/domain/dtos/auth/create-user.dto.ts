import { regularExps } from "../../../config";


export class CreateUserDto{


    private constructor(
        public name:string,
        public email:string,
        public password:string,
    ){}

    public static create(object:{[ key: string ]: any }):[ string?, CreateUserDto? ] {
        const {name, email, password} = object;

        if(!name) return ["Missing Name", undefined];
        if(!email) return ["Missing email", undefined];
        if(!regularExps.email.test(email)) return ["Email Invalid", undefined];
        if(!password) return ["Missing Password", undefined];
        if (password.length < 6) return ["Password too short", undefined];  

        return [undefined, new CreateUserDto(name, email, password)];

    } 
}