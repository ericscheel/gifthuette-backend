import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { drinks: true },
    });
  }

  async create(dto: { slug: string; name: string }) {
    return this.prisma.category.create({ data: dto });
  }

  async bySlug(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: { drinks: { include: { variants: true, media: true } } },
    });
  }
}
