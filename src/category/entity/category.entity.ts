import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface CategoryCreationAttr {
  category_name: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'frontend', description: 'Category name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category_name: string;

  @ApiProperty({ example: '1', description: 'Parent Category ID' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  parent_category_id: number;

  @BelongsTo(() => Category)
  parentCategory: Category;
}
