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
import { Booking } from '../../booking/entity/booking.entity';
import { Course } from '../../course/entity/course.entity';
import { Status } from '../../status/entity/status.entity';
import { User } from '../../user/entity/user.entity';

interface CartCreationAttr {
  status_id: number;
  user_id: number;
  course_id: number;
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, CartCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '3', description: 'Status ID' })
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @BelongsTo(() => Status)
  category: Status;

  @ApiProperty({ example: '3', description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: '3', description: 'Course ID' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
  })
  course_id: number;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Booking)
  bookings: Booking[];
}
