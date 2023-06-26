import { IsNotEmpty, IsString, Matches } from 'class-validator';

export default class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'The password must have a minimum length of 8 characters and include at least one uppercase letter, one lowercase letter, and one digit.',
  })
  password: string;
}
