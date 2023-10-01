import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import PaymentStatus from './paymentStatus.model';
import PaymentMethod from './paymentMethod.model';

@Table({ timestamps: true, tableName: 'payment' })
export default class Payment extends Model {
  @ForeignKey(() => PaymentStatus)
  @Column(DataType.INTEGER)
  statusId: number;

  @Column(DataType.INTEGER)
  price: number;

  @Column(DataType.DATE)
  date: Date;

  @ForeignKey(() => PaymentMethod)
  @Column(DataType.INTEGER)
  method: number;

  @Column(DataType.STRING)
  payerName: string;
}
