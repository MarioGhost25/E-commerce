

import { ImageEntity, UploadImageDto } from "..";


export abstract class ImageDatasource {
    abstract uploadImage(uploadImageDto: UploadImageDto): Promise<ImageEntity>;
}