// import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'product name' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly brandId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['name']),
) {}
