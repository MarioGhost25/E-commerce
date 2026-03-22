import { ImageDatasource, ImageEntity, UploadImageDto } from "../../domain";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export class MongoImageDatasourceImpl implements ImageDatasource {

    async uploadImage(uploadImageDto: UploadImageDto): Promise<ImageEntity> {

    const { file } = uploadImageDto;

    return new Promise<ImageEntity>((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "ecommerce",
                resource_type: "image",
                format: "webp",
                transformation: [
                    { width: 800, crop: "scale" },
                    { quality: "auto" }
                ]
            },
            (error: Error | undefined, result?: UploadApiResponse) => {

                if (error) return reject(error);

                if (!result) return reject(new Error("Upload failed"));

                resolve(
                    new ImageEntity(
                        result.asset_id ?? result.public_id,
                        result.secure_url,
                        result.public_id
                    )
                );
            }
        );

        // 👇 aquí solo envías el buffer
        uploadStream.end(file.buffer);
    });
}

}