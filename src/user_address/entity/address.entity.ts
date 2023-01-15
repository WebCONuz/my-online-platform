import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { District } from 'src/district/entity/district.entity';
import { Region } from 'src/region/entity/region.entity';
import { User } from 'src/user/entity/user.entity';

interface UserAddressCreationAttr {
  user_id: number;
  name: string;
  country: string;
  region_id: number;
  district_id: number;
  street: string;
  house: string;
  location: string;
  post_index: string;
}

@Table({ tableName: 'user_address' })
export class UserAddress extends Model<UserAddress, UserAddressCreationAttr> {
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

  @ApiProperty({ example: 'Chilonzor', description: 'User address name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'Uzbekistan', description: 'Country of user' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ApiProperty({ example: '1', description: 'Region ID' })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({ example: '1', description: 'District ID' })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;

  @BelongsTo(() => District)
  district: District;

  @ApiProperty({ example: 'Gararin', description: 'Street name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: '12-uy', description: 'House number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  house: string;

  @ApiProperty({ example: '6', description: 'Flat number' })
  @Column({
    type: DataType.INTEGER,
  })
  flat: number;

  @ApiProperty({ example: 'https://...', description: 'Google map location' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  @ApiProperty({ example: '100112', description: 'Post index' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  post_index: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor set ...',
    description: 'Info about user',
  })
  @Column({
    type: DataType.STRING,
  })
  info: string;
}
