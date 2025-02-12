


export class CreateProductDto {

    constructor(
        public name: string,
        public price: number,
        public description: string,
        public userId: string
    ){}

    public static createProduct (object1: {[key: string]: any}): [string?, CreateProductDto?] {
        const {name, price, description, user} = object1;
        const userId = user;
    

        if(!name) return ["Missing Name", undefined];
        if(!price) return ["Missing Price", undefined];
        if(!description) return ["Missing Description", undefined];
        if(!userId) return ["Missing User Id", undefined];
        

        return [undefined, new CreateProductDto(name, price, description, userId)];

    }

}