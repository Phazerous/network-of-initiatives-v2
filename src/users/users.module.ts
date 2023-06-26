import { Module, UseGuards } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SharedModule } from 'src/shared/shared.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InitiativesService } from 'src/initiatives/initiatives.service';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [UsersService, InitiativesService],
})
export class UsersModule {}
