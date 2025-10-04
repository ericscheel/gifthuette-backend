import { Body, Controller, Get, Param, Post, UseGuards, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly svc: CategoriesService) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Get(':slug')
  bySlug(@Param('slug') slug: string) {
    return this.svc.bySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post()
  create(
    @Body()
    dto: {
      slug: string;
      name: string;
      description: string;
    },
  ) {
    return this.svc.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }
}
