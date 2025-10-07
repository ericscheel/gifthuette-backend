import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the category' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The ID of the location this category belongs to',
  })
  @IsNotEmpty()
  @IsNumber()
  locationId: number;
}

export class UpdateCategoryDto {
  @ApiProperty({ description: 'The name of the category', required: false })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiProperty({
    description: 'The description of the category',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The ID of the location this category belongs to',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  locationId?: number;
}
