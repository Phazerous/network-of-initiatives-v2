import { IsEmail } from 'class-validator';

export default class RequestVerificationCodeDto {
  @IsEmail()
  email: string;
}
