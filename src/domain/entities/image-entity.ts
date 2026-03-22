

export class ImageEntity{

    constructor(
        public readonly id: string,
        public readonly url: string,
        public readonly publicId: string,
    ){}

    public static fromObject(object: { [key: string]: any}): ImageEntity{
        const { id, url, publicId } = object;

        const imageEntity = new ImageEntity(
            id,
            url,
            publicId,
        )

        return imageEntity;
    }
}