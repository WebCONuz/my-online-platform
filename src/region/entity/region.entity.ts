import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RegionCreationAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Qashqadaryo', description: 'Region name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
