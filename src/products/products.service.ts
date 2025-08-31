async create(dto: { slug: string; name: string; priceCents: number; stock?: number; categoryId?: string }) {
  return this.prisma.product.create({ data: { ...dto, active: true, stock: dto.stock ?? 0 } });
}
