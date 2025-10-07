import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ description: 'The name of the location' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  description?: string;
}
