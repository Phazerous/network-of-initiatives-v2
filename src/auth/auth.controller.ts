import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import VerifyEmailDto from './dto/verify-email.dto';
import RequestVerificationCodeDto from './dto/request-verification-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //TODO Check if a real email

  @Post('request-verification-code')
  async requestVerificationCode(
    @Body() requestVerificationCodeDto: RequestVerificationCodeDto,
  ) {
    const { email } = requestVerificationCodeDto;

    await this.authService.assignVerificationCodeToEmail(email);
  }

  @Post('verify-email')
  @UsePipes(new ValidationPipe())
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    const { email, verificationCode } = verifyEmailDto;

    await this.authService.verifyEmail(email, verificationCode);
  }
}
