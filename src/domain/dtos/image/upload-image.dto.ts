

export class UploadImageDto {

  
    private constructor(
        public readonly file: Express.Multer.File
    ) {}

    public static create(file: Express.Multer.File): [string?, UploadImageDto?]{

        if (!file) return ["file is required", undefined];
        
        return [undefined, new UploadImageDto(file)];
    }
}