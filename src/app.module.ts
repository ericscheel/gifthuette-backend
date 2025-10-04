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
import { SearchModule } from './search/search.module';
import { SuggestionsController } from './search/search.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SearchModule,
    SocialModule,
    SuggestionsController,
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
