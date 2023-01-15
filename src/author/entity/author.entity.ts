import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Article } from '../../article/entity/article.entity';
import { Course } from '../../course/entity/course.entity';
import { Exercises } from '../../exercises/entity/exercise.entity';
import { Posts } from '../../posts/entity/posts.entity';

interface CreateAuthorAttr {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
}

@Table({ tableName: 'author' })
export class Author extends Model<Author, CreateAuthorAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Farxod', description: 'Author first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @ApiProperty({ example: 'Jamolov', description: 'Author last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Author email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'Author password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: '+998995441212', description: 'Author phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: '...', description: 'Author hashed refreshtoken' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({ example: 'Lorem impsum ...', description: 'Author Info' })
  @Column({
    type: DataType.STRING,
  })
  info: string;

  @ApiProperty({
    example: 'true',
    description: 'Author is_active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @HasMany(() => Article)
  articles: Article[];

  @HasMany(() => Posts)
  posts: Posts[];

  @HasMany(() => Course)
  courses: Course[];

  @HasMany(() => Exercises)
  exercises: Exercises[];
}
