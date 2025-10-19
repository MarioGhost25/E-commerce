import { Types } from 'mongoose';

export class DeleteProductDto {
  private constructor(public readonly id: string) {}

  public static create(object: { id?: any }): [string?, DeleteProductDto?] {
    const { id } = object;
    if (!id) return ['ID is required', undefined];
    if (typeof id !== 'string') return ['ID must be a string', undefined];
    if (!Types.ObjectId.isValid(id)) return ['Invalid product ID', undefined];
    return [undefined, new DeleteProductDto(id)];
  }
}