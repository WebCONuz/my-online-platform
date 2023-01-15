import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/answer/entity/answer.entity';
import { Category } from 'src/category/entity/category.entity';

interface TestCreationAttr {
  category_id: number;
  question: string;
}

@Table({ tableName: 'test' })
export class Test extends Model<Test, TestCreationAttr> {
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

  @ApiProperty({
    example: "Hooklar necha turga bo'linadi?",
    description: 'Test queston',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  question: string;

  @ApiProperty({ example: 'true', description: 'Is checked Test by Admin' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_checked: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Is active Test by Admin',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @HasMany(() => Answer)
  answers: Answer[];
}
