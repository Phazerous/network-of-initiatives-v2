import { IsString, MinLength } from 'class-validator';

export class CreateInitiativeDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsString()
  @MinLength(5)
  searching: string;

  @IsString()
  @MinLength(5)
  location: string;

  @IsString()
  @MinLength(5)
  university: string;

  @IsString()
  @MinLength(5)
  stage: string;
}
