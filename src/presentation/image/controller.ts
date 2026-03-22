import { Request, Response } from "express";
import { CustomError, ImageRepository, UploadImageDto, UploadImageService } from "../../domain";


export class ImageController {

    constructor(
        private readonly imageRepository: ImageRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };



    upload = (req: Request, res: Response): any => {
        const [error, uploadImageDto] = UploadImageDto.create(req.file!);
        if (error) return res.status(400).json({ error });

        new UploadImageService(this.imageRepository)
            .execute(uploadImageDto!)
            .then(imgUrl => res.json(imgUrl))
            .catch(err => this.handleError(err, res))


    }
};
