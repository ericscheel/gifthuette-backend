import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SuggestionsController } from './search.controller';

@Module({
  controllers: [SearchController, SuggestionsController],
  providers: [SearchService],
})
export class SearchModule {}