import { ImageDatasource, ImageEntity, ImageRepository, UploadImageDto } from "../../domain";


export class ImageRepositoryImpl implements ImageRepository {
    constructor(
        private readonly imageDatasource: ImageDatasource
    ){}
    uploadImage(uploadImageDto: UploadImageDto): Promise<ImageEntity> {
        return this.imageDatasource.uploadImage(uploadImageDto);
    }
    
}