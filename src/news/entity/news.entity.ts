import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/entity/category.entity';

interface NewsCreationAttr {
  category_id: number;
  news_title: string;
  news_text: string;
}

@Table({ tableName: 'news' })
export class News extends Model<News, NewsCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '3', description: 'Category ID' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ example: 'New React Course', description: 'News title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  news_title: string;

  @ApiProperty({ example: 'Lorem impsum set ...', description: 'News text' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  news_text: string;

  @ApiProperty({ example: 'true', description: 'Is checked News by Admin' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_checked: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Is checked News by Admin or Other Author',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_approved: boolean;
}
