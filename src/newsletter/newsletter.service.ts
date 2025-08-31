import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(email: string) {
    // Prüfen, ob schon registriert
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (existing) throw new BadRequestException('E-Mail bereits eingetragen');

    return this.prisma.newsletterSubscriber.create({
      data: { email, confirmed: false }, // confirmed=false → für Double-Opt-In
    });
  }

  async confirm(email: string) {
    return this.prisma.newsletterSubscriber.update({
      where: { email },
      data: { confirmed: true },
    });
  }

  async unsubscribe(email: string) {
    return this.prisma.newsletterSubscriber.delete({ where: { email } });
  }

  async listAll() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
