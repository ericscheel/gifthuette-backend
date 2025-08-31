import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HighlightsService {
  constructor(private prisma: PrismaService) {}

  async listActive() {
    const now = new Date();
    return this.prisma.highlight.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: { startDate: 'asc' },
    });
  }

  async create(dto: {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
  }) {
    return this.prisma.highlight.create({ data: dto });
  }

  async deactivate(id: string) {
    return this.prisma.highlight.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
