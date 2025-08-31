import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DrinksService {
  constructor(private prisma: PrismaService) {}

  async list(params: {
    q?: string;
    category?: string;
    page?: number;
    pageSize?: number;
  }) {
    const { q, category, page = 1, pageSize = 20 } = params;
    return this.prisma.drink.findMany({
      where: {
        AND: [
          q
            ? { OR: [{ name: { contains: q } }, { slug: { contains: q } }] }
            : {},
          category ? { category: { slug: category } } : {},
          { active: true },
        ],
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      include: { media: true, category: true, variants: true },
    });
  }

  async bySlug(slug: string) {
    return this.prisma.drink.findUnique({
      where: { slug },
      include: { media: true, category: true, variants: true },
    });
  }

  async create(dto: {
    slug: string;
    name: string;
    description?: string;
    priceCents: number;
    categoryId?: string;
  }) {
    return this.prisma.drink.create({
      data: { ...dto, active: true },
    });
  }

  async addVariant(drinkId: string, label: string, priceCents: number) {
    return this.prisma.drinkVariant.create({
      data: { label, priceCents, drinkId },
    });
  }
}
