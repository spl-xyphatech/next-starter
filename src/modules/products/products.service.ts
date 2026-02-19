import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(query: QueryProductDto) {
    const model = this.productModel.find();
    if (query.search) {
      model.where('name', new RegExp(query.search, 'i'));
    }

    const total = await model.clone().countDocuments().exec();

    if (query.limit) model.limit(query.limit);
    if (query.offset) model.skip(query.offset);
    const products = model.exec();

    return { products, total };
  }

  findOne(id: string) {
    return this.productModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate({ _id: id }, updateProductDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete({ _id: id }).exec();
  }
}
