import { ImageEntity, ImageRepository, UploadImageDto } from "../..";


interface UploadImageUseCase {
    execute(dto: UploadImageDto): Promise<ImageEntity>;
}

export class UploadImageService implements UploadImageUseCase {

    constructor(private readonly imageRepository: ImageRepository ){}

    execute(dto: UploadImageDto): Promise<ImageEntity> {
        return this.imageRepository.uploadImage(dto);
    }
}