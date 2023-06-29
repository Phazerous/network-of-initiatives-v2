import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import VerifyEmailDto from './dto/verify-email.dto';
import RequestVerificationCodeDto from './dto/request-verification-code.dto';
import { JwtService } from '@nestjs/jwt';
import SignupDto from './dto/signup.dto';
import { JwtEmailVerificationGuard } from './jwt-email-verification.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  @Post('request-verification-code')
  async requestVerificationCode(
    @Body() requestVerificationCodeDto: RequestVerificationCodeDto,
  ) {
    const { email } = requestVerificationCodeDto;

    await this.authService.assignVerificationCodeToEmail(email);
  }

  @Post('verify-email')
  @UsePipes(new ValidationPipe())
  async verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, verificationCode } = verifyEmailDto;

    await this.authService.verifyEmail(email, verificationCode);

    const token = await this.authService.generateRegistrationToken(email);

    response.cookie('REG_TOKEN', token, {
      maxAge: 10 * 60 * 1000, // 10 minutes
      httpOnly: true,
    });
  }

  @Post('signup')
  @UseGuards(JwtEmailVerificationGuard)
  @UsePipes(new ValidationPipe())
  async signup(
    @Request() req: any,
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const email = req.user.email;

    const createUserDto = new CreateUserDto();
    createUserDto.email = email;
    createUserDto.name = signupDto.name;
    createUserDto.lastname = signupDto.lastname;
    createUserDto.password = signupDto.password;

    const user = await this.userService.createUser(createUserDto);

    const token = await this.authService.generateAccessToken(user);

    response.cookie('USER_TOKEN', token, {
      httpOnly: true,
    });

    return user.id;
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = loginDto;

    const user = await this.authService.login(email, password);

    const token = await this.authService.generateAccessToken(user);

    response.cookie('USER_TOKEN', token, {
      httpOnly: true,
    });

    return user.id;
  }
}
