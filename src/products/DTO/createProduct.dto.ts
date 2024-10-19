import { IsString, IsNumber, IsOptional, Min, Length } from 'class-validator';

export class CreateProduct {
  @IsString()
  @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
  title: string;

  @IsString()
  @Length(10, 200, {
    message: 'Description must be between 10 and 200 characters',
  })
  description: string;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @IsString()
  category: string;
}
