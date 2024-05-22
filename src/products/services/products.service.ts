import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

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
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandsRepo: Repository<Brand>,
    private brandsService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandsRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandsRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return this.productRepo.delete(id);
  }
}
