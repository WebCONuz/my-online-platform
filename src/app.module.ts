import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegionModule } from './region/region.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { DistrictModule } from './district/district.module';
import { UserModule } from './user/user.module';
import { CreditCardModule } from './credit_card/credit_card.module';
import { UserAddressModule } from './user_address/user_address.module';
import { CreditCard } from './credit_card/entity/credit-card.entity';
import { District } from './district/entity/district.entity';
import { Region } from './region/entity/region.entity';
import { User } from './user/entity/user.entity';
import { UserAddress } from './user_address/entity/address.entity';
import { AuthorModule } from './author/author.module';
import { PostsModule } from './posts/posts.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { NewsModule } from './news/news.module';
import { TestModule } from './test/test.module';
import { AnswerModule } from './answer/answer.module';
import { ExercisesModule } from './exercises/exercises.module';
import { CourseModule } from './course/course.module';
import { StatusModule } from './status/status.module';
import { CartModule } from './cart/cart.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DiscountCouponIdModule } from './discount_coupon_id/discount_coupon_id.module';
import { BookingModule } from './booking/booking.module';
import { FilesModule } from './files/files.module';
import { MediaModule } from './media/media.module';
import { UserOpinionModule } from './user_opinion/user_opinion.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // Read environment variables
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    // Static Folder
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    // Connect to PostgreSQL database
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      // models: [User, UserAddress, Region, District, CreditCard],
      models: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      autoLoadModels: true,
      logging: false,
    }),

    // Custom modules
    RegionModule,
    DistrictModule,
    UserModule,
    CreditCardModule,
    UserAddressModule,
    AuthorModule,
    PostsModule,
    CategoryModule,
    ArticleModule,
    NewsModule,
    TestModule,
    AnswerModule,
    ExercisesModule,
    CourseModule,
    StatusModule,
    CartModule,
    PaymentMethodModule,
    DiscountCouponIdModule,
    BookingModule,
    FilesModule,
    MediaModule,
    UserOpinionModule,
    AdminModule,
  ],
})
export class AppModule {}
