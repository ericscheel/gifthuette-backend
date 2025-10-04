import {
  Get
} from '@nestjs/common';
import { SearchService } from './search.service';
import { Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('search')
export class SearchController {
  constructor(private readonly svc: SearchService) {}
    @Get()
    async search(@Query('q') query: string) {
      return this.svc.search(query);
    }
}

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly svc: SearchService) {}

  @Get()
  async suggest(@Query('q') query: string) {
    return this.svc.suggest(query);
  }
}