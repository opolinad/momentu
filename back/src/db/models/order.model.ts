import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import User from './user.model';
import Payment from './payment.model';
import Product from './product.model';
import OrderProduct from './orderProduct.model';

@Table({ timestamps: true, tableName: 'order' })
export default class Order extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Payment)
  @Column(DataType.INTEGER)
  paymentId: number;

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];
}
