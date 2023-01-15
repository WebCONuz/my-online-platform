import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DistrictCreationAttr {
  name: string;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Zomin', description: 'District name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
