import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct } from './DTO/createProduct.dto';
import { UpdateProduct } from './DTO/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this._productsService.getAllProducts();
  }

  @Get(':userId')
  getUserProducts(@Param('userId') userId: string) {
    return this._productsService.getUserProducts(userId);
  }

  @Get(':userId/:productId')
  getProductById(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this._productsService.getProductById(userId, productId);
  }

  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  createProduct(
    @Param('userId') userId: string,
    @Body() productData: CreateProduct,
  ) {
    return this._productsService.createProduct(userId, productData);
  }

  @Patch(':userId/:productId')
  updateProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updatedProductData: UpdateProduct,
  ) {
    return this._productsService.updateProduct(
      userId,
      productId,
      updatedProductData,
    );
  }

  @Delete(':productId')
  deleteProduct(@Param('productId') productId: string) {
    return this._productsService.deleteProduct(productId);
  }
}
