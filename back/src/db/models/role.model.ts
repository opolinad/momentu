import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'role' })
export default class Role extends Model {
  @Column(DataType.STRING)
  name: string;
}
