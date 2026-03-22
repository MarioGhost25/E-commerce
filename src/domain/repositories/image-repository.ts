import { ImageEntity, UploadImageDto } from "..";


export abstract class ImageRepository {
    abstract uploadImage(uploadImageDto: UploadImageDto): Promise<ImageEntity>;
}