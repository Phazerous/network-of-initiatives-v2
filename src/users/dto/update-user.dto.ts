import { IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  lastname?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  university?: string;

  @IsOptional()
  contact?: string;

  @IsOptional()
  about?: string;
}
