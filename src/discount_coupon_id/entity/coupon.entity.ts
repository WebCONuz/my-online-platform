import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CouponCreationAttr {
  for_who: string;
  percentage: number;
}

@Table({ tableName: 'coupon' })
export class Coupon extends Model<Coupon, CouponCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ayollar', description: 'Coupon for who' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  for_who: string;

  @ApiProperty({ example: '25', description: 'Coupon percentage' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  percentage: number;
}
