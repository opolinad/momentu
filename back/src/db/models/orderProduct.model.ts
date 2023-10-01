import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import Order from './order.model';
import Product from './product.model';

@Table({ timestamps: false, tableName: 'orderProduct' })
export default class OrderProduct extends Model {
  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  orderId: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId: number;
}
