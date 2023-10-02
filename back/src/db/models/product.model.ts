import {
  Table,
  Model,
  Column,
  DataType,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';
import Order from './order.model';
import OrderProduct from './orderProduct.model';

@Table({ timestamps: true, tableName: 'product' })
export default class Product extends Model {
  @Unique
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.STRING)
  imageUrl: string;

  @BelongsToMany(() => Order, () => OrderProduct)
  orders: Order[];
}
