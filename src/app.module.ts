import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DrinksModule } from './drinks/drinks.module';
import { CategoriesModule } from './categories/categories.module';
import { LocationsModule } from './locations/locations.module';
import { HighlightsModule } from './highlights/highlights.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { SocialModule } from './social/social.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SearchModule,
    SocialModule,
    NewsletterModule,
    HighlightsModule,
    DrinksModule,
    CategoriesModule,
    AuthModule,
    LocationsModule,
  ],
})
export class AppModule {}
