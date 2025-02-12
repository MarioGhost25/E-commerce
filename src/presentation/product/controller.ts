import { Request, Response } from "express";
import { CreateProductDto, CreateProductService, CustomError, ProductRepository, SearchAllProducts, UpdateProductDto, UpdateProductService } from "../../domain";
import { Types } from "mongoose";




export class ProductController {

  constructor(
    private readonly productRepository: ProductRepository,
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  createProduct = async (req: Request, res: Response): Promise<void> => {
    const [error, createProductDto] = CreateProductDto.createProduct({
      ...req.body,
      user: req.body.user.id.toString(),
    });

    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      const category = await new CreateProductService(this.productRepository).execute(createProductDto!);
      res.status(201).json(category);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateProduct = (req: Request, res: Response): any => {
    const id = req.params.id;

    const [error, updateProductDto] = UpdateProductDto.updateProduct({ ...req.body, id});
    if(error) return res.status(400).json({ error });

    new UpdateProductService(this.productRepository)
    .execute(updateProductDto!)
    .then((product) => res.json(product))
    .catch((error) => this.handleError(error, res));


  }
  search = (req: Request, res: Response): any => {

    new SearchAllProducts(this.productRepository)
    .execute()
    .then((product) => res.json(product))
    .catch((error) => this.handleError(error, res));
  }
}