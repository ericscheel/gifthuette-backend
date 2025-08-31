import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly svc: DrinksService) {}

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

  // Admin/Manager dürfen Drinks erstellen
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post()
  create(
    @Body()
    dto: {
      slug: string;
      name: string;
      description?: string;
      priceCents: number;
      categoryId?: string;
    },
  ) {
    return this.svc.create(dto);
  }

  // Variante hinzufügen (z. B. "0,3l", "0,5l")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post(':id/variants')
  addVariant(
    @Param('id') drinkId: string,
    @Body() dto: { label: string; priceCents: number },
  ) {
    return this.svc.addVariant(drinkId, dto.label, dto.priceCents);
  }
}
