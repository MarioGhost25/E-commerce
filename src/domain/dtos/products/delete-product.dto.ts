import { Types } from 'mongoose';

export class DeleteProductDto {
  private constructor(
    public readonly id: string,
    public readonly category: string,
  ) {}

  public static create(object: { id?: any, category?: any }): [string?, DeleteProductDto?] {
    const { id, category } = object;
    if (!id) return ['ID is required', undefined];
    if (typeof id !== 'string') return ['ID must be a string', undefined];
    if (!Types.ObjectId.isValid(id)) return ['Invalid product ID', undefined];
    if (!category) return ['Category ID is required', undefined];
    if (typeof category !== 'string') return ['Category ID must be a string', undefined];
    if (!Types.ObjectId.isValid(category)) return ['Invalid category ID', undefined];
    return [undefined, new DeleteProductDto(id, category)];
  }
}