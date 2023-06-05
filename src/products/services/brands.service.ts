import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'url',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brandUpdate = this.findOne(id);
    if (brandUpdate) {
      const index = this.brands.findIndex((item) => item.id === id);
      this.brands[index] = {
        ...brandUpdate,
        ...payload,
      };

      return this.brands[index];
    }

    return null;
  }

  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    this.brands.splice(index, 1);
    return true;
  }
}
