import {
  Table,
  Model,
  Column,
  DataType,
  Unique,
  ForeignKey,
} from 'sequelize-typescript';
import Role from './role.model';

@Table({ timestamps: true, tableName: 'user' })
export default class User extends Model {
  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  roleId: number;

  @Column(DataType.BOOLEAN)
  isActive: boolean;
}
