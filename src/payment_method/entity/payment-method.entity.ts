import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PaymentMethodCreationAttr {
  name: string;
}

@Table({ tableName: 'payment_method' })
export class PaymentMethod extends Model<
  PaymentMethod,
  PaymentMethodCreationAttr
> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Credit cart', description: 'Payment method name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
