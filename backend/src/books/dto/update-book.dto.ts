import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  coverImg?: string;
}
