import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new-endpoint')
  newEndpoint(): string {
    return 'New endpoint..';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `limit ${limit}, offset ${offset}, brand ${brand}`;
  }

  @Get('products/filter')
  getProductFilter() {
    return `yo soy filter`;
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productId: any) {
    return `product ${productId}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: any, @Param('id') id: any) {
    return `product ${productId} and category ${id}`;
  }
}
