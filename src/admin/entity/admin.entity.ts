import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CreateAdminAttr {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  tg_admin_id: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, CreateAdminAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Farxod', description: 'Admin first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @ApiProperty({ example: 'Jamolov', description: 'Admin last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Admin email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'Admin password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: '...', description: 'Admin hashed refreshtoken' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'true',
    description: 'Admin is_active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Admin is_active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'https://t.me/admin1',
    description: 'Admin telegram link',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tg_admin_id: string;
}
