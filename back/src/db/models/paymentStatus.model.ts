import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'paymentStatus' })
export default class PaymentStatus extends Model {
  @Column(DataType.STRING)
  name: string;
}
