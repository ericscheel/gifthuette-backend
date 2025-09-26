// locations.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

class CreateLocationDto {
  @IsString()
  @Length(1, 200)
  name!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  // Erwartet "YYYY-MM-DD" (Date-only, keine Uhrzeit)
  @IsDateString()
  date!: string;

  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;
}

@Controller('locations')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class LocationsController {
  constructor(private readonly svc: LocationsService) {}

  // Öffentlich → Tour-Seite (kommende Termine)
  @Get('upcoming')
  upcoming() {
    return this.svc.upcoming();
  }

  // Öffentlich → "Wo sind wir heute?"
  @Get('current')
  current() {
    return this.svc.current();
  }

  // Öffentlich/Intern → Alle (ggf. später absichern/paginieren)
  @Get('all')
  locations() {
    return this.svc.findAll();
  }

  // Admin/Manager → neuen Standort anlegen
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post()
  create(@Body() dto: CreateLocationDto) {
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
