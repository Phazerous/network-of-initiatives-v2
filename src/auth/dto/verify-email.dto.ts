import { IsEmail, IsString } from 'class-validator';

export default class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  verificationCode: string;
}
