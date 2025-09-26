import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type CreateLocationDto = {
  name: string;
  address?: string;
  city?: string;
  // API-Input: ideal als "YYYY-MM-DD" String — falls Date kommt, normalisieren wir trotzdem
  date: string | Date;
  isCurrent?: boolean;
};

// Hilfsfunktionen für Date-only (UTC Mitternacht)
function toUtcMidnight(dateOnly: string | Date): Date {
  if (typeof dateOnly === 'string')
    return new Date(`${dateOnly}T00:00:00.000Z`);
  const d = new Date(dateOnly);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
function todayUtcMidnight(): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  // Kommende Termine ab heute (inkl. heute), sortiert aufsteigend
  async upcoming() {
    const today = todayUtcMidnight();
    return this.prisma.location.findMany({
      where: { date: { gte: today } },
      orderBy: { date: 'asc' },
      // optional: take/skip für Pagination
    });
  }

  // Aktueller Standort (falls markiert)
  async current() {
    return this.prisma.location.findFirst({
      where: { isCurrent: true },
    });
  }

  // Alle Standorte sinnvoll sortiert: erst current, dann nach Datum absteigend
  async findAll() {
    return this.prisma.location.findMany({
      orderBy: [{ isCurrent: 'desc' }, { date: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async create(dto: CreateLocationDto) {
    const normalizedDate = toUtcMidnight(dto.date);

    return this.prisma.$transaction(async (tx) => {
      if (dto.isCurrent) {
        await tx.location.updateMany({
          where: { isCurrent: true },
          data: { isCurrent: false },
        });
      }

      return tx.location.create({
        data: {
          name: dto.name,
          address: dto.address,
          city: dto.city,
          date: normalizedDate, // Prisma: DateTime @db.Date
          isCurrent: !!dto.isCurrent,
        },
      });
    });
  }

  async setCurrent(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const exists = await tx.location.findUnique({ where: { id } });
      if (!exists) throw new NotFoundException('Location not found');

      await tx.location.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false },
      });

      return tx.location.update({
        where: { id },
        data: { isCurrent: true },
      });
    });
  }
}
