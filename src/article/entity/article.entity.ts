import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Author } from 'src/author/entity/author.entity';
import { Category } from 'src/category/entity/category.entity';

interface ArticleCreationAttr {
  category_id: number;
  author_id: number;
  article_title: string;
  article_text: string;
}

@Table({ tableName: 'article' })
export class Article extends Model<Article, ArticleCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Category ID' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ example: '1', description: 'Author ID' })
  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  author_id: number;

  @BelongsTo(() => Author)
  author: Author;

  @ApiProperty({ example: 'File system', description: 'Article title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  article_title: string;

  @ApiProperty({ example: 'Lorem impsum set ...', description: 'Article text' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  article_text: string;

  @ApiProperty({ example: 'true', description: 'Is checked Article by Admin' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_checked: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Is checked Article by Admin or Other Author',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_approved: boolean;

  @ApiProperty({ example: '4.5', description: 'Total star' })
  @Column({
    type: DataType.FLOAT,
    defaultValue: 5,
  })
  total_star: number;
}
