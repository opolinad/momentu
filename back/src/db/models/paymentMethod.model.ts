import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'paymentMethod' })
export default class PaymentMethod extends Model {
  @Column(DataType.STRING)
  name: string;
}
