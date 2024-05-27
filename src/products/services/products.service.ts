import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindCondition, Repository } from 'typeorm';
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

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindCondition<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        take: limit,
        skip: offset,
        where,
      });
    }
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
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter((p) => p.id !== categoryId);
    return this.productRepo.save(product);
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId);
    product.categories.push(category);
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
