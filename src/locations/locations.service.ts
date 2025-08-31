import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async upcoming() {
    return this.prisma.location.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
    });
  }

  async current() {
    return this.prisma.location.findFirst({
      where: { isCurrent: true },
    });
  }

  async create(dto: {
    name: string;
    address?: string;
    city?: string;
    date: Date;
    isCurrent?: boolean;
  }) {
    if (dto.isCurrent) {
      // Wenn neuer Standort "current" → alle anderen zurücksetzen
      await this.prisma.location.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false },
      });
    }
    return this.prisma.location.create({ data: dto });
  }

  async setCurrent(id: string) {
    await this.prisma.location.updateMany({
      where: { isCurrent: true },
      data: { isCurrent: false },
    });
    return this.prisma.location.update({
      where: { id },
      data: { isCurrent: true },
    });
  }
}
