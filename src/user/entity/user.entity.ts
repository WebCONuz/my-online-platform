import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { Cart } from '../../cart/entity/cart.entity';
import { CreditCard } from '../../credit_card/entity/credit-card.entity';
import { UserAddress } from '../../user_address/entity/address.entity';
import { Opinion } from '../../user_opinion/entity/opinion.entity';

interface CreateUserAttr {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, CreateUserAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Farxod', description: 'User first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @ApiProperty({ example: 'Jamolov', description: 'User last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: '+998995441212', description: 'User phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: '...', description: 'User hashed refreshtoken' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({ example: 'male', description: 'User gender' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender: string;

  @HasMany(() => CreditCard)
  credit_cards: CreditCard[];

  @HasMany(() => UserAddress)
  address: UserAddress[];

  @HasMany(() => Cart)
  korzinka: Cart[];

  @HasMany(() => Opinion)
  opinions: Opinion[];
}
