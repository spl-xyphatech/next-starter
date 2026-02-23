import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
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
    const products = await model.exec();

    return { products, total };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException(`Invalid product ID format: ${id}`);

    const product = await this.productModel.findById({ _id: id }).exec();

    if (!product)
      throw new BadRequestException(`Product with ID ${id} not found`);

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException(`Invalid product ID format: ${id}`);

    return this.productModel
      .findByIdAndUpdate({ _id: id }, updateProductDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException(`Invalid product ID format: ${id}`);

    return this.productModel.findByIdAndDelete({ _id: id }).exec();
  }
}
