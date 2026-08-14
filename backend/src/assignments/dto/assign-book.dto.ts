import { IsString, IsNotEmpty } from 'class-validator';

export class AssignBookDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;
}
