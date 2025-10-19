import { Request, Response } from "express";
import { CreateProductDto, CreateProductService, CustomError, ProductRepository, SearchAllProducts, UpdateProductDto, UpdateProductService } from "../../domain";
import { DeleteProductDto } from "../../domain/dtos/products/delete-product.dto";

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
      user: req.body.user.id, 
     
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
    .then( product => res.json( product ))
    .catch( error => this.handleError( error, res ));


  }
  deleteProduct = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const [error, dto] = DeleteProductDto.create({ id });
    if (error) return res.status(400).json({ error });

    try {
      const deleted = await this.productRepository.deleteProduct(dto!.id);

      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Devolver la entidad eliminada (200). Si prefieres no cuerpo, usa 204 y .send()
      return res.status(200).json(deleted);
    } catch (err) {
      return this.handleError(err, res);
    }
  }
  search = (req: Request, res: Response): any => {

    new SearchAllProducts(this.productRepository)
    .execute()
    .then( product => res.json( product ))
    .catch( error => this.handleError( error, res ));
  }
}