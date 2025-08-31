import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('locations')
export class LocationsController {
  constructor(private readonly svc: LocationsService) {}

  // Öffentlich → Tour-Seite
  @Get('upcoming')
  upcoming() {
    return this.svc.upcoming();
  }

  // Öffentlich → "Wo sind wir heute?"
  @Get('current')
  current() {
    return this.svc.current();
  }

  // Admin/Manager → neuen Standort anlegen
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post()
  create(
    @Body()
    dto: {
      name: string;
      address?: string;
      city?: string;
      date: Date;
      isCurrent?: boolean;
    },
  ) {
    return this.svc.create(dto);
  }

  // Admin/Manager → bestehenden Standort als "current" markieren
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post(':id/set-current')
  setCurrent(@Param('id') id: string) {
    return this.svc.setCurrent(id);
  }
}
