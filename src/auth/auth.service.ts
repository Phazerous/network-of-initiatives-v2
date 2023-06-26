import {
  Injectable,
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PrismaService') private prisma: PrismaService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async generateVerificationCode() {
    return 'bla-bla';
  }

  async getRegistrationRecord(email: string) {
    return await this.prisma.emailVerificationCode.findFirst({
      where: {
        email,
      },
    });
  }

  async assignVerificationCodeToEmail(email: string) {
    const prevRecord = await this.getRegistrationRecord(email);

    if (!prevRecord) {
      const newRecord = await this.prisma.emailVerificationCode.create({
        data: {
          email,
          verificationCode: await this.generateVerificationCode(),
        },
      });
    } else {
      await this.prisma.emailVerificationCode.update({
        where: {
          email,
        },
        data: {
          verificationCode: await this.generateVerificationCode(),
        },
      });
    }
  }

  async verifyEmail(email: string, verificationCode: string) {
    const record = await this.prisma.emailVerificationCode.findUnique({
      where: {
        email,
      },
    });

    if (!(record && record.verificationCode === verificationCode))
      throw new BadRequestException('Invalid verification code');
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!(user && user.password === password))
      throw new UnauthorizedException();

    return user;
  }

  async generateAccessToken(user: User) {
    const accessToken = {
      sub: user.id,
    };

    return this.jwtService.signAsync(JSON.stringify(accessToken));
  }

  async generateRegistrationToken(email: string) {
    const registrationToken = {
      email,
    };

    return this.jwtService.signAsync(JSON.stringify(registrationToken));
  }
}
