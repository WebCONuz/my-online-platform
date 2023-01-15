import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entity/user.entity';

interface CreditCardCreationAttr {
  user_id: number;
  name: string;
  number: string;
  year: string;
  month: string;
}

@Table({ tableName: 'credit_card' })
export class CreditCard extends Model<CreditCard, CreditCardCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 'humo', description: 'Credit Card name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: '8960 1200 1414 1212',
    description: 'Credit Card number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  number: string;

  @ApiProperty({ example: '2024', description: 'Credit Card Year' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  year: string;

  @ApiProperty({ example: '09', description: 'Credit Card month' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  month: string;

  @ApiProperty({ example: 'true', description: 'Credit Card is active' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({ example: 'true', description: 'Credit Card is main' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_maine: boolean;
}
