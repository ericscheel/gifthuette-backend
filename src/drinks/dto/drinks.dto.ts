import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDrinkDto {
  @ApiProperty({ description: 'The name of the drink' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The price of the drink' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The description of the drink' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateDrinkDto {
  @ApiProperty({ description: 'The name of the drink', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The price of the drink', required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'The description of the drink', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class DrinkDto {
  @ApiProperty({ description: 'The ID of the drink' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'The name of the drink' })
  @ApiProperty({ description: 'The name of the drink' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The price of the drink' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The description of the drink' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The ID of the location this drink belongs to' })
  @IsNotEmpty()
  @IsNumber()
  locationId: number;

  @ApiProperty({ description: 'The creation date of the drink' })
  @ApiProperty({ description: 'The creation date of the drink' })
  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @ApiProperty({ description: 'The last update date of the drink' })
  @IsNotEmpty()
  @IsString()
  updatedAt: string;
}

export class DrinkListDto {
  @ApiProperty({ description: 'List of drinks', type: [DrinkDto] })
  drinks: DrinkDto[];
}
