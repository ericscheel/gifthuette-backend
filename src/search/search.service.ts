import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: string) {
    return this.prisma.drink.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
    });
  }

  async suggest(query: string) {
    return this.prisma.drink.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query} },
        ],
      },
    });
  }
}