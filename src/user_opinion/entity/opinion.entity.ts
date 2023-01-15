import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entity/user.entity';

interface OpinionCreationAttr {
  user_id: number;
  target_table_name: string;
  target_table_id: number;
}

@Table({ tableName: 'user_opinion' })
export class Opinion extends Model<Opinion, OpinionCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 'Lorem ipsum dolor ...', description: 'Description' })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({ example: '5', description: 'star' })
  @Column({
    type: DataType.FLOAT,
  })
  star: number;

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
    type: DataType.INTEGER,
  })
  target_table_id: number;
}
