import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  getCategory(@Param('productId') productId: any, @Param('id') id: any) {
    return `product ${productId} and category ${id}`;
  }
}
