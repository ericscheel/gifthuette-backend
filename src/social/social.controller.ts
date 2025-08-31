import { Controller, Get } from '@nestjs/common';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
  constructor(private readonly svc: SocialService) {}

  @Get('instagram')
  getInstagramFeed() {
    return this.svc.getInstagramFeed();
  }
}
