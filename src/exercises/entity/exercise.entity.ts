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
import { Author } from '../../author/entity/author.entity';

interface ExercisesCreationAttr {
  category_id: number;
  exercise_text: string;
}

@Table({ tableName: 'exercise' })
export class Exercises extends Model<Exercises, ExercisesCreationAttr> {
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

  @ApiProperty({ example: '1', description: 'Author ID' })
  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  author_id: number;

  @BelongsTo(() => Author)
  author: Author;

  @ApiProperty({
    example: 'LeeteCode: https://...',
    description: 'Sourse of Exercise',
  })
  @Column({
    type: DataType.STRING,
  })
  source: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor set ... ?',
    description: 'Text of Exercise',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  exercise_text: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor set ... ?',
    description: 'Answer of Exercise',
  })
  @Column({
    type: DataType.STRING,
  })
  answer_text: string;

  @ApiProperty({
    example: 'true',
    description: 'Is checked Exercises by Admin',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_checked: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Is active Exercises by Admin',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
}
