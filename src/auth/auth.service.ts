import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  private async generateVerificationCode() {
    return 'bla-bla';
  }

  async assignVerificationCodeToEmail(email: string) {
    const result = await this.prisma.emailVerificationCode.create({
      data: {
        email,
        verificationCode: await this.generateVerificationCode(),
      },
    });
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
}
