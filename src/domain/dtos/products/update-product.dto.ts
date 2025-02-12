




export class UpdateProductDto {

    constructor(
        public name: string,
        public price: number,
        public description: string,
        public id : string,
    ){}

    public static updateProduct (object: {[key: string]: any}): [string?, UpdateProductDto?] {
        const { name, price, description, id} = object;
        
    
        if(!name) return ["Missing Name", undefined];
        if(!price) return ["Missing Price", undefined];
        if(!description) return ["Missing Description", undefined];
        if(!id) return ["Missing ID", undefined];
        
        

        return [undefined, new UpdateProductDto(name, price, description, id)];

    }

}