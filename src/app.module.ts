import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { DrinksModule } from './drinks/drinks.module';
import { CategoriesModule } from './categories/categories.module';
import { LocationsModule } from './locations/locations.module';
import { HighlightsModule } from './highlights/highlights.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SocialModule,
    NewsletterModule,
    HighlightsModule,
    DrinksModule,
    CategoriesModule,
    AuthModule,
    ProductsModule,
    LocationsModule,
  ],
})
export class AppModule {}
