import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface MediaCreationAttr {
  media_name: string;
  media_file: string;
  target_table_name: string;
  target_table_id: string;
}

@Table({ tableName: 'media' })
export class Media extends Model<Media, MediaCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'react', description: 'Media name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  media_name: string;

  @ApiProperty({
    example: 'static/images/react.jpg',
    description: 'Media file path',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  media_file: string;

  @ApiProperty({
    example: 'course',
    description: 'For which table the file is used',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  target_table_name: string;

  @ApiProperty({ example: '1', description: 'ELement ID' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  target_table_id: string;
}
