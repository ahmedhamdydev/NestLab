import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/products.schema';
import { CreateProduct } from './DTO/createProduct.dto';
import { UpdateProduct } from './DTO/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productModel.find();
    } catch (err) {
      throw new BadRequestException('Error retrieving products');
    }
  }

  // get user products
  async getUserProducts(userId: string): Promise<Product[]> {
    try {
      return await this.productModel.find({ userId });
    } catch (err) {
      throw new BadRequestException('Error retrieving user products');
    }
  }

  // get product by id
  async getProductById(userId: string, productId: string): Promise<Product> {
    try {
      return await this.productModel.findOne({ userId, _id: productId });
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  // create a new product
  async createProduct(
    userId: string,
    productData: CreateProduct,
  ): Promise<Product> {
    try {
      const newProduct = new this.productModel({ ...productData, userId });
      return await newProduct.save();
    } catch (err) {
      throw new BadRequestException('Error creating the product');
    }
  }

  // update product
  async updateProduct(
    userId: string,
    productId: string,
    updatedProduct: UpdateProduct,
  ): Promise<CreateProduct> {
    try {
      return await this.productModel.findByIdAndUpdate(
        { userId, _id: productId },
        updatedProduct,
        { new: true, runValidators: true },
      );
    } catch (err) {
      throw new BadRequestException('Error updating the product');
    }
  }

  // delete product
  async deleteProduct(productId: string): Promise<void> {
    try {
      const result = await this.productModel.findByIdAndDelete(productId);
      if (!result) {
        throw new NotFoundException('Product not found');
      }
    } catch (err) {
      throw new BadRequestException('Error deleting the product');
    }
  }
}
