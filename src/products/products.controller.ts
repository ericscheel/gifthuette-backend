import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Get()
  list(
    @Query('q') q?: string,
    @Query('category') category?: string,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '20',
  ) {
    return this.svc.list({ q, category, page: +page, pageSize: +pageSize });
  }

  @Get(':slug')
  bySlug(@Param('slug') slug: string) {
    return this.svc.bySlug(slug);
  }

  // Beispiel: Admin-only Create
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post()
  create(
    @Body()
    dto: {
      slug: string;
      name: string;
      priceCents: number;
      stock?: number;
      categoryId?: string;
    },
  ) {
    return this.svc.create(dto);
  }
}
