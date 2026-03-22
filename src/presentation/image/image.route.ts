import { Router } from "express";
import multer from "multer";
import { ImageController } from "./controller";
import { MongoImageDatasourceImpl } from "../../infrastructure/datasources/mongo_image-datasource.impl";
import { ImageRepositoryImpl } from "../../infrastructure/repositories/image-repository.impl";
import { upload } from "../middleware/multer.middleware";

export class ImageRoute {
  static get routes(): Router {

    const router = Router();

    const imageDatasource = new MongoImageDatasourceImpl();
    const imageRepository = new ImageRepositoryImpl(imageDatasource)
    
    const controller = new ImageController(imageRepository);

    router.post("/upload", [upload.single('file')], controller.upload);

    return router;
  }
}