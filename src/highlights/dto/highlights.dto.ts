import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ description: 'The search query string' })
  @IsNotEmpty()
  @IsString()
  query: string;
  @IsOptional()
  @IsNumber()
  latitude?: number;
  @IsOptional()
  @IsNumber()
  longitude?: number;
}
