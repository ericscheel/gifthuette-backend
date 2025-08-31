import { Body, Controller, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly svc: NewsletterService) {}

  // Öffentlich: anmelden
  @Post('subscribe')
  subscribe(@Body('email') email: string) {
    return this.svc.subscribe(email);
  }

  // Öffentlich: bestätigen (Double-Opt-In)
  @Post('confirm')
  confirm(@Body('email') email: string) {
    return this.svc.confirm(email);
  }

  // Öffentlich: abmelden
  @Delete('unsubscribe')
  unsubscribe(@Body('email') email: string) {
    return this.svc.unsubscribe(email);
  }

  // Admin: alle Abonnenten
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Get()
  listAll() {
    return this.svc.listAll();
  }
}
