import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('highlights')
export class HighlightsController {
  constructor(private readonly svc: HighlightsService) {}

  // Öffentlich → aktive Highlights anzeigen
  @Get()
  listActive() {
    return this.svc.listActive();
  }

  // Admin/Manager → Highlight erstellen
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post()
  create(
    @Body()
    dto: {
      title: string;
      description?: string;
      startDate: Date;
      endDate: Date;
      isActive?: boolean;
    },
  ) {
    return this.svc.create(dto);
  }

  // Admin/Manager → Highlight deaktivieren
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.svc.deactivate(id);
  }
}
