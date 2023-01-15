import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Test } from 'src/test/entity/test.entity';

interface AnswerCreationAttr {
  test_id: number;
  answer_text: string;
}

@Table({ tableName: 'answer' })
export class Answer extends Model<Answer, AnswerCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Test ID' })
  @ForeignKey(() => Test)
  @Column({
    type: DataType.INTEGER,
  })
  test_id: number;

  @BelongsTo(() => Test)
  test_question: Test;

  @ApiProperty({
    example: '2 ta',
    description: 'Answer text',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  answer_text: string;

  @ApiProperty({
    example: 'true',
    description: 'Answer is_true',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_true: boolean;
}
