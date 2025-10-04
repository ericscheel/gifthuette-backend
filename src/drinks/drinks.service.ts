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
    alcoholPercentage?: number;
    active?: boolean;
    ingredients?: string[];
  }) {
    const {
      categoryId,
      ingredients,
      description,
      ...rest
    } = dto;

    // Drink erstellen
    const createdDrink = await this.prisma.drink.create({
      data: {
        ...rest,
        description: description ?? "", // falls description im Schema nicht optional ist
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
      },
      include: {
        media: true,
        category: true,
        variants: true,
      },
    });

    // Zutaten verknüpfen (viele-zu-viele)
    if (ingredients && ingredients.length > 0) {
      await Promise.all(
        ingredients.map(async (name) => {
          // Zutat suchen oder erstellen
          const ingredient = await this.prisma.ingredient.upsert({
            where: { name },
            update: {},
            create: { name, drinkIds: createdDrink.id },
          });

          // Verknüpfung im Join-Modell
          await this.prisma.drinkIngredient.create({
            data: {
              drinkId: createdDrink.id,
              ingredientId: ingredient.id,
            },
          });
        })
      );
    }
    return createdDrink;
  }

  async addVariant(drinkId: string, label: string, priceCents: number) {
    return this.prisma.drinkVariant.create({
      data: { label, priceCents, drinkId },
    });
  }
  async delete(id: string) {
    // Lösche verknüpfte Zutaten
    await this.prisma.ingredient.deleteMany({
      where: { drinkIds: id },
    });

    // Lösche verknüpfte Varianten
    await this.prisma.drinkVariant.deleteMany({
      where: { drinkId: id },
    });

    // Lösche verknüpfte Medien
    await this.prisma.media.deleteMany({
      where: { drinkId: id },
    });

    // Jetzt kann der Drink gelöscht werden
    return this.prisma.drink.delete({
      where: { id },
    });
  }

  async update(
    id: string,
    dto: {
      slug?: string;
      name?: string;
      description?: string;
      priceCents?: number;
      alcoholPercentage?: Decimal;
      active?: boolean;
      categoryId?: string;
    },
  ) {
    const { categoryId, ...rest } = dto;
    return this.prisma.drink.update({
      where: { id },
      data: {
        ...rest,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
      include: { media: true, category: true, variants: true },
    });
  }
}
