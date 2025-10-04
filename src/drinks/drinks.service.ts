import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

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

  async all() {
    return this.prisma.drink.findMany({
      include: { media: true, category: true, variants: true },
      orderBy: { createdAt: 'desc' },
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
    alcoholPercentage?: Decimal;
    active?: boolean;
  }) {
    const { categoryId, ...rest } = dto;
    return this.prisma.drink.create({
      data: { 
        ...rest, 
        category: categoryId ? { connect: { id: categoryId } } : undefined 
      },
      include: { media: true, category: true, variants: true },
    });
  }

  async addVariant(drinkId: string, label: string, priceCents: number) {
    return this.prisma.drinkVariant.create({
      data: { label, priceCents, drinkId },
    });
  }
  async delete(id: string) {
    return this.prisma.drink.delete({
      where: { id },
    });
  }
  async update(id: string, dto: {
    slug?: string;
    name?: string;
    description?: string;
    priceCents?: number;
    alcoholPercentage?: Decimal;
    active?: boolean;
    categoryId?: string;
  }) {
    const { categoryId, ...rest } = dto;
    return this.prisma.drink.update({
      where: { id },
      data: { ...rest, category: categoryId ? { connect: { id: categoryId } } : undefined },
      include: { media: true, category: true, variants: true },
    });
  }
}
