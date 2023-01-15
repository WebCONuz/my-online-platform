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

interface CourseCreationAttr {
  course_name: string;
  author_id: number;
  category_id: number;
}

@Table({ tableName: 'course' })
export class Course extends Model<Course, CourseCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'React.js Professional kurs',
    description: 'Course name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  course_name: string;

  @ApiProperty({ example: '1', description: 'Author ID' })
  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  author_id: number;

  @BelongsTo(() => Author)
  author: Author;

  @ApiProperty({ example: '1', description: 'Category ID' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ example: 'true', description: 'Is checked Course by Admin' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_checked: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Is checked Course by Admin or Other Author',
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

  @ApiProperty({ example: 'Lorem ipsum set ...', description: 'Course info' })
  @Column({
    type: DataType.STRING,
  })
  info: string;
}
