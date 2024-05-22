import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  // private counterId = 1;
  // private brands: Brand[] = [
  //   {
  //     id: 1,
  //     name: 'Brand 1',
  //     image: 'url',
  //   },
  // ];

  constructor(@InjectRepository(Brand) private brandsRepo: Repository<Brand>) {}

  findAll() {
    return this.brandsRepo.find();
  }

  findOne(id: number) {
    const brand = this.brandsRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = this.brandsRepo.create(payload);
    return this.brandsRepo.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const brandUpdate = await this.brandsRepo.findOne(id);
    this.brandsRepo.merge(brandUpdate, payload);

    return this.brandsRepo.save(brandUpdate);
  }

  delete(id: number) {
    return this.brandsRepo.delete(id);
  }
}
