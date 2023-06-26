import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { InitiativesModule } from './initiatives/initiatives.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [AuthModule, UsersModule, InitiativesModule, ApplicationsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
