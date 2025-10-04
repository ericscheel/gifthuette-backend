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
    @Post()
    async search(@Body('q') query: string) {
      return this.svc.search(query);
    }
    
    @Get('suggestions')
    async suggest(@Query('q') query: string) {
      return this.svc.suggest(query);
    }
}