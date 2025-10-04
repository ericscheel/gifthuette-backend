import {
  Get,
  Post,
  Body,
  Query,
  Controller
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly svc: SearchService) {}
    @Post('path')
    async search(@Body('q') query: string) {
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