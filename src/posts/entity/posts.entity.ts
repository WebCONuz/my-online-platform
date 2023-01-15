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

interface PostsCreationAttr {
  post_name: string;
  post_text: string;
  author_id: number;
}

@Table({ tableName: 'posts' })
export class Posts extends Model<Posts, PostsCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Node.js', description: 'Post name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  post_name: string;

  @ApiProperty({ example: 'Lorem ipsum dolor ...', description: 'Post text' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  post_text: string;

  @ApiProperty({ example: '1', description: 'Post Author ID' })
  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  readonly author_id: number;

  @BelongsTo(() => Author)
  author: Author;

  @ApiProperty({ example: 'true', description: 'Is checked post by Admin' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_checked: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Is checked post by Admin or Other Author',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_approved: boolean;
}
