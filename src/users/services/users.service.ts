import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'example@example.com',
      password: '123456',
      role: 'admin',
    },
  ];

  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const userUpdate = this.findOne(id);
    if (userUpdate) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...userUpdate,
        ...payload,
      };

      return this.users[index];
    }

    return null;
  }

  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new NotFoundException(`User #${id} not found`);
    }

    this.users.splice(index, 1);
    return true;
  }

  getOrderByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
