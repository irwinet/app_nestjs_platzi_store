import { Injectable } from '@nestjs/common';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product1',
      description: 'Lorem',
      price: 12,
      stock: 1,
      image: 'url',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const productUpdate = this.findOne(id);
    if (productUpdate) {
      const index = this.products.findIndex((product) => product.id === id);
      this.products[index] = {
        ...productUpdate,
        ...payload,
      };

      return this.products[index];
    }

    return null;
  }

  delete(id: number) {
    const deleteProduct = this.products.filter((product) => product.id !== id);
    this.products = deleteProduct;

    return {
      id,
      delete: true,
      count: 1,
    };
  }
}
