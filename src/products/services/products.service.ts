import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  // private counterId = 1;
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Product1',
  //     description: 'Lorem',
  //     price: 12,
  //     stock: 1,
  //     image: 'url',
  //   },
  // ];
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // create(payload: CreateProductDto) {
  //   this.counterId = this.counterId + 1;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, payload: UpdateProductDto) {
  //   const productUpdate = this.findOne(id);
  //   if (productUpdate) {
  //     const index = this.products.findIndex((product) => product.id === id);
  //     this.products[index] = {
  //       ...productUpdate,
  //       ...payload,
  //     };

  //     return this.products[index];
  //   }

  //   return null;
  // }

  // delete(id: number) {
  //   const index = this.products.findIndex((product) => product.id === id);
  //   if (index == -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }

  //   this.products.splice(index, 1);
  //   return true;
  // }
}
