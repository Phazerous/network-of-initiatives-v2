import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SharedModule } from 'src/shared/shared.module';
import { InitiativesService } from 'src/initiatives/initiatives.service';
import { ApplicationsService } from 'src/applications/applications.service';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [UsersService, InitiativesService, ApplicationsService],
})
export class UsersModule {}
