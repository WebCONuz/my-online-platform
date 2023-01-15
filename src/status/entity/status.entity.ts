import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface StatusCreationAttr {
  status: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, StatusCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'status', description: 'Status name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}
