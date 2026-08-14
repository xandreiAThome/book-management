import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class AssignBookDto {
  @IsArray()
  @IsString({ each: true })
  studentIds: string[];
}
