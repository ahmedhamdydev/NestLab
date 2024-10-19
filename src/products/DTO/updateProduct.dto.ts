import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { CreateProduct } from './createProduct.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProduct extends PartialType(CreateProduct) {
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @Length(10, 200, {
    message: 'Description must be between 10 and 200 characters',
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price?: number;

  @IsOptional()
  @IsString()
  category?: string;
}
